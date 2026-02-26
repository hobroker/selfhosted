import { PropsWithChildren, ReactNode, forwardRef } from "react";
import { Box, Text, BoxProps, DOMElement } from "ink";
import { colors } from "../../constants";

interface Props extends PropsWithChildren, BoxProps {
  title: string;
  isFocused?: boolean;
  rightAdornment?: ReactNode;
}

export const TitledBox = forwardRef<DOMElement, Props>(
  ({ title, children, isFocused, rightAdornment, ...boxProps }, ref) => {
    return (
      <Box
        ref={ref}
        borderStyle="single"
        borderColor={isFocused ? colors.borderActive : colors.border}
        {...boxProps}
      >
        <Box
          position="absolute"
          marginTop={-1}
          marginLeft={1}
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box paddingX={1}>
            <Text
              color={isFocused ? colors.primary : colors.dim}
              bold={isFocused}
              backgroundColor={colors.background}
            >
              {` ${title.toUpperCase()} `}
            </Text>
          </Box>
          {rightAdornment && (
            <Box paddingX={1} marginRight={2}>
              {typeof rightAdornment === "string" ? (
                <Text
                  color={isFocused ? colors.primary : colors.dim}
                  bold={isFocused}
                  backgroundColor={colors.background}
                >
                  {` ${rightAdornment} `}
                </Text>
              ) : (
                rightAdornment
              )}
            </Box>
          )}
        </Box>
        {children}
      </Box>
    );
  },
);

TitledBox.displayName = "TitledBox";
