import { Box, Text } from "ink";
import { ConfirmModal } from "../ui/ConfirmModal";
import { colors } from "../../constants";
import { useFocusManagerContext } from "../../contexts/FocusManagerContext";
import { useServicesContext } from "../../contexts/ServicesContext";

export const SyncConfirmModal = () => {
  const { selectedService } = useServicesContext();
  const { setFocus, closeModals } = useFocusManagerContext();

  if (!selectedService) return null;

  return (
    <ConfirmModal
      id="sync-confirm"
      title="Confirm Sync"
      message={
        <Box flexDirection="column" alignItems="center">
          <Box>
            <Text>Are you sure you want to sync </Text>
            <Text color={colors.primary} bold>
              {selectedService.name}
            </Text>
            <Text>?</Text>
          </Box>

          <Box marginTop={1} paddingX={1} borderStyle="round" borderColor={colors.dim}>
            <Text color={colors.muted}>Command: </Text>
            <Text color={colors.text} bold>
              argocd app sync {selectedService.name}
            </Text>
          </Box>
        </Box>
      }
      onConfirm={() => setFocus("sync")}
      onCancel={closeModals}
    />
  );
};
