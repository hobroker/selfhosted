import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import type { ServiceInfo } from "../../types";
import { CommandOutput } from "../ui/CommandOutput";

interface Props {
  service: ServiceInfo | null | undefined;
}

export const DiffModal = ({ service }: Props) => {
  if (!service) {
    return (
      <Modal title="Helmfile Diff" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal title={`Helmfile Diff: ${service.name}`} width="80%" height="80%">
      <CommandOutput
        command="helmfile"
        args={["--color", "diff"]}
        cwd={service.path}
        loadingText="Generating diff..."
        emptyText="No changes found"
      />
    </Modal>
  );
};
