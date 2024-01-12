import chalk from "chalk";

export const extractName = (readme, { serviceName }) => {
  const name = readme
    .split("\n")[0]
    .replaceAll("`", "")
    .replaceAll("#", "")
    .trim();

  if (!name) {
    console.log(chalk.red(`    ❌ Missing name`));
  }

  if (name !== serviceName) {
    console.log(
      chalk.red(
        `    ❌ Mismatch between directory name and README.md name: ${service} !== ${name}`,
      ),
    );
  }

  return name;
};

export const extractDescription = (readme) => {
  const rows = readme
    .substring(readme.indexOf("\n") + 1)
    .trim()
    .split("\n");
  if (!rows[0].startsWith("> ")) {
    console.log(chalk.red("    ❌ Missing description"));
  }
  let description = "";
  for (const row of rows) {
    if (!row.startsWith("> ")) {
      break;
    }
    description += row.replace("> ", "") + "\n";
  }

  return description.trim();
};

export const extractReadmeLocation = (readmePath) => {
  return "./charts/" + readmePath.split("/charts/")[1];
};

export const extractAppUrl = (readme) => {
  const row = readme.split("\n").find((row) => row.startsWith("App: "));
  if (!row) {
    console.log(chalk.red(`    ❌ Missing app URL`));
    return "";
  }

  return row.split("App: ")[1].trim();
};
