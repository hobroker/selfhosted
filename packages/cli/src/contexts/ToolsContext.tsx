import { createContext, useContext, useEffect, useState } from "react";
import { isToolAvailable } from "../services/tools";

const REQUIRED_TOOLS: Record<string, string> = {
  helm: "helm list, helm history",
  kubectl: "kubectl get pods",
};

const OPTIONAL_TOOLS: Record<string, string> = {
  helmfile: "apply/diff/destroy actions",
  stern: "log streaming (Logs modal)",
};

interface ToolsState {
  ready: boolean;
  missing: string[];
  unavailable: string[];
  isAvailable: (tool: string) => boolean;
}

type ToolCheckResult = {
  tool: string;
  available: boolean;
};

const extractUnavailableTools = (results: ToolCheckResult[]) =>
  results.filter((result) => !result.available).map((result) => result.tool);

const checkToolsAvailability = async (tools: Record<string, string>): Promise<ToolCheckResult[]> =>
  Promise.all(
    Object.keys(tools).map(async (tool) => ({
      tool,
      available: await isToolAvailable(tool),
    })),
  );

const ToolsContext = createContext<ToolsState | undefined>(undefined);

export const ToolsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);
  const [unavailable, setUnavailable] = useState<string[]>([]);

  useEffect(() => {
    const check = async () => {
      const [requiredResults, optionalResults] = await Promise.all([
        checkToolsAvailability(REQUIRED_TOOLS),
        checkToolsAvailability(OPTIONAL_TOOLS),
      ]);

      setMissing(extractUnavailableTools(requiredResults));
      setUnavailable(extractUnavailableTools(optionalResults));
      setReady(true);
    };

    check();
  }, []);

  const isAvailable = (tool: string) => !missing.includes(tool) && !unavailable.includes(tool);

  return (
    <ToolsContext.Provider value={{ ready, missing, unavailable, isAvailable }}>
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
