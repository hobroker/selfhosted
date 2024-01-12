import { getCharts } from "./getCharts.mjs";
import chalk from "chalk";
import { readFileSync } from "fs";
import { join } from "path";
import {
  extractDescription,
  extractName,
  extractReadmeLocation,
} from "./extract.mjs";

export const parseCharts = async (path = "charts") => {
  const charts = await getCharts("charts");

  return charts.map(({ category, services: _services }) => {
    console.log(chalk.green(chalk.bold("Parsing category:"), category));
    const services = _services.map(({ service, path }) => {
      console.log(chalk.blue(chalk.bold("  Parsing service:"), service));
      const content = readFileSync(join(path, "README.md"), "utf-8");
      const name = extractName(content);
      const description = extractDescription(content);
      const readmePath = extractReadmeLocation(path);
      if (name !== service) {
        console.log(
          chalk.red(
            `    Mismatch between directory name and README.md name: ${service} !== ${name}`,
          ),
        );
      }
      return {
        name,
        description,
        readmePath,
      };
    });
    return {
      category,
      services,
    };
  });
};
