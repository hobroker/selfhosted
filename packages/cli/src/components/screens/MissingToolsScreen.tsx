import { Box, Text } from "ink";
import figures from "figures";
import { useDimensions } from "../../hooks/useDimensions";
import { colors } from "../../constants";
import { REQUIRED_TOOLS } from "../../contexts/ToolsContext";

interface Props {
  missing: string[];
}

export const MissingToolsScreen = ({ missing }: Props) => {
  const dimensions = useDimensions();

  return (
    <Box
      padding={1}
      height={dimensions.rows}
      width={dimensions.columns}
      flexDirection="column"
      gap={1}
    >
      <Text color={colors.error} bold>
        Missing required tools
      </Text>
      {missing.map((tool) => (
        <Box key={tool} gap={1}>
          <Text color={colors.error}>{figures.cross}</Text>
          <Text color={colors.text} bold>
            {tool}
          </Text>
          <Text color={colors.muted}>— used for: {REQUIRED_TOOLS[tool]}</Text>
        </Box>
      ))}
      <Text color={colors.muted}>Install the missing tools and try again.</Text>
    </Box>
  );
};
