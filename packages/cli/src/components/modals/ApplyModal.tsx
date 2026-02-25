import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { useServicesContext } from "../../contexts/ServicesContext";

export const ApplyModal = () => {
  const { selectedService } = useServicesContext();

  if (!selectedService) {
    return (
      <Modal id="apply" title="Helmfile Apply" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal id="apply" title={`Helmfile Apply: ${selectedService.name}`} width="95%" height={30}>
      <CommandOutput
        command="helmfile"
        args={["--color", "apply"]}
        cwd={selectedService.path}
        loadingText="Applying changes..."
        emptyText="No output from apply"
      />
    </Modal>
  );
};
