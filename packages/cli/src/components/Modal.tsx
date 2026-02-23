import { ReactNode } from "react";
import { Box, BoxProps } from "ink";
import { colors } from "../constants";
import { TitledBox } from "./TitledBox";
import { useDimensions } from "../hooks/useDimensions";

interface Props extends BoxProps {
  title: string;
  children: ReactNode;
}

export const Modal = ({ title, children, ...boxProps }: Props) => {
  const dimensions = useDimensions();

  return (
    <Box
      position="absolute"
      width={dimensions.columns}
      height={dimensions.rows}
      alignItems="center"
      justifyContent="center"
    >
      <TitledBox title={title} backgroundColor={colors.background} isFocused {...boxProps}>
        <Box paddingX={2} paddingY={1} flexDirection="column">
          {children}
        </Box>
      </TitledBox>
    </Box>
  );
};
