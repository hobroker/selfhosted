import { Box, Text } from "ink";
import { colors } from "../constants";

export const Header = () => (
  <Box paddingX={1} borderStyle="single" borderColor={colors.primary} width="100%">
    <Box flexGrow={1}>
      <Text bold color={colors.primary}>
        Selfhosted Services Manager
      </Text>
    </Box>
    <Text color={colors.muted}>(q to quit | arrows to navigate)</Text>
  </Box>
);
