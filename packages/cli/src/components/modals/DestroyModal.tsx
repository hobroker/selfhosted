import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors, commandStateLabelsMap } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { useServicesContext } from "../../contexts/ServicesContext";
import { useCommandHooks } from "../../hooks/useCommandHooks";

export const DestroyModal = () => {
  const { selectedService, refreshService } = useServicesContext();
  const { commandState, ...commandHooks } = useCommandHooks({
    onSuccess: () => {
      if (!selectedService) return;
      return refreshService(selectedService.name);
    },
  });

  if (!selectedService) {
    return (
      <Modal id="destroy" title="Helmfile Destroy" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal
      id="destroy"
      title={`Helmfile Destroy: ${selectedService.name}`}
      width="80%"
      height="80%"
      rightAdornment={commandStateLabelsMap[commandState].icon}
    >
      <CommandOutput
        command="helmfile"
        args={["--color", "destroy"]}
        cwd={selectedService.path}
        loadingText="Destroying service..."
        emptyText="No output from destroy"
        {...commandHooks}
      />
    </Modal>
  );
};
