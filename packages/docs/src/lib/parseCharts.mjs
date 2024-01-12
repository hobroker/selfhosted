import { getCharts } from "./getCharts.mjs";
import chalk from "chalk";
import { readFileSync } from "fs";
import { join } from "path";
import {
  extractAppUrl,
  extractDescription,
  extractName,
  extractReadmeLocation,
} from "./extract.mjs";

export const parseCharts = async (path = "charts") => {
  const charts = await getCharts("charts");

  return charts.map(({ category, services: _services }) => {
    console.log(
      chalk.blue(chalk.bold("Parsing category:"), chalk.italic(category)),
    );
    const services = _services.map(({ service, path }) => {
      console.log(
        chalk.blueBright(
          chalk.bold("  Parsing service:"),
          chalk.italic(service),
        ),
      );
      const content = readFileSync(join(path, "README.md"), "utf-8");
      const name = extractName(content, { serviceName: service });
      const description = extractDescription(content);
      const readmePath = extractReadmeLocation(path);
      const appUrl = extractAppUrl(content);

      return {
        name,
        readmePath,
        description,
        appUrl,
      };
    });
    console.log();
    return {
      category,
      services,
    };
  });
};
