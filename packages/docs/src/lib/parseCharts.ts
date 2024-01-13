import chalk from "chalk";
import { readFileSync } from "fs";
import { join } from "path";
import {
  extractSourceCodeUrl,
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
      const markdown = readFileSync(join(path, "README.md"), "utf-8");
      const name = extractName(markdown, { name: service });
      const description = extractDescription(markdown);
      const readmePath = extractReadmeLocation(category, service);
      const sourceCodeUrl = extractSourceCodeUrl(markdown);

      return {
        name,
        description,
        url: {
          local: readmePath,
          sourceCode: sourceCodeUrl,
        },
      };
    });
    console.log();
    return {
      category,
      services,
    };
  });
