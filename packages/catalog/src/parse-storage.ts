import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { load, loadAll } from "js-yaml";
import type { StorageMount } from "./types";

export async function parseStorageMounts(appDir: string): Promise<StorageMount[]> {
  // Parse config/pv.yaml — if absent, app has no hostPath/NFS storage to show
  let pvContent: string;
  try {
    pvContent = await readFile(join(appDir, "config", "pv.yaml"), "utf-8");
  } catch {
    return [];
  }

  const pvMap = new Map<string, { source: string; size: string }>();
  const pvcToPv = new Map<string, string>(); // PVC name → PV name

  for (const doc of loadAll(pvContent)) {
    if (!doc || typeof doc !== "object") continue;
    const d = doc as Record<string, any>;

    if (d["kind"] === "PersistentVolume") {
      const name = d["metadata"]?.name as string | undefined;
      const size = (d["spec"]?.capacity?.storage as string) ?? "";
      let source = "";
      if (d["spec"]?.hostPath?.path) {
        source = d["spec"].hostPath.path as string;
      } else if (d["spec"]?.nfs) {
        source = `${d["spec"].nfs.server}:${d["spec"].nfs.path}`;
      }
      if (name) pvMap.set(name, { source, size });
    } else if (d["kind"] === "PersistentVolumeClaim") {
      const name = d["metadata"]?.name as string | undefined;
      const volumeName = d["spec"]?.volumeName as string | undefined;
      if (name && volumeName) pvcToPv.set(name, volumeName);
    }
  }

  // Parse values.yaml persistence section
  let valuesContent: string;
  try {
    valuesContent = await readFile(join(appDir, "values.yaml"), "utf-8");
  } catch {
    return [];
  }

  const values = load(valuesContent) as Record<string, any> | null;
  const persistence = values?.["persistence"] as Record<string, any> | undefined;
  if (!persistence) return [];

  const mounts: StorageMount[] = [];

  for (const [name, raw] of Object.entries(persistence)) {
    const entry = raw as Record<string, any>;

    // Skip non-PVC types (emptyDir, configMap, etc.)
    const type = entry["type"] as string | undefined;
    if (type && type !== "persistentVolumeClaim") continue;

    // Skip entries without an explicit claim (e.g. storageClass-based)
    const claimName = entry["existingClaim"] as string | undefined;
    if (!claimName) continue;

    const pvName = pvcToPv.get(claimName);
    if (!pvName) continue;

    const pvInfo = pvMap.get(pvName);
    if (!pvInfo) continue;

    // Get container paths — globalMounts first, then advancedMounts.main.main
    const containerPaths: string[] = [];
    const globalMounts = entry["globalMounts"] as Array<{ path: string }> | undefined;
    if (globalMounts) {
      for (const m of globalMounts) if (m.path) containerPaths.push(m.path);
    } else {
      const mainMounts = (entry["advancedMounts"] as any)?.main?.main as
        | Array<{ path: string }>
        | undefined;
      if (mainMounts) for (const m of mainMounts) if (m.path) containerPaths.push(m.path);
    }

    if (containerPaths.length === 0) continue;

    mounts.push({ name, source: pvInfo.source, containerPaths, size: pvInfo.size });
  }

  return mounts;
}
