import { createContext, useContext, useEffect, useState } from "react";
import { findAvailableTool } from "../services/tools";

export type RequiredToolKey = "argocd" | "kubectl";
export type OptionalToolKey = "stern";
type ToolKey = RequiredToolKey | OptionalToolKey;

export const REQUIRED_TOOLS: Record<RequiredToolKey, Tool> = {
  argocd: {
    description: "ArgoCD CLI is used for syncing and managing applications",
  },
  kubectl: {
    description: "Kubectl is used for interacting with Kubernetes clusters",
  },
} as const;

export const OPTIONAL_TOOLS: Record<OptionalToolKey, Tool> = {
  stern: {
    description: "Stern is used for log streaming (Logs modal)",
  },
} as const;

const TOOL_ALIASES: Partial<Record<ToolKey, string[]>> = {
  stern: ["stern", "kubectl-stern"],
};

interface Tool {
  description: string;
}

const checkTools = <T extends ToolKey>(
  tools: Record<T, Tool>,
): Promise<{ tool: T; found: string | null }[]> =>
  Promise.all(
    Object.keys(tools).map(async (tool) => ({
      tool: tool as T,
      found: await findAvailableTool(TOOL_ALIASES[tool as T] ?? [tool]),
    })),
  );

interface ToolsState {
  isReady: boolean;
  missing: RequiredToolKey[];
  unavailable: OptionalToolKey[];
  isAvailable: (tool: ToolKey) => boolean;
  getCommand: (tool: ToolKey) => string | null;
}

const ToolsContext = createContext<ToolsState | undefined>(undefined);

export const ToolsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const [missing, setMissing] = useState<RequiredToolKey[]>([]);
  const [unavailable, setUnavailable] = useState<OptionalToolKey[]>([]);
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
      setIsReady(true);
    };

    check();
  }, []);

  const isAvailable = (tool: ToolKey) =>
    !missing.includes(tool as RequiredToolKey) && !unavailable.includes(tool as OptionalToolKey);
  const getCommand = (tool: ToolKey) => resolvedCommands[tool] ?? null;

  return (
    <ToolsContext.Provider value={{ isReady, missing, unavailable, isAvailable, getCommand }}>
      {children}
    </ToolsContext.Provider>
  );
};

export const useToolsContext = () => {
  const ctx = useContext(ToolsContext);
  if (!ctx) throw new Error("useToolsContext must be used within ToolsProvider");
  return ctx;
};
