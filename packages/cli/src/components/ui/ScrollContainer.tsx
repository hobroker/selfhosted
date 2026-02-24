import { Box, BoxProps, DOMElement, useInput } from "ink";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { PropsWithChildren, RefObject, useRef, useState } from "react";
import { useOnMouseEnter, useOnMouseMove, useOnWheel } from "@ink-tools/ink-mouse";

interface Props extends BoxProps, PropsWithChildren {
  ref: RefObject<DOMElement | null>;
  isFocused?: boolean;
  onFocus?: () => void;
}

export const ScrollContainer = ({ children, ref, isFocused = true, onFocus, ...props }: Props) => {
  const [, setScrollInfo] = useState({ offset: 0, contentHeight: 0, viewportHeight: 0 });
  const scrollViewRef = useRef<ScrollViewRef>(null);

  useOnMouseEnter(ref, onFocus);
  useOnMouseMove(ref, onFocus);

  useInput((_, key) => {
    if (!isFocused) return;
    if (key.upArrow) {
      scrollViewRef.current?.scrollBy(-1);
    }
    if (key.downArrow) {
      scrollViewRef.current?.scrollBy(1);
    }
    if (key.pageUp) {
      scrollViewRef.current?.scrollBy(-10);
    }
    if (key.pageDown) {
      scrollViewRef.current?.scrollBy(10);
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
      scrollViewRef.current?.scrollBy(-2);
    } else if (event.button === "wheel-down") {
      scrollViewRef.current?.scrollBy(2);
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
        <Box height={3} />
      </Box>
    </ScrollView>
  );
};
