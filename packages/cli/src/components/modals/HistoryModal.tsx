import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import type { ServiceInfo } from "../../types";
import { CommandOutput } from "../ui/CommandOutput";

interface Props {
  service: ServiceInfo | null | undefined;
}

export const HistoryModal = ({ service }: Props) => {
  if (!service) {
    return (
      <Modal id="history" title="Helm History" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal id="history" title={`Helm History: ${service.name}`} width="80%" height="80%">
      <CommandOutput
        command="helm"
        args={["history", service.name, "-n", "self"]}
        loadingText="Fetching history..."
        emptyText="No history found"
      />
    </Modal>
  );
};
