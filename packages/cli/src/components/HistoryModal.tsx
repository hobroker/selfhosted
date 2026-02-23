import { Text } from "ink";
import { Modal } from "./Modal";
import { colors } from "../constants";
import type { ServiceInfo } from "../types";
import { CommandOutput } from "./CommandOutput";

interface Props {
  service: ServiceInfo | null | undefined;
}

export const HistoryModal = ({ service }: Props) => {
  if (!service) {
    return (
      <Modal title="Helm History" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal title={`Helm History: ${service.name}`} width="80%" height={25}>
      <CommandOutput
        command="helm"
        args={["history", service.name, "-n", "self"]}
        loadingText="Fetching history..."
        emptyText="No history found"
      />
    </Modal>
  );
};
