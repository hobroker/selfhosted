import { DOMElement, useInput } from "ink";
import { ScrollViewRef } from "ink-scroll-view";
import { RefObject, useEffect, useRef, useState } from "react";
import { useOnMouseEnter, useOnMouseMove, useOnWheel, useOnClick } from "@ink-tools/ink-mouse";

interface Options {
  ref: RefObject<DOMElement | null>;
  isFocused: boolean;
  isHidden: boolean;
  onFocus?: () => void;
  keyboardScroll?: boolean;
  autoScrollToBottom?: boolean;
}

interface ScrollViewCallbacks {
  onScroll: (scrollOffset: number) => void;
  onContentHeightChange: (contentHeight: number) => void;
  onViewportSizeChange: (size: { height: number }) => void;
}

interface Result {
  scrollViewRef: RefObject<ScrollViewRef | null>;
  scrollInfo: { scrollOffset: number; contentHeight: number; viewportHeight: number };
  scrollBy: (offset: number) => void;
  scrollViewCallbacks: ScrollViewCallbacks;
}

export const useScrollView = ({
  ref,
  isFocused,
  isHidden,
  onFocus,
  keyboardScroll = false,
  autoScrollToBottom = false,
}: Options): Result => {
  const [scrollInfo, setScrollInfo] = useState({
    scrollOffset: 0,
    contentHeight: 0,
    viewportHeight: 0,
  });
  const scrollViewRef = useRef<ScrollViewRef>(null);
  const prevContentHeight = useRef(0);
  const atBottom = useRef(true);

  useEffect(() => {
    const id = setInterval(() => {
      const sv = scrollViewRef.current;
      if (!sv || !isFocused || isHidden) return;
      sv.remeasure();
      const offset = sv.getScrollOffset();
      const contentHeight = sv.getContentHeight();
      const viewportHeight = sv.getViewportHeight();
      const bottomOffset = sv.getBottomOffset();

      setScrollInfo({ scrollOffset: offset, contentHeight, viewportHeight });

      if (autoScrollToBottom) {
        // Re-enable intent if user scrolled back to the actual bottom
        if (bottomOffset <= 0 || offset >= bottomOffset) atBottom.current = true;
        if (atBottom.current && contentHeight > prevContentHeight.current) {
          sv.scrollToBottom();
        }
        prevContentHeight.current = contentHeight;
      }
    }, 250);
    return () => clearInterval(id);
  }, [isFocused, isHidden, autoScrollToBottom]);

  const _onFocus = () => {
    if (!isFocused && !isHidden) onFocus?.();
  };

  useOnMouseEnter(ref, _onFocus);
  useOnMouseMove(ref, _onFocus);
  useOnClick(ref, _onFocus);

  const scrollBy = (offset: number) => {
    const sv = scrollViewRef.current;
    if (!sv) return;
    if (sv.getContentHeight() <= sv.getViewportHeight()) return;
    const clamped = Math.min(offset, (sv.getBottomOffset() || 100) - sv.getScrollOffset());
    if (offset < 0) atBottom.current = false;
    sv.scrollBy(clamped);
  };

  useOnWheel(ref, (event) => {
    if (isHidden) return;
    if (event.button === "wheel-up") scrollBy(-2);
    else if (event.button === "wheel-down") scrollBy(2);
  });

  useInput((_, key) => {
    if (!keyboardScroll || !isFocused) return;
    if (key.upArrow) scrollBy(-1);
    if (key.downArrow) scrollBy(1);
    if (key.pageUp) scrollBy(-10);
    if (key.pageDown) scrollBy(10);
    if (key.home) {
      atBottom.current = false;
      scrollViewRef.current?.scrollTo(0);
    }
    if (key.end) {
      atBottom.current = true;
      scrollViewRef.current?.scrollToBottom();
    }
  });

  const scrollViewCallbacks: ScrollViewCallbacks = {
    onScroll: (scrollOffset) => setScrollInfo((s) => ({ ...s, scrollOffset })),
    onContentHeightChange: (contentHeight) => setScrollInfo((s) => ({ ...s, contentHeight })),
    onViewportSizeChange: (size) => setScrollInfo((s) => ({ ...s, viewportHeight: size.height })),
  };

  return { scrollViewRef, scrollInfo, scrollBy, scrollViewCallbacks };
};
