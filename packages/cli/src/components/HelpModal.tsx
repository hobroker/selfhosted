import { Box, Text } from "ink";
import { colors } from "../constants";
import { Modal } from "./Modal";

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

export const HelpModal = () => (
  <Modal title="Help / Shortcuts" width="40%" minWidth={70}>
    <ShortcutEntry name="q" description="Quit application" />
    <ShortcutEntry name="?" description="Toggle this help menu" />
    <ShortcutEntry name="h" description="Show help history" />
    <ShortcutEntry name="d" description="Show helmfile diff" />
    <ShortcutEntry name="a" description="Run helmfile apply" />
    <ShortcutEntry name="tab" description="Switch focus between Sidebar and Details" />
    <ShortcutEntry name="arrows" description="Navigate list or scroll details" />
    <ShortcutEntry name="pgup/pgdn" description="Scroll details quickly" />
    <ShortcutEntry name="home/end" description="Jump to top/bottom of details" />
    <ShortcutEntry name="mouse wheel" description="Scroll focused section" />
    <ShortcutEntry name="mouse hover" description="Change focus automatically" />

    <Box marginTop={1} alignSelf="center">
      <Text color={colors.dim}>Press </Text>
      <Text color={colors.primary} bold>
        ?
      </Text>
      <Text color={colors.dim}> or </Text>
      <Text color={colors.primary} bold>
        Esc
      </Text>
      <Text color={colors.dim}> to close</Text>
    </Box>
  </Modal>
);
