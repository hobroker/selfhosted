import { Box, BoxProps, DOMElement } from "ink";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { PropsWithChildren, RefObject, useEffect } from "react";
import { ScrollBar } from "@byteland/ink-scroll-bar";
import { ErrorBoundary } from "./ErrorBoundary";
import { colors } from "../../constants";
import { FocusState } from "../../types";
import { useScrollView } from "../../hooks/useScrollView";

interface Props extends BoxProps, PropsWithChildren {
  id: FocusState;
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
  const { scrollViewRef, scrollInfo, scrollViewCallbacks } = useScrollView({
    ref,
    isFocused,
    isHidden,
    onFocus,
    keyboardScroll: true,
  });

  useEffect(() => {
    if (!_scrollViewRef) return;
    _scrollViewRef.current = scrollViewRef.current;
  }, [_scrollViewRef, scrollViewRef]);

  useEffect(() => {
    scrollViewRef.current?.scrollTo(0);
  }, [scrollViewRef]);

  return (
    <ErrorBoundary>
      <Box flexDirection="row">
        <ScrollView
          ref={scrollViewRef}
          flexGrow={1}
          {...scrollViewCallbacks}
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
          scrollOffset={scrollInfo.scrollOffset}
        />
      </Box>
    </ErrorBoundary>
  );
};
