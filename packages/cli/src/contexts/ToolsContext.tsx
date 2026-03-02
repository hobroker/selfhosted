import { createContext, useContext, useEffect, useState } from "react";
import { isToolAvailable, findAvailableTool } from "../services/tools";

const REQUIRED_TOOLS = {
  helm: "helm list, helm history",
  kubectl: "kubectl get pods",
} as const;

const OPTIONAL_TOOLS = {
  helmfile: "apply/diff/destroy actions",
  stern: "log streaming (Logs modal)",
} as const;

const TOOL_ALIASES: Record<string, string[]> = {
  stern: ["stern", "kubectl-stern"],
};

type ToolKey = keyof typeof REQUIRED_TOOLS | keyof typeof OPTIONAL_TOOLS;

interface ToolsState {
  ready: boolean;
  missing: ToolKey[];
  unavailable: ToolKey[];
  isAvailable: (tool: ToolKey) => boolean;
  getCommand: (tool: ToolKey) => string | null;
}

const ToolsContext = createContext<ToolsState | undefined>(undefined);

export const ToolsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState<ToolKey[]>([]);
  const [unavailable, setUnavailable] = useState<ToolKey[]>([]);
  const [resolvedCommands, setResolvedCommands] = useState<Partial<Record<ToolKey, string>>>({});

  useEffect(() => {
    const check = async () => {
      const [requiredResults, optionalResults] = await Promise.all([
        Promise.all(
          Object.keys(REQUIRED_TOOLS).map(async (tool) => ({
            tool: tool as ToolKey,
            found: (await isToolAvailable(tool)) ? tool : null,
          })),
        ),
        Promise.all(
          Object.keys(OPTIONAL_TOOLS).map(async (tool) => ({
            tool: tool as ToolKey,
            found: await findAvailableTool(TOOL_ALIASES[tool] ?? [tool]),
          })),
        ),
      ]);

      setMissing(requiredResults.filter((r) => !r.found).map((r) => r.tool));
      setUnavailable(optionalResults.filter((r) => !r.found).map((r) => r.tool));
      setResolvedCommands(
        Object.fromEntries(
          [...requiredResults, ...optionalResults]
            .filter((r) => r.found)
            .map((r) => [r.tool, r.found!]),
        ),
      );
      setReady(true);
    };

    check();
  }, []);

  const isAvailable = (tool: ToolKey) => !missing.includes(tool) && !unavailable.includes(tool);
  const getCommand = (tool: ToolKey) => resolvedCommands[tool] ?? null;

  return (
    <ToolsContext.Provider value={{ ready, missing, unavailable, isAvailable, getCommand }}>
      {children}
    </ToolsContext.Provider>
  );
};

export const useToolsContext = () => {
  const ctx = useContext(ToolsContext);
  if (!ctx) throw new Error("useToolsContext must be used within ToolsProvider");
  return ctx;
};

export { REQUIRED_TOOLS, OPTIONAL_TOOLS };
