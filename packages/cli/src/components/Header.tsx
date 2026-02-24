import { Box, Text } from "ink";
import { colors } from "../constants";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";

export const Header = () => {
  const { focus } = useFocusManagerContext();
  return (
    <Box paddingX={1} borderStyle="single" borderColor={colors.primary} width="100%">
      <Box flexGrow={1}>
        <Text bold color={colors.primary}>
          Selfhosted Services Manager {focus}
        </Text>
      </Box>
      <Text color={colors.muted}>(q to quit | arrows to navigate)</Text>
    </Box>
  );
};
