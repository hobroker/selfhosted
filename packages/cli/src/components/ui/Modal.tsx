import { ReactNode, useRef } from "react";
import { Box, BoxProps, type DOMElement } from "ink";
import { ScrollView } from "ink-scroll-view";
import { colors } from "../../constants";
import { TitledBox } from "./TitledBox";
import { useDimensions } from "../../hooks/useDimensions";
import { ErrorBoundary } from "./ErrorBoundary";
import { useScrollViewRef } from "../../hooks/useScrollViewRef";

interface Props extends BoxProps {
  title: string;
  children: ReactNode;
  height?: number | string;
}

export const Modal = ({ title, children, height, ...boxProps }: Props) => {
  const dimensions = useDimensions();
  const ref = useRef<DOMElement>(null);
  const scrollViewRef = useScrollViewRef({ ref });

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
