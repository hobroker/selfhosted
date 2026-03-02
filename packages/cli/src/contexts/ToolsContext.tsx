import { createContext, useContext, useEffect, useState } from "react";
import { findAvailableTool } from "../services/tools";

export const REQUIRED_TOOLS: Record<string, Tool> = {
  helm: {
    description: "Helm is used for managing Kubernetes applications",
  },
  kubectl: {
    description: "Kubectl is used for interacting with Kubernetes clusters",
  },
} as const;

export const OPTIONAL_TOOLS: Record<string, Tool> = {
  helmfile: {
    description: "Helmfile is used for managing Helm charts",
  },
  stern: {
    description: "Stern is used for log streaming (Logs modal)",
  },
} as const;

const TOOL_ALIASES: Record<ToolKey, string[]> = {
  stern: ["stern", "kubectl-stern"],
};

interface Tool {
  description: string;
}

type ToolKey = keyof typeof REQUIRED_TOOLS | keyof typeof OPTIONAL_TOOLS;

const checkTools = (
  tools: Record<ToolKey, Tool>,
): Promise<{ tool: ToolKey; found: string | null }[]> =>
  Promise.all(
    Object.keys(tools).map(async (tool) => ({
      tool,
      found: await findAvailableTool(TOOL_ALIASES[tool] ?? [tool]),
    })),
  );

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
        checkTools(REQUIRED_TOOLS),
        checkTools(OPTIONAL_TOOLS),
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
