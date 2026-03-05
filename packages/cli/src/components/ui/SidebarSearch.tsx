import { Box, Text } from "ink";
import { colors } from "../../constants";

interface Props {
  query: string;
}

export const SidebarSearch = ({ query }: Props) => {
  const borderColor = query ? colors.primary : colors.dim;
  return (
    <Box
      borderStyle="single"
      borderLeft={false}
      borderRight={false}
      borderBottom={false}
      borderColor={borderColor}
      paddingX={1}
    >
      {query && (
        <Box position="absolute" marginTop={-1} marginLeft={1}>
          <Text color={borderColor}> SEARCH </Text>
        </Box>
      )}
      <Text color={query ? colors.text : colors.dim}>{query || "/ type to search..."}</Text>
    </Box>
  );
};
