import chalk from "chalk";

export const extractName = (readme) => {
  return readme.split("\n")[0].replaceAll("`", "").replaceAll("#", "").trim();
};

export const extractDescription = (readme) => {
  const rows = readme
    .substring(readme.indexOf("\n") + 1)
    .trim()
    .split("\n");
  if (!rows[0].startsWith("> ")) {
    console.log(chalk.red("    Missing description in README.md"));
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
