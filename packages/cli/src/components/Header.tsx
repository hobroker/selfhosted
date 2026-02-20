import { Box, Text } from "ink";

export const Header = () => (
  <Box paddingX={1} borderStyle="single" borderColor="blue" width="100%">
    <Box flexGrow={1}>
      <Text bold color="cyan">
        Selfhosted Services Manager
      </Text>
    </Box>
    <Text dimColor>(q to quit | arrows to navigate)</Text>
  </Box>
);
