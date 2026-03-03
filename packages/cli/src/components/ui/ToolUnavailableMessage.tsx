import { Text } from "ink";
import { colors } from "../../constants";
import { OPTIONAL_TOOLS, OptionalToolKey } from "../../contexts/ToolsContext";

interface Props {
  tool: OptionalToolKey;
}

export const ToolUnavailableMessage = ({ tool }: Props) => (
  <Text color={colors.warning}>
    {tool} is not installed — {OPTIONAL_TOOLS[tool].description} will not be available
  </Text>
);
