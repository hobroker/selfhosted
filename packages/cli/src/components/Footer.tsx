import React, { useRef } from "react";
import { Box, Text, DOMElement } from "ink";
import { useOnClick } from "@ink-tools/ink-mouse";
import { colors } from "../constants";

const Shortcut = ({
  name,
  description,
  onClick,
}: {
  name: string;
  description: string;
  onClick?: () => void;
}) => {
  const ref = useRef<DOMElement>(null);
  useOnClick(ref, () => onClick?.());

  return (
    <Box marginRight={2} ref={ref}>
      <Text color={colors.primary} bold>
        {name}
      </Text>
      <Text color={colors.muted}> {description}</Text>
    </Box>
  );
};

export const Footer = ({ onShowHelp }: { onShowHelp?: () => void }) => (
  <Box paddingX={1} borderStyle="single" borderColor={colors.primary} width="100%">
    <Shortcut name="q" description="quit" />
    <Shortcut name="?" description="help" onClick={onShowHelp} />
  </Box>
);
