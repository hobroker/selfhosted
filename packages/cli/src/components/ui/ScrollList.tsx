import { Box, BoxProps, DOMElement, useInput } from "ink";
import { ScrollView } from "ink-scroll-view";
import { ReactNode, RefObject, useRef } from "react";
import { ScrollBar } from "@byteland/ink-scroll-bar";
import { useOnClick } from "@ink-tools/ink-mouse";
import { ErrorBoundary } from "./ErrorBoundary";
import { colors } from "../../constants";
import { useScrollView } from "../../hooks/useScrollView";
import { FocusState } from "../../types";

const SCROLL_BUFFER = 2;

const ItemWrapper = ({
  index,
  onChange,
  isCategory,
  children,
}: {
  index: number;
  onChange: (i: number) => void;
  isCategory: boolean;
  children: ReactNode;
}) => {
  const ref = useRef<DOMElement>(null);
  useOnClick(ref, () => {
    if (isCategory) {
      onChange(index + 1);
    } else {
      onChange(index);
    }
  });

  return <Box ref={ref}>{children}</Box>;
};

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
  isCategory?: (item: T) => boolean;
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
  isCategory,
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

  const findNext = (from: number, dir: 1 | -1): number => {
    let i = from + dir;
    while (i >= 0 && i < items.length) {
      if (!isCategory?.(items[i])) return i;
      i += dir;
    }
    return from;
  };

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
            {items.map((item, index) => {
              const cat = isCategory?.(item) ?? false;
              return (
                <ItemWrapper key={index} index={index} onChange={onChange} isCategory={cat}>
                  {renderItem(item, index, !cat && index === selectedIndex)}
                </ItemWrapper>
              );
            })}
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
