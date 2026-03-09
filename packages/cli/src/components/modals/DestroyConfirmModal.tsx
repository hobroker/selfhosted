import { Box, Text } from "ink";
import { ConfirmModal } from "../ui/ConfirmModal";
import { colors } from "../../constants";
import { useFocusManagerContext } from "../../contexts/FocusManagerContext";
import { useServicesContext } from "../../contexts/ServicesContext";

export const DestroyConfirmModal = () => {
  const { selectedService } = useServicesContext();
  const { setFocus, closeModals } = useFocusManagerContext();

  if (!selectedService) return null;

  return (
    <ConfirmModal
      id="destroy-confirm"
      title="Confirm Delete"
      message={
        <Box flexDirection="column" alignItems="center">
          <Box>
            <Text>Are you sure you want to delete </Text>
            <Text color={colors.error} bold>
              {selectedService.name}
            </Text>
            <Text>?</Text>
          </Box>

          <Box marginTop={1} paddingX={1} borderStyle="round" borderColor={colors.dim}>
            <Text color={colors.muted}>Command: </Text>
            <Text color={colors.text} bold>
              argocd app delete {selectedService.name} --yes
            </Text>
          </Box>
        </Box>
      }
      onConfirm={() => setFocus("destroy")}
      onCancel={closeModals}
    />
  );
};
