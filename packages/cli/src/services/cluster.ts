import { execa } from "execa";
import type { ArgoApp } from "../types";
import { ArgoSyncStatus } from "../constants";

export async function fetchArgoApps(): Promise<ArgoApp[]> {
  try {
    const { stdout } = await execa("argocd", ["app", "list", "-o", "json"]);
    const items = JSON.parse(stdout) as Array<Record<string, unknown>>;
    return items.map((item) => {
      const metadata = item.metadata as Record<string, unknown>;
      const status = item.status as Record<string, unknown>;
      const sync = status?.sync as Record<string, unknown>;
      const health = status?.health as Record<string, unknown>;
      return {
        name: metadata?.name as string,
        syncStatus: (sync?.status as ArgoSyncStatus) || ArgoSyncStatus.Unknown,
        healthStatus: (health?.status as string) || "Unknown",
      };
    });
  } catch (e) {
    console.error("Failed to fetch ArgoCD apps", e);
    return [];
  }
}

export async function fetchArgoApp(name: string): Promise<ArgoApp | undefined> {
  try {
    const { stdout } = await execa("argocd", ["app", "get", name, "-o", "json"]);
    const item = JSON.parse(stdout) as Record<string, unknown>;
    const metadata = item.metadata as Record<string, unknown>;
    const status = item.status as Record<string, unknown>;
    const sync = status?.sync as Record<string, unknown>;
    const health = status?.health as Record<string, unknown>;
    return {
      name: metadata?.name as string,
      syncStatus: (sync?.status as ArgoSyncStatus) || ArgoSyncStatus.Unknown,
      healthStatus: (health?.status as string) || "Unknown",
    };
  } catch (e) {
    console.error(`Failed to fetch ArgoCD app "${name}"`, e);
    return undefined;
  }
}
