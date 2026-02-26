import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors, commandStateLabelsMap } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { useServicesContext } from "../../contexts/ServicesContext";
import { useCommandHooks } from "../../hooks/useCommandHooks";

export const DiffModal = () => {
  const { selectedService } = useServicesContext();
  const { commandState, ...commandHooks } = useCommandHooks();

  if (!selectedService) {
    return (
      <Modal id="diff" title="Helmfile Diff" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal
      id="diff"
      title={`Helmfile Diff: ${selectedService.name}`}
      width="80%"
      height="80%"
      rightAdornment={commandStateLabelsMap[commandState].icon}
    >
      <CommandOutput
        command="helmfile"
        args={["--color", "diff"]}
        cwd={selectedService.path}
        loadingText="Generating diff..."
        emptyText="No changes found"
        {...commandHooks}
      />
    </Modal>
  );
};
