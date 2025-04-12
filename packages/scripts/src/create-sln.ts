import { execa } from "execa";
import { readFile } from "fs/promises";
import { join } from "path";
import { glob } from "glob";
import { exit } from "process";
import { rootFolderPath, slnFilePath } from "./util.js";

const run = execa({
  reject: false,
  stdout: "inherit",
  stderr: "inherit",
});

await createSln();
await addProjFiles();

async function createSln() {
  const { exitCode } = await run`dotnet new sln --force --name ${slnFilePath}`;

  if (exitCode !== 0) {
    console.error("That was an error creating an sln file.");
    exit(exitCode);
  }
}

async function addProjFiles() {
  const projFiles = await glob("{apps,packages}/**/*.*proj", {
    cwd: rootFolderPath,
  });
  for (const file of projFiles) {
  }
}
