import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { parseStorageMounts } from "./parse-storage";

const PV_YAML = `
apiVersion: v1
kind: PersistentVolume
metadata:
  name: myapp-config-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /var/local/myapp
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myapp-config-pvc
spec:
  volumeName: myapp-config-pv
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: myapp-nebula-pv
spec:
  capacity:
    storage: 100Ti
  accessModes:
    - ReadWriteMany
  nfs:
    server: 192.168.50.7
    path: /mnt/nebula
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: myapp-nebula-pvc
spec:
  volumeName: myapp-nebula-pv
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Ti
`;

const VALUES_YAML = `
persistence:
  config:
    existingClaim: myapp-config-pvc
    globalMounts:
      - path: /config
  nebula:
    existingClaim: myapp-nebula-pvc
    globalMounts:
      - path: /mnt/nebula
  tmp:
    type: emptyDir
    globalMounts:
      - path: /tmp
`;

let appDir: string;

beforeEach(async () => {
  appDir = await mkdtemp(join(tmpdir(), "parse-storage-test-"));
  await mkdir(join(appDir, "config"));
});

afterEach(async () => {
  await rm(appDir, { recursive: true });
});

describe("parseStorageMounts", () => {
  it("returns mounts with hostPath and NFS sources", async () => {
    await writeFile(join(appDir, "config", "pv.yaml"), PV_YAML);
    await writeFile(join(appDir, "values.yaml"), VALUES_YAML);

    const mounts = await parseStorageMounts(appDir);
    expect(mounts).toHaveLength(2);

    const config = mounts.find((m) => m.name === "config")!;
    expect(config.source).toBe("/var/local/myapp");
    expect(config.containerPaths).toEqual(["/config"]);
    expect(config.size).toBe("1Gi");

    const nebula = mounts.find((m) => m.name === "nebula")!;
    expect(nebula.source).toBe("192.168.50.7:/mnt/nebula");
    expect(nebula.containerPaths).toEqual(["/mnt/nebula"]);
    expect(nebula.size).toBe("100Ti");
  });

  it("skips emptyDir entries", async () => {
    await writeFile(join(appDir, "config", "pv.yaml"), PV_YAML);
    await writeFile(join(appDir, "values.yaml"), VALUES_YAML);

    const mounts = await parseStorageMounts(appDir);
    expect(mounts.find((m) => m.name === "tmp")).toBeUndefined();
  });

  it("returns empty array when config/pv.yaml is absent", async () => {
    await writeFile(join(appDir, "values.yaml"), VALUES_YAML);
    const mounts = await parseStorageMounts(appDir);
    expect(mounts).toEqual([]);
  });

  it("returns empty array when values.yaml has no persistence section", async () => {
    await writeFile(join(appDir, "config", "pv.yaml"), PV_YAML);
    await writeFile(join(appDir, "values.yaml"), "image:\n  tag: latest\n");
    const mounts = await parseStorageMounts(appDir);
    expect(mounts).toEqual([]);
  });

  it("handles advancedMounts fallback", async () => {
    await writeFile(join(appDir, "config", "pv.yaml"), PV_YAML);
    await writeFile(
      join(appDir, "values.yaml"),
      `persistence:
  config:
    existingClaim: myapp-config-pvc
    advancedMounts:
      main:
        main:
          - path: /config
`,
    );
    const mounts = await parseStorageMounts(appDir);
    expect(mounts[0]?.containerPaths).toEqual(["/config"]);
  });

  it("skips entries without existingClaim", async () => {
    await writeFile(join(appDir, "config", "pv.yaml"), PV_YAML);
    await writeFile(
      join(appDir, "values.yaml"),
      `persistence:
  data:
    storageClassName: ""
    globalMounts:
      - path: /data
`,
    );
    const mounts = await parseStorageMounts(appDir);
    expect(mounts).toEqual([]);
  });
});
