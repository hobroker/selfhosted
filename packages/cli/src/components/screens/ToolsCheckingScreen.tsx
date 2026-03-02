import { Box, Text } from "ink";
import { useDimensions } from "../../hooks/useDimensions";
import { colors } from "../../constants";

export const ToolsCheckingScreen = () => {
  const dimensions = useDimensions();

  return (
    <Box
      padding={1}
      height={dimensions.rows}
      width={dimensions.columns}
      justifyContent="center"
      alignItems="center"
    >
      <Text color={colors.muted}>Checking required tools...</Text>
    </Box>
  );
};
