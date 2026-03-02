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

const ToolsContext = createContext<ToolsState | undefined>(undefined);

export const ToolsProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [missing, setMissing] = useState<string[]>([]);
  const [unavailable, setUnavailable] = useState<string[]>([]);

  useEffect(() => {
    const check = async () => {
      const [requiredResults, optionalResults] = await Promise.all([
        Promise.all(
          Object.keys(REQUIRED_TOOLS).map(async (tool) => ({
            tool,
            available: await isToolAvailable(tool),
          })),
        ),
        Promise.all(
          Object.keys(OPTIONAL_TOOLS).map(async (tool) => ({
            tool,
            available: await isToolAvailable(tool),
          })),
        ),
      ]);

      setMissing(requiredResults.filter((r) => !r.available).map((r) => r.tool));
      setUnavailable(optionalResults.filter((r) => !r.available).map((r) => r.tool));
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
