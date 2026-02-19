import { readdir, stat } from "fs/promises";
import { dirname, resolve } from "path";
import { ChartSource } from "./types.js";

const getFiles = async (dir: string): Promise<string[]> => {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }),
  );
  return files.reduce<string[]>((acc, item) => acc.concat(item), []);
};

export const getCharts = async (dir: string): Promise<ChartSource[]> => {
  const files = await getFiles(dir).then((files) =>
    files.filter((file) => file.endsWith("README.md")),
  );
  const map: Record<string, Record<string, { path: string }>> = {};

  files.forEach((file) => {
    const subpath = file.split("/charts/")[1];
    const [category, service] = subpath.split("/");

    if (!map[category]) {
      map[category] = {};
    }
    map[category][service] = {
      path: dirname(file),
    };
  });

  return Object.keys(map)
    .map((category) => {
      return {
        category,
        services: Object.keys(map[category])
          .map((service) => ({
            service,
            path: map[category][service].path,
          }))
          .sort((a, b) => a.service.localeCompare(b.service)),
      };
    })
    .sort((a, b) => a.category.localeCompare(b.category));
};
