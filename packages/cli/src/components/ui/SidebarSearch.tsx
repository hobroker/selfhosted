import { Box, Text } from "ink";
import { colors } from "../../constants";

interface Props {
  query: string;
}

export const SidebarSearch = ({ query }: Props) => {
  return (
    <Box
      borderStyle="single"
      borderLeft={false}
      borderRight={false}
      borderBottom={false}
      borderColor={query ? colors.primary : colors.dim}
      paddingX={1}
    >
      <Text color={query ? colors.text : colors.dim}>{query || "/ search..."}</Text>
    </Box>
  );
};
