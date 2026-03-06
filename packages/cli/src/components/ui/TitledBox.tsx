import { PropsWithChildren, ReactNode, Ref } from "react";
import { Box, Text, BoxProps, DOMElement } from "ink";
import { colors } from "../../constants";

interface Props extends PropsWithChildren, BoxProps {
  ref?: Ref<DOMElement>;
  title?: string;
  isFocused?: boolean;
  rightAdornment?: ReactNode;
}

export const TitledBox = ({ ref, title, children, isFocused, rightAdornment, ...boxProps }: Props) => {
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
        {title && (
          <Box paddingX={1}>
            <Text color={isFocused ? colors.primary : colors.dim} bold={isFocused}>
              {` ${title.toUpperCase()} `}
            </Text>
          </Box>
        )}
        {rightAdornment && (
          <Box paddingX={1} marginRight={2}>
            {typeof rightAdornment === "string" ? (
              <Text color={isFocused ? colors.primary : colors.dim} bold={isFocused}>
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
};
