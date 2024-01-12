import { readdir, stat } from "fs/promises";
import { resolve, dirname } from "path";

const getFiles = async (dir, map = {}) => {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }),
  );
  return files.reduce((a, f) => a.concat(f), []);
};

export const getCharts = async () => {
  const files = await getFiles("charts").then((files) =>
    files.filter((file) => file.endsWith("README.md")),
  );
  const map = {};

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

  const list = Object.keys(map)
    .map((category) => {
      return {
        category,
        services: Object.keys(map[category])
          .map((service) => {
            return {
              service,
              path: map[category][service].path,
            };
          })
          .sort((a, b) => a.service.localeCompare(b.service)),
      };
    })
    .sort((a, b) => a.category.localeCompare(b.category));

  return list;
};
