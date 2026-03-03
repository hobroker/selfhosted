import { useEffect } from "react";
import { Box } from "ink";
import { TextInput } from "@inkjs/ui";
import { useFocusManagerContext } from "../../contexts/FocusManagerContext";
import { colors } from "../../constants";

interface Props {
  onQueryChange: (query: string) => void;
}

export const SidebarSearch = ({ onQueryChange }: Props) => {
  const { focus, setFocus } = useFocusManagerContext();
  const isActive = focus === "search";

  useEffect(() => {
    if (!isActive) onQueryChange("");
  }, [isActive, onQueryChange]);

  return (
    <Box borderStyle="single" borderColor={isActive ? colors.primary : colors.dim} paddingX={1}>
      <TextInput
        key={isActive ? "active" : "inactive"}
        isDisabled={!isActive}
        placeholder="/ search..."
        onChange={onQueryChange}
        onSubmit={() => setFocus("sidebar")}
      />
    </Box>
  );
};
