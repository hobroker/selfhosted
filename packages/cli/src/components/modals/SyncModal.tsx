import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors, commandStateLabelsMap } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { useServicesContext } from "../../contexts/ServicesContext";
import { useCommandHooks } from "../../hooks/useCommandHooks";

export const SyncModal = () => {
  const { selectedService, refreshService } = useServicesContext();
  const { commandState, ...commandHooks } = useCommandHooks({
    onSuccess: () => {
      if (!selectedService) return;
      return refreshService(selectedService.name);
    },
  });

  if (!selectedService) {
    return (
      <Modal id="sync" title="ArgoCD Sync" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal
      id="sync"
      title={`ArgoCD Sync: ${selectedService.name}`}
      width="80%"
      height="80%"
      rightAdornment={commandStateLabelsMap[commandState].icon}
    >
      <CommandOutput
        command="argocd"
        args={["app", "sync", selectedService.name]}
        loadingText="Syncing..."
        emptyText="No output from sync"
        {...commandHooks}
      />
    </Modal>
  );
};
