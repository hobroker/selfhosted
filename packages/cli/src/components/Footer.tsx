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
    <Box ref={ref}>
      <Text color={colors.primary} bold>
        {name}
      </Text>
      <Text color={colors.muted}> {description}</Text>
    </Box>
  );
};

const ShortcutAction = ({
  actionKey,
  action,
}: {
  actionKey: keyof typeof ACTIONS;
  action?: (typeof ACTIONS)[keyof typeof ACTIONS];
}) => {
  const { setFocus } = useFocusManagerContext();
  const _action = action || ACTIONS[actionKey];
  return (
    <Shortcut
      name={_action.shortcut[0]}
      description={_action.label}
      onClick={() => setFocus(actionKey)}
    />
  );
};

export const Footer = () => {
  return (
    <Box paddingX={1} width="100%" gap={2}>
      <Shortcut name="q" description="quit" />
      <ShortcutAction actionKey="refresh" />
      <ShortcutAction actionKey="logs" />
      <ShortcutAction actionKey="history" />
      <ShortcutAction actionKey="diff" />
      <ShortcutAction actionKey="apply-confirm" action={ACTIONS.apply} />
      <ShortcutAction actionKey="destroy-confirm" action={ACTIONS.destroy} />
      <ShortcutAction actionKey="help" />
    </Box>
  );
};
