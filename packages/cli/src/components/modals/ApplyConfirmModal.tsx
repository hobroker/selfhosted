import { Box, Text } from "ink";
import { ConfirmModal } from "../ui/ConfirmModal";
import { colors } from "../../constants";
import type { ServiceInfo } from "../../types";
import { useFocusManagerContext } from "../../contexts/FocusManagerContext";

interface Props {
  service: ServiceInfo | null | undefined;
}

export const ApplyConfirmModal = ({ service }: Props) => {
  const { setFocus, closeModals } = useFocusManagerContext();
  if (!service) return null;

  return (
    <ConfirmModal
      id="apply-confirm"
      title="Confirm Apply"
      message={
        <Box flexDirection="column" alignItems="center">
          <Box>
            <Text>Are you sure you want to apply changes to </Text>
            <Text color={colors.primary} bold>
              {service.name}
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
