import { execa } from "execa";
import type { HelmRelease } from "../types";

export async function fetchHelmReleases(): Promise<HelmRelease[]> {
  try {
    const { stdout } = await execa("helm", ["list", "-A", "--output", "json"]);
    return JSON.parse(stdout) as HelmRelease[];
  } catch (e) {
    console.error("Failed to fetch helm data", e);
    return [];
  }
}

export async function fetchHelmRelease(name: string): Promise<HelmRelease | undefined> {
  try {
    const { stdout } = await execa("helm", ["list", "-A", "--filter", `^${name}$`, "--output", "json"]);
    const releases = JSON.parse(stdout) as HelmRelease[];
    return releases[0];
  } catch (e) {
    console.error(`Failed to fetch helm release "${name}"`, e);
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
      'jsonpath={.items[0].spec.containers[0].image}',
    ]);
    if (!stdout) return undefined;
    return stdout.split(":").pop() || undefined;
  } catch (e) {
    console.error(`Failed to fetch pod image for "${name}"`, e);
    return undefined;
  }
}
