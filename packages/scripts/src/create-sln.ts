import { glob } from "glob";
import { exit } from "process";

import { rootFolderPath } from "./root-folder-path.js";
import { run } from "./run.js";

await createSlnFile();
await addProjFiles();

async function createSlnFile() {
  const { exitCode } = await run`dotnet new sln --force --name Teachutost`;

  if (exitCode !== 0) {
    console.error("There was an error creating a solution file.");
    exit(exitCode);
  }
}

async function addProjFiles() {
  const projFiles = await glob("{apps,packages}/**/*.*proj", {
    cwd: rootFolderPath,
  });
  for (const file of projFiles) {
    const { exitCode } = await run`dotnet sln add ${file}`;

    if (exitCode !== 0) {
      console.error(
        `There was an error adding the project ${file} to the solution.`
      );
      exit(exitCode);
    }
  }
}
