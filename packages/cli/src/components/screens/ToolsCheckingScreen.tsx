import { Box, Text } from "ink";
import { colors } from "../../constants";

export const ToolsCheckingScreen = () => {
  return (
    <Box padding={1} justifyContent="center" alignItems="center">
      <Text color={colors.muted}>Checking required tools...</Text>
    </Box>
  );
};
