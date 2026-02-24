import { ReactNode, useRef } from "react";
import { Box, BoxProps, type DOMElement } from "ink";
import { colors } from "../../constants";
import { TitledBox } from "./TitledBox";
import { useDimensions } from "../../hooks/useDimensions";
import { ErrorBoundary } from "./ErrorBoundary";
import { FocusState } from "../../types";
import { ScrollContainer } from "./ScrollContainer";

interface Props extends BoxProps {
  id: FocusState
  title: string;
  children: ReactNode;
  height?: number | string;
}

export const Modal = ({ title, children, height, ...boxProps }: Props) => {
  const dimensions = useDimensions();
  const ref = useRef<DOMElement>(null);

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
          <ScrollContainer ref={ref}>
            <Box paddingX={2} paddingY={1} flexDirection="column">
              {children}
            </Box>
          </ScrollContainer>
        </ErrorBoundary>
      </TitledBox>
    </Box>
  );
};
