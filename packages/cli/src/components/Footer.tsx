import { Box, Text } from "ink";
import { colors } from "../constants";

export const Footer = () => (
  <Box paddingX={1} borderStyle="single" borderColor={colors.primary} width="100%">
    <Text color={colors.muted}>(q to quit | arrows to navigate)</Text>
  </Box>
);
