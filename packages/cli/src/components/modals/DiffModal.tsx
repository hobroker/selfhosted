import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { useServicesContext } from "../../contexts/ServicesContext";

export const DiffModal = () => {
  const { selectedService } = useServicesContext();

  if (!selectedService) {
    return (
      <Modal id="diff" title="Helmfile Diff" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal id="diff" title={`Helmfile Diff: ${selectedService.name}`} width="80%" height="80%">
      <CommandOutput
        command="helmfile"
        args={["--color", "diff"]}
        cwd={selectedService.path}
        loadingText="Generating diff..."
        emptyText="No changes found"
      />
    </Modal>
  );
};
