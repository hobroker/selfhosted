import { Box, BoxProps, DOMElement, useInput } from "ink";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { PropsWithChildren, RefObject, useRef, useEffect, useState } from "react";
import { useOnMouseEnter, useOnMouseMove, useOnWheel } from "@ink-tools/ink-mouse";
import { ScrollBar } from "@byteland/ink-scroll-bar";
import { ErrorBoundary } from "./ErrorBoundary";
import { colors } from "../../constants";

interface Props extends BoxProps, PropsWithChildren {
  ref: RefObject<DOMElement | null>;
  scrollViewRef?: RefObject<ScrollViewRef | null>;
  isFocused?: boolean;
  isHidden?: boolean;
  onFocus?: () => void;
}

export const ScrollContainer = ({
  children,
  ref,
  scrollViewRef: _scrollViewRef,
  isFocused = true,
  isHidden = false,
  onFocus,
  ...props
}: Props) => {
  const [scrollInfo, setScrollInfo] = useState({ offset: 0, contentHeight: 0, viewportHeight: 0 });
  const scrollViewRef = useRef<ScrollViewRef>(null);

  useEffect(() => {
    if (!_scrollViewRef) return;
    _scrollViewRef.current = scrollViewRef.current;
  }, [_scrollViewRef]);

  useEffect(() => {
    scrollViewRef.current?.scrollTo(0);
  }, [scrollViewRef]);

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
    if (isHidden) return;
    if (event.button === "wheel-up") {
      scrollBy(-2);
    } else if (event.button === "wheel-down") {
      scrollBy(2);
    }
  });

  return (
    <ErrorBoundary>
      <Box flexDirection="row">
        <ScrollView
          ref={scrollViewRef}
          flexGrow={1}
          onScroll={(offset) => setScrollInfo((s) => ({ ...s, offset }))}
          onContentHeightChange={(height) =>
            setScrollInfo((s) => ({ ...s, contentHeight: height }))
          }
          onViewportSizeChange={(size) =>
            setScrollInfo((s) => ({ ...s, viewportHeight: size.height }))
          }
          {...props}
        >
          <Box flexDirection="column">
            {children}
            <Box height={2} />
          </Box>
        </ScrollView>
        <ScrollBar
          placement="inset"
          style="block"
          color={isFocused ? colors.text : colors.dim}
          contentHeight={scrollInfo.contentHeight}
          viewportHeight={scrollInfo.viewportHeight}
          scrollOffset={scrollInfo.offset}
        />
      </Box>
    </ErrorBoundary>
  );
};
