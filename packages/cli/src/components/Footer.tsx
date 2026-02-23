import { useRef } from "react";
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

export const Footer = ({
  onShowHelp,
  onShowHistory,
}: {
  onShowHelp?: () => void;
  onShowHistory?: () => void;
}) => (
  <Box paddingX={1} borderStyle="single" borderColor={colors.primary} width="100%">
    <Shortcut name="q" description="quit" />
    <Shortcut name="tab" description="focus" />
    <Shortcut name="arrows" description="navigate" />
    <Shortcut name="h" description="history" onClick={onShowHistory} />
    <Shortcut name="?" description="help" onClick={onShowHelp} />
  </Box>
);
