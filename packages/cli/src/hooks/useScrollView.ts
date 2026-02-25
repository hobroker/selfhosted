import { DOMElement, useInput } from "ink";
import { ScrollViewRef } from "ink-scroll-view";
import { RefObject, useEffect, useRef, useState } from "react";
import { useOnMouseEnter, useOnMouseMove, useOnWheel } from "@ink-tools/ink-mouse";

interface Options {
  ref: RefObject<DOMElement | null>;
  isFocused: boolean;
  isHidden: boolean;
  onFocus?: () => void;
  keyboardScroll?: boolean;
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
}: Options): Result => {
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
    if (!isFocused && !isHidden) onFocus?.();
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
    if (event.button === "wheel-up") scrollBy(-2);
    else if (event.button === "wheel-down") scrollBy(2);
  });

  useInput((_, key) => {
    if (!keyboardScroll || !isFocused) return;
    if (key.upArrow) scrollBy(-1);
    if (key.downArrow) scrollBy(1);
    if (key.pageUp) scrollBy(-10);
    if (key.pageDown) scrollBy(10);
    if (key.home) scrollViewRef.current?.scrollTo(0);
    if (key.end) scrollViewRef.current?.scrollToBottom();
  });

  const scrollViewCallbacks: ScrollViewCallbacks = {
    onScroll: (scrollOffset) => setScrollInfo((s) => ({ ...s, scrollOffset })),
    onContentHeightChange: (contentHeight) => setScrollInfo((s) => ({ ...s, contentHeight })),
    onViewportSizeChange: (size) => setScrollInfo((s) => ({ ...s, viewportHeight: size.height })),
  };

  return { scrollViewRef, scrollInfo, scrollBy, scrollViewCallbacks };
};
