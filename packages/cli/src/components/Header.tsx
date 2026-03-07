import { Box, Text } from "ink";
import { colors } from "../constants";

export const Header = () => {
  return (
    <Box paddingX={1} borderStyle="single" borderColor={colors.primary} width="100%">
      <Text bold color={colors.primary}>
        Selfhosted Services Manager
      </Text>
    </Box>
  );
};
