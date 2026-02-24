import { useRef } from "react";
import { Box, Text, DOMElement } from "ink";
import { useOnClick } from "@ink-tools/ink-mouse";
import { ACTIONS, colors } from "../constants";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";

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

export const Footer = () => {
  const { setFocus } = useFocusManagerContext();
  return (
    <Box paddingX={1} borderStyle="single" borderColor={colors.primary} width="100%">
      <Shortcut name="q" description="quit" />
      <Shortcut name="tab" description="focus" />
      <Shortcut name="arrows" description="navigate" />
      <Shortcut
        name={ACTIONS.history.shortcut[0]}
        description="history"
        onClick={() => setFocus("history")}
      />
      <Shortcut
        name={ACTIONS.diff.shortcut[0]}
        description="diff"
        onClick={() => setFocus("diff")}
      />
      <Shortcut
        name={ACTIONS.apply.shortcut[0]}
        description="apply"
        onClick={() => setFocus("apply-confirm")}
      />
      <Shortcut
        name={ACTIONS.help.shortcut[0]}
        description="help"
        onClick={() => setFocus("help")}
      />
    </Box>
  );
};
