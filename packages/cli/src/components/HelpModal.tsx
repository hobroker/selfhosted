import { Box, Text } from "ink";
import { colors } from "../constants";
import { TitledBox } from "./TitledBox";
import { useDimensions } from "../hooks/useDimensions";

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

export const HelpModal = () => {
  const dimensions = useDimensions();
  return (
    <Box
      position="absolute"
      width={dimensions.columns}
      height={dimensions.rows}
      alignItems="center"
      justifyContent="center"
    >
      <TitledBox
        title="Help / Shortcuts"
        width="40%"
        minWidth={70}
        isFocused
        backgroundColor={colors.background}
      >
        <Box paddingX={2} paddingY={1} flexDirection="column">
          <ShortcutEntry name="q" description="Quit application" />
          <ShortcutEntry name="?" description="Toggle this help menu" />
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
            <Text color={colors.dim}> or any key to close</Text>
          </Box>
        </Box>
      </TitledBox>
    </Box>
  );
};
