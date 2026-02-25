import { Box, BoxProps, DOMElement, useInput } from "ink";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useOnMouseEnter, useOnMouseMove, useOnWheel } from "@ink-tools/ink-mouse";
import { ScrollBar } from "@byteland/ink-scroll-bar";
import { ErrorBoundary } from "./ErrorBoundary";
import { colors } from "../../constants";

const SCROLL_BUFFER = 2;

interface ScrollListProps<T> extends BoxProps {
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
  const [scrollInfo, setScrollInfo] = useState({
    scrollOffset: 0,
    contentHeight: 0,
    viewportHeight: 0,
  });
  const scrollViewRef = useRef<ScrollViewRef>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const sv = scrollViewRef.current;
      if (!sv || !isFocused || isHidden) return;
      sv.remeasure();
      setScrollInfo({
        scrollOffset: sv.getScrollOffset(),
        contentHeight: sv.getContentHeight(),
        viewportHeight: sv.getViewportHeight(),
      });
    }, 250);
    return () => clearInterval(id);
  }, [isFocused, isHidden]);

  const _onFocus = () => {
    if (!isFocused && !isHidden) {
      onFocus?.();
    }
  };

  useOnMouseEnter(ref, _onFocus);
  useOnMouseMove(ref, _onFocus);

  const scrollBy = (offset: number) => {
    const sv = scrollViewRef.current;
    if (!sv) return;
    if (sv.getContentHeight() <= sv.getViewportHeight()) return;
    const clamped = Math.min(offset, (sv.getBottomOffset() || 100) - sv.getScrollOffset());
    sv.scrollBy(clamped);
  };

  useOnWheel(ref, (event) => {
    if (isHidden) return;
    if (event.button === "wheel-up") {
      scrollBy(-2);
    } else if (event.button === "wheel-down") {
      scrollBy(2);
    }
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
        <ScrollView
          ref={scrollViewRef}
          flexGrow={1}
          onScroll={(scrollOffset) => setScrollInfo((s) => ({ ...s, scrollOffset }))}
          onContentHeightChange={(contentHeight) => setScrollInfo((s) => ({ ...s, contentHeight }))}
          onViewportSizeChange={(size) =>
            setScrollInfo((s) => ({ ...s, viewportHeight: size.height }))
          }
          {...props}
        >
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
