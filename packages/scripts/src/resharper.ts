import { execa } from "execa";
import { readFile } from "fs/promises";
import { join } from "path";
import { exit } from "process";
import { Log } from "sarif";

const backEndFolderPath = join(import.meta.dirname, "../back-end");
const slnFilePath = join(backEndFolderPath, "back-end.sln");
const sarifFilePath = join(backEndFolderPath, "inspectcode.sarif");

await slnGen();

const { exitCode } = await execa({
  reject: false,
  stdout: "inherit",
  stderr: "inherit",
})`dotnet jb inspectcode ${slnFilePath} --output=${sarifFilePath} --format=sarif`;

if (exitCode !== 0) {
  console.error("That was an error running the ReSharper command-line tool.");
  exit(exitCode);
}

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

async function slnGen() {
  const { exitCode } = await execa({
    reject: false,
    stdout: "inherit",
    stderr: "inherit",
  })`dotnet slngen ${backEndFolderPath}`;

  if (exitCode !== 0) {
    console.error("That was an error running SlnGen.");
    exit(exitCode);
  }
}
