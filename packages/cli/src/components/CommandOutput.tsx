import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
import { execa } from "execa";
import { colors } from "../constants";
import { AnsiText } from "./AnsiText";

interface Props {
  command: string;
  args: string[];
  cwd?: string;
  loadingText?: string;
  emptyText?: string;
}

export const CommandOutput = ({
  command,
  args,
  cwd,
  loadingText = "Running command...",
  emptyText = "No output found",
}: Props) => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runCommand = async () => {
      setLoading(true);
      setError(null);
      setOutput("");
      try {
        const { stdout } = await execa(command, args, {
          cwd,
          env: { ...process.env, FORCE_COLOR: "3" },
        });
        // Replace tabs with spaces but preserve other characters
        const sanitizedOutput = stdout.replace(/\t/g, "    ").trim();
        setOutput(sanitizedOutput);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message || `Failed to run ${command}`);
        } else {
          setError(`Failed to run ${command}`);
        }
      } finally {
        setLoading(false);
      }
    };

    runCommand();
  }, [args, command, cwd]);

  if (loading) {
    return <Text color={colors.warning}>{loadingText}</Text>;
  }

  if (error) {
    return (
      <Box flexDirection="column">
        <Text color={colors.error}>Error executing command:</Text>
        <AnsiText>{error}</AnsiText>
      </Box>
    );
  }

  if (!output) {
    return <Text color={colors.dim}>{emptyText}</Text>;
  }

  // Split into lines to render within Box/Ansi properly
  const lines = output.split("\n").map((line) => line.trimEnd());

  return (
    <Box flexDirection="column">
      {lines.map((line, index) => (
        <Box key={index}>
          <AnsiText>{line}</AnsiText>
        </Box>
      ))}
    </Box>
  );
};
