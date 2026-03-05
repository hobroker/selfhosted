import { Text } from "ink";
import { colors } from "../../constants";
import { TitledBox } from "./TitledBox";

interface Props {
  query: string;
}

export const SidebarSearch = ({ query }: Props) => {
  const borderColor = query ? colors.primary : colors.dim;
  return (
    <TitledBox
      title={query ? "Search" : ""}
      borderStyle="single"
      borderLeft={false}
      borderRight={false}
      borderBottom={false}
      borderColor={borderColor}
      paddingX={1}
    >
      <Text color={query ? colors.text : colors.dim}>{query || "type to search..."}</Text>
    </TitledBox>
  );
};
