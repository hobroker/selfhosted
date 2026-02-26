import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { useServicesContext } from "../../contexts/ServicesContext";

export const HistoryModal = () => {
  const { selectedService } = useServicesContext();

  if (!selectedService) {
    return (
      <Modal id="history" title="Helm History" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal id="history" title={`Helm History: ${selectedService.name}`} width="80%" height="80%">
      <CommandOutput
        command="helm"
        args={["history", selectedService.name, "-n", selectedService.namespace]}
        loadingText="Fetching history..."
        emptyText="No history found"
      />
    </Modal>
  );
};
