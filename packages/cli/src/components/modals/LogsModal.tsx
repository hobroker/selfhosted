import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { useServicesContext } from "../../contexts/ServicesContext";

export const LogsModal = () => {
  const { selectedService } = useServicesContext();

  if (!selectedService) {
    return (
      <Modal id="logs" title="Logs" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal id="logs" title={`Logs: ${selectedService.name}`} width="80%" height="80%">
      <CommandOutput
        command="kubectl"
        args={[
          "stern",
          "--color",
          "always",
          "--namespace",
          selectedService.namespace,
          selectedService.name,
        ]}
        loadingText="Waiting for logs..."
        emptyText="No logs found"
      />
    </Modal>
  );
};
