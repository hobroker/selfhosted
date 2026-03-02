import { execa } from "execa";

export async function isToolAvailable(tool: string): Promise<boolean> {
  try {
    await execa("which", [tool]);
    return true;
  } catch {
    return false;
  }
}
