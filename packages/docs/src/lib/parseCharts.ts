import chalk from "chalk";
import { readFileSync } from "fs";
import { join } from "path";
import {
  extractAppUrl,
  extractDescription,
  extractName,
  extractReadmeLocation,
} from "./extract";
import { ChartData, ChartSource } from "./types";

export const parseCharts = async (
  sources: ChartSource[],
): Promise<ChartData[]> =>
  sources.map(({ category, services: _services }) => {
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
      const name = extractName(content, { name: service });
      const description = extractDescription(content);
      const readmePath = extractReadmeLocation(category, service);
      const appUrl = extractAppUrl(content);

      return {
        name,
        path: readmePath,
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
