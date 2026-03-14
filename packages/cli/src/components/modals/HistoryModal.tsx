import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { useServicesContext } from "../../contexts/ServicesContext";

export const HistoryModal = () => {
  const { selectedService } = useServicesContext();

  if (!selectedService) {
    return (
      <Modal id="history" title="ArgoCD History" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal id="history" title={`ArgoCD History: ${selectedService.name}`} width="80%" height="80%">
      <CommandOutput
        command="argocd"
        args={["app", "history", selectedService.name]}
        loadingText="Fetching history..."
        emptyText="No history found"
      />
    </Modal>
  );
};
