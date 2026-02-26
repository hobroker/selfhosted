import { useEffect, useRef, useState } from "react";
import { Box, Text } from "ink";
import { execa, Result } from "execa";
import { colors } from "../../constants";
import { AnsiText } from "./AnsiText";

interface Props {
  command: string;
  args: string[];
  cwd?: string;
  loadingText?: string;
  emptyText?: string;
  onSuccess?: (result: Result) => void;
  onError?: (error: Error) => void;
}

export const CommandOutput = ({
  command,
  args,
  cwd,
  loadingText = "Running command...",
  emptyText = "No output found",
  onSuccess,
  onError,
}: Props) => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  useEffect(() => {
    let isMounted = true;
    const runCommand = async () => {
      setLoading(true);
      setError(null);
      setOutput("");

      try {
        const subprocess = execa(command, args, {
          cwd,
          env: { ...process.env, FORCE_COLOR: "3" },
          all: true,
        });

        // Handle real-time streaming of stdout and stderr combined
        if (subprocess.all) {
          subprocess.all.on("data", (data) => {
            if (isMounted) {
              const chunk = data.toString().replace(/\t/g, "    ");
              setOutput((prev) => prev + chunk);
            }
          });
        }

        const result = await subprocess;
        if (isMounted) onSuccessRef.current?.(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (!err.all) {
          setError(err.message || `Failed to run ${command}`);
        }
        // If there was output before the error (common for diffs),
        // we keep it as it's already in the 'output' state via stream
        if (isMounted) onErrorRef.current?.(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    runCommand();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(args), command, cwd]);

  // Even while loading, we want to show the current output from the stream
  if (loading && !output) {
    return <Text color={colors.warning}>{loadingText}</Text>;
  }

  if (error && !output) {
    return (
      <Box flexDirection="column">
        <Text color={colors.error}>Error executing command:</Text>
        <AnsiText>{error}</AnsiText>
      </Box>
    );
  }

  if (!output && !loading) {
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
      {loading && (
        <Box marginTop={1}>
          <Text color={colors.warning}>... {loadingText}</Text>
        </Box>
      )}
    </Box>
  );
};
