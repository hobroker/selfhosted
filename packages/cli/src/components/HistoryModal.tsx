import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
import { execa } from "execa";
import { Modal } from "./Modal";
import { colors } from "../constants";
import type { ServiceInfo } from "../types";

interface Props {
  service: ServiceInfo | null | undefined;
}

export const HistoryModal = ({ service }: Props) => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      const fetchHistory = async () => {
        setLoading(true);
        setError(null);
        setOutput("");
        try {
          const { stdout } = await execa("helm", ["history", service.name, "-n", "self"]);
          // Replace tabs with spaces (Helm uses tabs for alignment)
          const sanitizedOutput = stdout
            .replace(/\t/g, "    ")
            .split("\n")
            .map((line) => line.trimEnd())
            .join("\n")
            .trim();
          setOutput(sanitizedOutput);
        } catch (e: any) {
          setError(e.message || "Failed to fetch history");
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    }
  }, [service]);

  if (!service) {
    return (
      <Modal title="Helm History" width="40%" minWidth={70}>
        <Text color={colors.error}>No service selected</Text>
      </Modal>
    );
  }

  // Split into lines and filter empty to ensure no raw text escapes the components
  const lines = output.split("\n").map((line) => line.trimEnd());

  return (
    <Modal title={`Helm History: ${service.name}`} width="80%" height={25}>
      {loading ? (
        <Text color={colors.warning}>Fetching history...</Text>
      ) : error ? (
        <Text color={colors.error}>{error}</Text>
      ) : (
        <Box flexDirection="column">
          {lines.map((line, index) => (
            <Text key={index} color={colors.text}>
              {line}
            </Text>
          ))}
          {lines.length === 0 && !loading && <Text color={colors.dim}>No history found</Text>}
        </Box>
      )}
    </Modal>
  );
};
