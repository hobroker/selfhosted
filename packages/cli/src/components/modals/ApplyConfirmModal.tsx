import { Box, Text } from "ink";
import { ConfirmModal } from "./ConfirmModal";
import { colors } from "../../constants";
import type { ServiceInfo } from "../../types";

interface Props {
  service: ServiceInfo | null | undefined;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ApplyConfirmModal = ({ service, onConfirm, onCancel }: Props) => {
  if (!service) return null;

  return (
    <ConfirmModal
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
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};
