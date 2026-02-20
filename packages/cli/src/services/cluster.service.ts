import { execa } from "execa";
import type { HelmRelease } from "../types.d.ts";

export async function fetchHelmReleases(): Promise<HelmRelease[]> {
  try {
    const { stdout } = await execa("helm", ["list", "-A", "--output", "json"]);
    return JSON.parse(stdout) as HelmRelease[];
  } catch (e) {
    console.error("Failed to fetch helm data", e);
    return [];
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
