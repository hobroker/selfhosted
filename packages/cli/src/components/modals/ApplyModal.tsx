import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors, commandStateLabelsMap } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { useServicesContext } from "../../contexts/ServicesContext";
import { useCommandHooks } from "../../hooks/useCommandHooks";

export const ApplyModal = () => {
  const { selectedService, refreshService } = useServicesContext();
  const { commandState, ...commandHooks } = useCommandHooks({
    onSuccess: () => {
      if (!selectedService) return;
      return refreshService(selectedService.name);
    },
  });

  if (!selectedService) {
    return (
      <Modal id="apply" title="Helmfile Apply" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal
      id="apply"
      title={`Helmfile Apply: ${selectedService.name}`}
      width="80%"
      height="80%"
      rightAdornment={commandStateLabelsMap[commandState].icon}
    >
      <CommandOutput
        command="helmfile"
        args={["--color", "apply"]}
        cwd={selectedService.path}
        loadingText="Applying changes..."
        emptyText="No output from apply"
        {...commandHooks}
      />
    </Modal>
  );
};
