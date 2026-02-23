import React from "react";
import { Box, Text, useInput } from "ink";
import { Modal } from "./Modal";
import { colors } from "../constants";

interface Props {
  title: string;
  message: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Enter",
  cancelLabel = "Esc",
}: Props) => {
  useInput((input, key) => {
    if (key.return) {
      onConfirm();
    }
    if (key.escape || input === "n" || input === "N") {
      onCancel();
    }
  });

  return (
    <Modal title={title} width={60}>
      <Box flexDirection="column" alignItems="center">
        <Box marginBottom={1}>{message}</Box>

        <Box marginTop={1}>
          <Text color={colors.dim}>Press </Text>
          <Text color={colors.primary} bold>
            {confirmLabel}
          </Text>
          <Text color={colors.dim}> to confirm or </Text>
          <Text color={colors.error} bold>
            {cancelLabel}
          </Text>
          <Text color={colors.dim}> to cancel</Text>
        </Box>
      </Box>
    </Modal>
  );
};
