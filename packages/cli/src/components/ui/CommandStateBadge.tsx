import { Box, Text } from "ink";
import { colors, CommandState, commandStateLabelsMap } from "../../constants";
import { Spinner } from "@inkjs/ui";

interface Props {
  state: CommandState;
}

export const CommandStateBadge = ({ state }: Props) => {
  const { icon, label } = commandStateLabelsMap[state];
  if (state === CommandState.Loading) {
    return (
      <Box paddingX={1} backgroundColor={colors.background}>
        <Spinner label={label} />
      </Box>
    );
  }
  return (
    <Box paddingX={1}>
      <Text color={colors.primary}>
        {" "}
        {icon} {label}{" "}
      </Text>
    </Box>
  );
};
