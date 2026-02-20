import { Box, Text } from "ink";

export const Footer = () => (
  <Box paddingX={1} borderStyle="single" borderColor="blue" width="100%">
    <Text dimColor>(q to quit | arrows to navigate)</Text>
  </Box>
);
