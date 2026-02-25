import { PropsWithChildren, forwardRef } from "react";
import { Box, Text, BoxProps, DOMElement } from "ink";
import { colors } from "../../constants";

interface Props extends PropsWithChildren, BoxProps {
  title: string;
  isFocused?: boolean;
}

export const TitledBox = forwardRef<DOMElement, Props>(
  ({ title, children, isFocused, ...boxProps }, ref) => {
    return (
      <Box
        ref={ref}
        borderStyle="single"
        borderColor={isFocused ? colors.borderActive : colors.border}
        {...boxProps}
      >
        <Box position="absolute" marginTop={-1} marginLeft={1} paddingX={1}>
          <Text
            color={isFocused ? colors.primary : colors.dim}
            bold={isFocused}
            backgroundColor={colors.background}
          >
            {` ${title.toUpperCase()} `}
          </Text>
        </Box>
        {children}
      </Box>
    );
  },
);

TitledBox.displayName = "TitledBox";
