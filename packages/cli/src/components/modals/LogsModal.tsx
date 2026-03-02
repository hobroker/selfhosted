import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { ToolUnavailableMessage } from "../ui/ToolUnavailableMessage";
import { useServicesContext } from "../../contexts/ServicesContext";
import { useToolsContext } from "../../contexts/ToolsContext";

export const LogsModal = () => {
  const { selectedService } = useServicesContext();
  const { isAvailable, getCommand } = useToolsContext();

  if (!selectedService) {
    return (
      <Modal id="logs" title="Logs" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  if (!isAvailable("stern")) {
    return (
      <Modal id="logs" title={`Logs: ${selectedService.name}`} width="40%" minWidth={70}>
        <ToolUnavailableMessage tool="stern" />
      </Modal>
    );
  }

  return (
    <Modal id="logs" title={`Logs: ${selectedService.name}`} width="80%" height="80%">
      <CommandOutput
        command={getCommand("stern")!}
        args={["--color", "always", "--namespace", selectedService.namespace, selectedService.name]}
        loadingText="Waiting for logs..."
        emptyText="No logs found"
      />
    </Modal>
  );
};
