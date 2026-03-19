import pc from "picocolors";

export class CatalogLogger {
  private readonly collectedErrors: string[];
  private readonly tag: string;

  constructor(tag?: string, sharedErrors?: string[]) {
    this.collectedErrors = sharedErrors ?? [];
    this.tag = tag ? pc.dim(`[${tag}] `) : "";
  }

  child(tag: string): CatalogLogger {
    return new CatalogLogger(tag, this.collectedErrors);
  }

  info(msg: string): void {
    console.log(this.tag + pc.cyan(msg));
  }

  success(msg: string): void {
    console.log(this.tag + pc.green(pc.bold(msg)));
  }

  warn(msg: string): void {
    console.log(this.tag + pc.yellow(msg));
  }

  error(msg: string): void {
    console.error(this.tag + pc.red(pc.bold(`✖ ${msg}`)));
    this.collectedErrors.push(msg);
  }

  section(label: string): void {
    console.log(pc.blue(pc.bold(`\n▸ ${label}`)));
  }

  entry(label: string): void {
    console.log(this.tag + pc.dim(`  ${label}`));
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
      console.error(pc.red(pc.bold(`\n✖ Done — ${this.collectedErrors.length} error(s) found`)));
    }
  }
}
