import { ReactNode, useRef, useState } from "react";
import { Box, BoxProps, type DOMElement, useInput } from "ink";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { colors } from "../constants";
import { TitledBox } from "./TitledBox";
import { useDimensions } from "../hooks/useDimensions";
import { useOnWheel } from "@ink-tools/ink-mouse";
import { ErrorBoundary } from "./ErrorBoundary";

interface Props extends BoxProps {
  title: string;
  children: ReactNode;
  height?: number | string;
}

export const Modal = ({ title, children, height, ...boxProps }: Props) => {
  const dimensions = useDimensions();
  const scrollViewRef = useRef<ScrollViewRef>(null);
  const ref = useRef<DOMElement>(null);
  const [, setScrollOffset] = useState<number>();

  useInput((_, key) => {
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
    setScrollOffset(scrollViewRef.current?.getScrollOffset());
  });

  useOnWheel(ref, (event) => {
    if (event.button === "wheel-up") {
      scrollViewRef.current?.scrollBy(-2);
    } else if (event.button === "wheel-down") {
      scrollViewRef.current?.scrollBy(2);
    }
  });

  return (
    <Box
      position="absolute"
      width={dimensions.columns}
      height={dimensions.rows}
      alignItems="center"
      justifyContent="center"
    >
      <TitledBox
        title={title}
        backgroundColor={colors.background}
        isFocused
        height={height}
        ref={ref}
        {...boxProps}
      >
        <ErrorBoundary>
          <ScrollView ref={scrollViewRef} flexGrow={1}>
            <Box paddingX={2} paddingY={1} flexDirection="column">
              {children}
            </Box>
          </ScrollView>
        </ErrorBoundary>
      </TitledBox>
    </Box>
  );
};
