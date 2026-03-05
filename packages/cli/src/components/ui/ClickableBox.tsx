import { useRef, PropsWithChildren } from "react";
import { Box, DOMElement, BoxProps } from "ink";
import { useOnClick } from "@ink-tools/ink-mouse";

export const ClickableItem = ({
  onClick,
  children,
  ...props
}: PropsWithChildren<BoxProps & { onClick: () => void }>) => {
  const ref = useRef<DOMElement>(null);
  useOnClick(ref, onClick);
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
};
