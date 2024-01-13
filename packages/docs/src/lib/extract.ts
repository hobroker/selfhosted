import chalk from "chalk";
import { ChartService } from "./types";

const logError = (key: string, message: string) =>
  console.log(chalk.redBright(chalk.bold(`    ❌ ${key}: `), message));

const logSuccess = (key: string, message: string) =>
  console.log(chalk.greenBright(chalk.bold(`    ${key}: `), message));

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
    logError("Name", "missing");
  }

  if (value !== name) {
    logError(
      "Name",
      `mismatch between directory name and README.md name: ${name} !== ${value}`,
    );
  }

  logSuccess("Name", value);

  return value;
};

export const extractDescription = (readme: string) => {
  const rows = readme
    .substring(readme.indexOf("\n") + 1)
    .trim()
    .split("\n");
  if (!rows[0].startsWith("> ")) {
    logError("Description", "missing");
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

  logSuccess("Description", value);

  return value;
};

export const extractReadmeLocation = (category: string, serviceName: string) =>
  `./charts/${category}/${serviceName}`;

export const extractAppUrl = (readme: string) => {
  const value = readme
    .split("\n")
    .find((row) => row.startsWith("Source Code: "))
    ?.split("Source Code: ")[1]
    ?.trim();
  if (!value) {
    logError("App URL", "missing");
    return "";
  }

  logSuccess("App URL", value);

  return value;
};
