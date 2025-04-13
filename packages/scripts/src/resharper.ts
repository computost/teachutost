import { readFile } from "fs/promises";
import { join } from "path";
import { exit } from "process";
import { Log } from "sarif";

import { run } from "./run.js";

const sarifFilePath = join(import.meta.dirname, "../bin/inspectcode.sarif");

await run(
  "running the ReSharper command-line tool"
)`dotnet jb inspectcode Teachutost.sln --output=${sarifFilePath} --format=sarif`;

const results = JSON.parse((await readFile(sarifFilePath)).toString()) as Log;
const issues = new Set<string>();
results.runs.forEach((run) =>
  run.results?.forEach((result) => {
    if (result.message.text) {
      issues.add(result.message.text);
    }
  })
);

if (issues.size > 0) {
  console.error("ReSharper encountered several issues with the code:");
  for (const issue of issues) {
    console.error(issue);
  }
  exit(1);
}
