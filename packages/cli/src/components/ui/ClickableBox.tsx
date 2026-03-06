import { useRef, PropsWithChildren } from "react";
import { Box, DOMElement, BoxProps } from "ink";
import { useOnClick } from "@ink-tools/ink-mouse";

interface Props extends PropsWithChildren<BoxProps> {
  onClick?: () => void;
}

export const ClickableItem = ({ onClick, children, ...props }: Props) => {
  const ref = useRef<DOMElement>(null);

  useOnClick(ref, () => onClick?.());

  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
};
