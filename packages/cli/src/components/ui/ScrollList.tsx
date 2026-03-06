import { Box, BoxProps, DOMElement, useInput } from "ink";
import { ScrollView } from "ink-scroll-view";
import { ReactNode, RefObject, useCallback, useEffect } from "react";
import { ScrollBar } from "@byteland/ink-scroll-bar";
import { ErrorBoundary } from "./ErrorBoundary";
import { colors } from "../../constants";
import { useScrollView } from "../../hooks/useScrollView";
import { FocusState } from "../../types";

const SCROLL_BUFFER = 2;

interface ScrollListProps<T> extends BoxProps {
  id: FocusState;
  items: T[];
  renderItem: (item: T, index: number, isSelected: boolean) => ReactNode;
  selectedIndex: number;
  onChange: (index: number) => void;
  ref: RefObject<DOMElement | null>;
  isFocused?: boolean;
  isHidden?: boolean;
  onFocus?: () => void;
  isSkip?: (item: T) => boolean;
}

export const ScrollList = <T,>({
  items,
  renderItem,
  selectedIndex,
  onChange,
  ref,
  isFocused = true,
  isHidden = false,
  onFocus,
  isSkip,
  ...props
}: ScrollListProps<T>) => {
  const { scrollViewRef, scrollInfo, scrollViewCallbacks } = useScrollView({
    ref,
    isFocused,
    isHidden,
    onFocus,
  });

  const scrollToIndex = useCallback(
    (index: number) => {
      const sv = scrollViewRef.current;
      if (!sv) return;
      const offset = sv.getScrollOffset();
      const viewport = sv.getViewportHeight();
      if (index < offset + SCROLL_BUFFER) {
        sv.scrollTo(Math.max(0, index - SCROLL_BUFFER));
      } else if (index > offset + viewport - 1 - SCROLL_BUFFER) {
        sv.scrollTo(index - viewport + 1 + SCROLL_BUFFER);
      }
    },
    [scrollViewRef],
  );

  const findNext = (from: number, dir: 1 | -1): number => {
    const len = items.length;
    let i = (from + dir + len) % len;
    for (let steps = 0; steps < len; steps++) {
      if (!isSkip?.(items[i])) return i;
      i = (i + dir + len) % len;
    }
    return from;
  };

  useEffect(() => {
    scrollToIndex(selectedIndex);
  }, [selectedIndex, scrollToIndex]);

  useInput((_, key) => {
    if (!isFocused) return;
    if (key.upArrow) {
      const next = findNext(selectedIndex, -1);
      onChange(next);
      scrollToIndex(next);
    }
    if (key.downArrow) {
      const next = findNext(selectedIndex, 1);
      onChange(next);
      scrollToIndex(next);
    }
  });

  return (
    <ErrorBoundary>
      <Box flexDirection="row" height="100%">
        <ScrollView ref={scrollViewRef} flexGrow={1} {...scrollViewCallbacks} {...props}>
          <Box flexDirection="column">
            {items.map((item, index) => (
              <Box key={index}>
                {renderItem(item, index, !isSkip?.(item) && index === selectedIndex)}
              </Box>
            ))}
          </Box>
        </ScrollView>
        {scrollInfo.contentHeight > scrollInfo.viewportHeight && (
          <ScrollBar
            placement="inset"
            style="block"
            color={isFocused ? colors.text : colors.dim}
            contentHeight={scrollInfo.contentHeight}
            viewportHeight={scrollInfo.viewportHeight}
            scrollOffset={scrollInfo.scrollOffset}
          />
        )}
      </Box>
    </ErrorBoundary>
  );
};
