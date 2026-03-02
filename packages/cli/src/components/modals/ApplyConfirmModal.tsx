import { Box, Text } from "ink";
import { ConfirmModal } from "../ui/ConfirmModal";
import { Modal } from "../ui/Modal";
import { ToolUnavailableMessage } from "../ui/ToolUnavailableMessage";
import { colors } from "../../constants";
import { useFocusManagerContext } from "../../contexts/FocusManagerContext";
import { useServicesContext } from "../../contexts/ServicesContext";
import { useToolsContext } from "../../contexts/ToolsContext";

export const ApplyConfirmModal = () => {
  const { selectedService } = useServicesContext();
  const { isAvailable } = useToolsContext();
  const { setFocus, closeModals } = useFocusManagerContext();

  if (!selectedService) return null;

  if (!isAvailable("helmfile")) {
    return (
      <Modal id="apply-confirm" title="Confirm Apply" width="40%" minWidth={70}>
        <ToolUnavailableMessage tool="helmfile" />
      </Modal>
    );
  }

  return (
    <ConfirmModal
      id="apply-confirm"
      title="Confirm Apply"
      message={
        <Box flexDirection="column" alignItems="center">
          <Box>
            <Text>Are you sure you want to apply changes to </Text>
            <Text color={colors.primary} bold>
              {selectedService.name}
            </Text>
            <Text>?</Text>
          </Box>

          <Box marginTop={1} paddingX={1} borderStyle="round" borderColor={colors.dim}>
            <Text color={colors.muted}>Command: </Text>
            <Text color={colors.text} bold>
              helmfile apply
            </Text>
          </Box>
        </Box>
      }
      onConfirm={() => setFocus("apply")}
      onCancel={closeModals}
    />
  );
};
