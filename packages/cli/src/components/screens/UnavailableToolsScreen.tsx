import { Box, Text, useInput } from "ink";
import figures from "figures";
import { useDimensions } from "../../hooks/useDimensions";
import { colors } from "../../constants";
import { OPTIONAL_TOOLS } from "../../contexts/ToolsContext";

interface Props {
  unavailable: string[];
  onDismiss: () => void;
}

export const UnavailableToolsScreen = ({ unavailable, onDismiss }: Props) => {
  const dimensions = useDimensions();

  useInput((input) => {
    if (input) onDismiss();
  });

  return (
    <Box
      padding={1}
      height={dimensions.rows}
      width={dimensions.columns}
      flexDirection="column"
      gap={1}
    >
      <Text color={colors.warning} bold>
        Some optional tools are not installed
      </Text>
      {unavailable.map((tool) => (
        <Box key={tool} gap={1}>
          <Text color={colors.warning}>{figures.warning}</Text>
          <Text color={colors.text} bold>
            {tool}
          </Text>
          <Text color={colors.muted}>— {OPTIONAL_TOOLS[tool]} will not be available</Text>
        </Box>
      ))}
      <Text color={colors.dim}>Press any key to continue...</Text>
    </Box>
  );
};
