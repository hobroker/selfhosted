import { Box, Text, useApp } from "ink";
import figures from "figures";
import { colors } from "../../constants";
import { REQUIRED_TOOLS, useToolsContext } from "../../contexts/ToolsContext";
import { useEffect } from "react";

export const MissingToolsScreen = () => {
  const { missing } = useToolsContext();
  const { exit } = useApp();

  useEffect(() => {
    exit();
  }, [exit]);

  return (
    <Box padding={1} flexDirection="column" gap={1}>
      <Text color={colors.error} bold>
        Missing required tools
      </Text>
      {missing.map((tool) => (
        <Box key={tool} gap={1}>
          <Text color={colors.error}>{figures.cross}</Text>
          <Text color={colors.text} bold>
            {tool}
          </Text>
          <Text color={colors.muted}>— used for: {REQUIRED_TOOLS[tool].description}</Text>
        </Box>
      ))}
      <Text color={colors.muted}>Install the missing tools and try again.</Text>
    </Box>
  );
};
