import { execa } from "execa";

export async function isToolAvailable(tool: string): Promise<boolean> {
  try {
    await execa("which", [tool]);
    return true;
  } catch {
    return false;
  }
}

export async function findAvailableTool(tools: string[]): Promise<string | null> {
  for (const tool of tools) {
    if (await isToolAvailable(tool)) return tool;
  }
  return null;
}
