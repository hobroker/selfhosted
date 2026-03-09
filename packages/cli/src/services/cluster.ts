import { execa } from "execa";
import type { ArgoApp } from "../types";

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
        syncStatus: (sync?.status as string) || "Unknown",
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
      syncStatus: (sync?.status as string) || "Unknown",
      healthStatus: (health?.status as string) || "Unknown",
    };
  } catch (e) {
    console.error(`Failed to fetch ArgoCD app "${name}"`, e);
    return undefined;
  }
}

export async function fetchPodImages(): Promise<Record<string, string>> {
  try {
    const { stdout } = await execa("kubectl", [
      "get",
      "pods",
      "-A",
      "-o",
      'jsonpath={range .items[*]}{.metadata.labels.app\\.kubernetes\\.io/instance}{" "}{.spec.containers[0].image}{"\\n"}{end}',
    ]);

    return stdout.split("\n").reduce(
      (acc, line) => {
        const [instance, image] = line.split(" ");
        if (instance && image) {
          const tag = image.split(":").pop() || "unknown";
          acc[instance] = tag;
        }
        return acc;
      },
      {} as Record<string, string>,
    );
  } catch (e) {
    console.error("Failed to fetch pod images", e);
    return {};
  }
}

export async function fetchPodImage(name: string): Promise<string | undefined> {
  try {
    const { stdout } = await execa("kubectl", [
      "get",
      "pods",
      "-A",
      "-l",
      `app.kubernetes.io/instance=${name}`,
      "-o",
      "jsonpath={.items[0].spec.containers[0].image}",
    ]);
    if (!stdout) return undefined;
    return stdout.split(":").pop() || undefined;
  } catch (e) {
    console.error(`Failed to fetch pod image for "${name}"`, e);
    return undefined;
  }
}
