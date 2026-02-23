import { useEffect, useState } from "react";
import { Box, Text } from "ink";
import { execa } from "execa";
import { colors } from "../constants";

interface Props {
  command: string;
  args: string[];
  loadingText?: string;
  emptyText?: string;
}

export const CommandOutput = ({
  command,
  args,
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
        const { stdout } = await execa(command, args);
        // Replace tabs with spaces and trim each line
        const sanitizedOutput = stdout
          .replace(/\t/g, "    ")
          .split("\n")
          .map((line) => line.trimEnd())
          .join("\n")
          .trim();
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
  }, [args, command]);

  if (loading) {
    return <Text color={colors.warning}>{loadingText}</Text>;
  }

  if (error) {
    return <Text color={colors.error}>{error}</Text>;
  }

  const lines = output.split("\n").map((line) => line.trimEnd());

  if (lines.length === 0 || (lines.length === 1 && lines[0] === "")) {
    return <Text color={colors.dim}>{emptyText}</Text>;
  }

  return (
    <Box flexDirection="column">
      {lines.map((line, index) => (
        <Text key={index} color={colors.text} wrap="truncate-end">
          {line}
        </Text>
      ))}
    </Box>
  );
};
