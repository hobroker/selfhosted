import chalk from "chalk";
import { ChartService } from "./types";

export const extractName = (
  readme: string,
  { name }: Pick<ChartService, "name">,
) => {
  const value = readme
    .split("\n")[0]
    .replaceAll("`", "")
    .replaceAll("#", "")
    .trim();

  if (!value) {
    console.log(chalk.red(chalk.bold("    ❌ Name: "), "missing"));
  }

  if (value !== name) {
    console.log(
      chalk.red(
        chalk.bold("    ❌ Name: "),
        `mismatch between directory name and README.md name: ${name} !== ${value}`,
      ),
    );
  }

  console.log(chalk.greenBright(chalk.bold("    Name: "), value));

  return value;
};

export const extractDescription = (readme: string) => {
  const rows = readme
    .substring(readme.indexOf("\n") + 1)
    .trim()
    .split("\n");
  if (!rows[0].startsWith("> ")) {
    console.log(chalk.red(chalk.bold("    ❌ Description: "), "Missing"));
    return "";
  }
  let value = "";
  for (const row of rows) {
    if (!row.startsWith("> ")) {
      break;
    }
    value += row.replace("> ", "") + "\n";
  }
  value = value.trim();

  console.log(chalk.greenBright(chalk.bold("    Description: "), value));

  return value;
};

export const extractReadmeLocation = (category: string, serviceName: string) =>
  `./charts/${category}/${serviceName}`;

export const extractAppUrl = (readme: string) => {
  const row = readme.split("\n").find((row) => row.startsWith("App: "));
  if (!row) {
    console.log(chalk.red(chalk.bold("    ❌ App URL: "), "Missing"));
    return "";
  }
  const value = row.split("App: ")[1].trim();

  console.log(chalk.greenBright(chalk.bold("    App URL: "), value));

  return value;
};
