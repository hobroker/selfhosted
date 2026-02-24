import { Box, BoxProps, DOMElement, useInput } from "ink";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { PropsWithChildren, RefObject, useRef, useEffect, useState } from "react";
import { useOnMouseEnter, useOnMouseMove, useOnWheel } from "@ink-tools/ink-mouse";

interface Props extends BoxProps, PropsWithChildren {
  ref: RefObject<DOMElement | null>;
  scrollViewRef?: RefObject<ScrollViewRef | null>;
  isFocused?: boolean;
  onFocus?: () => void;
}

export const ScrollContainer = ({
  children,
  ref,
  scrollViewRef: _scrollViewRef,
  isFocused = true,
  onFocus,
  ...props
}: Props) => {
  const [, setScrollInfo] = useState({ offset: 0, contentHeight: 0, viewportHeight: 0 });
  const scrollViewRef = useRef<ScrollViewRef>(null);

  useEffect(() => {
    if (!_scrollViewRef) return;
    _scrollViewRef.current = scrollViewRef.current;
  }, [_scrollViewRef]);

  useOnMouseEnter(ref, onFocus);
  useOnMouseMove(ref, onFocus);

  const scrollBy = (offset: number) => {
    if (!scrollViewRef.current) return;
    const newOffset = Math.min(
      offset,
      (scrollViewRef.current.getBottomOffset() || 100) - scrollViewRef.current.getScrollOffset(),
    );
    scrollViewRef.current?.scrollBy(newOffset);
  };

  useInput((_, key) => {
    if (!isFocused) return;
    if (key.upArrow) {
      scrollBy(-1);
    }
    if (key.downArrow) {
      scrollBy(1);
    }
    if (key.pageUp) {
      scrollBy(-10);
    }
    if (key.pageDown) {
      scrollBy(10);
    }
    if (key.home) {
      scrollViewRef.current?.scrollTo(0);
    }
    if (key.end) {
      scrollViewRef.current?.scrollToBottom();
    }
  });

  useOnWheel(ref, (event) => {
    if (!isFocused) return;
    if (event.button === "wheel-up") {
      scrollBy(-2);
    } else if (event.button === "wheel-down") {
      scrollBy(2);
    }
  });

  return (
    <ScrollView
      ref={scrollViewRef}
      flexGrow={1}
      onScroll={(offset) => setScrollInfo((s) => ({ ...s, offset }))}
      onContentHeightChange={(height) => setScrollInfo((s) => ({ ...s, contentHeight: height }))}
      onViewportSizeChange={(size) => setScrollInfo((s) => ({ ...s, viewportHeight: size.height }))}
      {...props}
    >
      <Box flexDirection="column">
        {children}
        <Box height={2} />
      </Box>
    </ScrollView>
  );
};
