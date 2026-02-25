import { Box, BoxProps, DOMElement, useInput } from "ink";
import { ScrollView } from "ink-scroll-view";
import { ReactNode, RefObject } from "react";
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
  ...props
}: ScrollListProps<T>) => {
  const { scrollViewRef, scrollInfo, scrollViewCallbacks } = useScrollView({
    ref,
    isFocused,
    isHidden,
    onFocus,
  });

  const scrollToIndex = (index: number) => {
    const sv = scrollViewRef.current;
    if (!sv) return;
    const offset = sv.getScrollOffset();
    const viewport = sv.getViewportHeight();
    if (index < offset + SCROLL_BUFFER) {
      sv.scrollTo(Math.max(0, index - SCROLL_BUFFER));
    } else if (index > offset + viewport - 1 - SCROLL_BUFFER) {
      sv.scrollTo(index - viewport + 1 + SCROLL_BUFFER);
    }
  };

  useInput((_, key) => {
    if (!isFocused) return;
    if (key.upArrow) {
      const next = Math.max(0, selectedIndex - 1);
      onChange(next);
      scrollToIndex(next);
    }
    if (key.downArrow) {
      const next = Math.min(items.length - 1, selectedIndex + 1);
      onChange(next);
      scrollToIndex(next);
    }
  });

  return (
    <ErrorBoundary>
      <Box flexDirection="row">
        <ScrollView ref={scrollViewRef} flexGrow={1} {...scrollViewCallbacks} {...props}>
          <Box flexDirection="column">
            {items.map((item, index) => renderItem(item, index, index === selectedIndex))}
          </Box>
        </ScrollView>
        <ScrollBar
          placement="inset"
          style="block"
          color={isFocused ? colors.text : colors.dim}
          contentHeight={scrollInfo.contentHeight}
          viewportHeight={scrollInfo.viewportHeight}
          scrollOffset={scrollInfo.scrollOffset}
        />
      </Box>
    </ErrorBoundary>
  );
};
