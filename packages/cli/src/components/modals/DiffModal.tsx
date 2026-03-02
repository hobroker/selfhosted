import { Text } from "ink";
import { Modal } from "../ui/Modal";
import { colors } from "../../constants";
import { CommandOutput } from "../ui/CommandOutput";
import { ToolUnavailableMessage } from "../ui/ToolUnavailableMessage";
import { useServicesContext } from "../../contexts/ServicesContext";
import { useToolsContext } from "../../contexts/ToolsContext";
import { useCommandHooks } from "../../hooks/useCommandHooks";
import { CommandStateBadge } from "../ui/CommandStateBadge";

export const DiffModal = () => {
  const { selectedService } = useServicesContext();
  const { isAvailable } = useToolsContext();
  const { commandState, ...commandHooks } = useCommandHooks();

  if (!selectedService) {
    return (
      <Modal id="diff" title="Helmfile Diff" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  if (!isAvailable("helmfile")) {
    return (
      <Modal id="diff" title={`Helmfile Diff: ${selectedService.name}`} width="40%" minWidth={70}>
        <ToolUnavailableMessage tool="helmfile" />
      </Modal>
    );
  }

  return (
    <Modal
      id="diff"
      title={`Helmfile Diff: ${selectedService.name}`}
      width="80%"
      height="80%"
      rightAdornment={<CommandStateBadge state={commandState} />}
    >
      <CommandOutput
        command="helmfile"
        args={["--color", "diff"]}
        cwd={selectedService.path}
        loadingText="Generating diff..."
        emptyText="No changes found"
        {...commandHooks}
      />
    </Modal>
  );
};
