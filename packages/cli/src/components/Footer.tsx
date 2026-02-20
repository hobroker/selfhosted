import { Box, Text } from "ink";
import { colors } from "../constants";

const Shortcut = ({ name, description }: { name: string; description: string }) => (
  <Box marginRight={2}>
    <Text color={colors.primary} bold>
      {name}
    </Text>
    <Text color={colors.muted}> {description}</Text>
  </Box>
);

export const Footer = () => (
  <Box paddingX={1} borderStyle="single" borderColor={colors.primary} width="100%">
    <Shortcut name="q" description="quit" />
    <Shortcut name="tab" description="focus" />
  </Box>
);
