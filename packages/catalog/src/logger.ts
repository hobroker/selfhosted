import pc from "picocolors";

export class CatalogLogger {
  private readonly collectedErrors: string[] = [];

  info(msg: string): void {
    console.log(pc.cyan(msg));
  }

  success(msg: string): void {
    console.log(pc.green(pc.bold(msg)));
  }

  warn(msg: string): void {
    console.log(pc.yellow(msg));
  }

  error(msg: string): void {
    console.log(pc.red(pc.bold(`✖ ${msg}`)));
    this.collectedErrors.push(msg);
  }

  section(label: string): void {
    console.log(pc.blue(pc.bold(`\n▸ ${label}`)));
  }

  entry(label: string): void {
    console.log(pc.dim(`  ${label}`));
  }

  hasErrors(): boolean {
    return this.collectedErrors.length > 0;
  }

  getErrors(): readonly string[] {
    return this.collectedErrors;
  }

  summarize(): void {
    if (this.collectedErrors.length === 0) {
      console.log(pc.green(pc.bold("\n✔ Done — no errors")));
    } else {
      console.log(
        pc.red(pc.bold(`\n✖ Done — ${this.collectedErrors.length} error(s) found`)),
      );
    }
  }
}
