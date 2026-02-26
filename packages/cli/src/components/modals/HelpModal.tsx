import { Box, Text } from "ink";
import { colors, ACTIONS } from "../../constants";
import { Modal } from "../ui/Modal";
import { Action } from "../../types";

const ShortcutEntry = ({ name, description }: { name: string; description: string }) => (
  <Box marginBottom={1}>
    <Box width={15}>
      <Text color={colors.primary} bold>
        {name}
      </Text>
    </Box>
    <Text color={colors.text}>{description}</Text>
  </Box>
);

const ActionShortcut = ({ action }: { action: Action }) => (
  <ShortcutEntry name={action.shortcut[0]} description={action.description} />
);

export const HelpModal = () => (
  <Modal id="help" title="Help / Shortcuts" width="40%" minWidth={70}>
    <ShortcutEntry name="q" description="Quit application" />
    <ActionShortcut action={ACTIONS.help} />
    <ActionShortcut action={ACTIONS.history} />
    <ActionShortcut action={ACTIONS.diff} />
    <ActionShortcut action={ACTIONS.apply} />
    <ActionShortcut action={ACTIONS.refresh} />
    <ActionShortcut action={ACTIONS.destroy} />
    <ActionShortcut action={ACTIONS.logs} />
    <ShortcutEntry name="tab" description="Switch focus between Sidebar and Details" />
    <ShortcutEntry name="arrows" description="Navigate list or scroll details" />
    <ShortcutEntry name="mouse wheel" description="Scroll focused section" />

    <Box marginTop={1} alignSelf="center">
      <Text color={colors.dim}>Press </Text>
      <Text color={colors.primary} bold>
        {ACTIONS.help.shortcut[0]}
      </Text>
      <Text color={colors.dim}> or </Text>
      <Text color={colors.primary} bold>
        Esc
      </Text>
      <Text color={colors.dim}> to close</Text>
    </Box>
  </Modal>
);
