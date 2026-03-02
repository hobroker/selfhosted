import { Box, Text } from "ink";
import { ConfirmModal } from "../ui/ConfirmModal";
import { Modal } from "../ui/Modal";
import { ToolUnavailableMessage } from "../ui/ToolUnavailableMessage";
import { colors } from "../../constants";
import { useFocusManagerContext } from "../../contexts/FocusManagerContext";
import { useServicesContext } from "../../contexts/ServicesContext";
import { useToolsContext } from "../../contexts/ToolsContext";

export const DestroyConfirmModal = () => {
  const { selectedService } = useServicesContext();
  const { isAvailable } = useToolsContext();
  const { setFocus, closeModals } = useFocusManagerContext();

  if (!selectedService) return null;

  if (!isAvailable("helmfile")) {
    return (
      <Modal id="destroy-confirm" title="Confirm Destroy" width="40%" minWidth={70}>
        <ToolUnavailableMessage tool="helmfile" />
      </Modal>
    );
  }

  return (
    <ConfirmModal
      id="destroy-confirm"
      title="Confirm Destroy"
      message={
        <Box flexDirection="column" alignItems="center">
          <Box>
            <Text>Are you sure you want to destroy </Text>
            <Text color={colors.error} bold>
              {selectedService.name}
            </Text>
            <Text>?</Text>
          </Box>

          <Box marginTop={1} paddingX={1} borderStyle="round" borderColor={colors.dim}>
            <Text color={colors.muted}>Command: </Text>
            <Text color={colors.text} bold>
              helmfile destroy
            </Text>
          </Box>
        </Box>
      }
      onConfirm={() => setFocus("destroy")}
      onCancel={closeModals}
    />
  );
};
