import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import type { ServiceInfo } from "../../types";
import { CommandOutput } from "../ui/CommandOutput";

interface Props {
  service: ServiceInfo | null | undefined;
}

export const ApplyModal = ({ service }: Props) => {
  if (!service) {
    return (
      <Modal title="Helmfile Apply" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  return (
    <Modal title={`Helmfile Apply: ${service.name}`} width="95%" height={30}>
      <CommandOutput
        command="helmfile"
        args={["--color", "apply"]}
        cwd={service.path}
        loadingText="Applying changes..."
        emptyText="No output from apply"
      />
    </Modal>
  );
};
