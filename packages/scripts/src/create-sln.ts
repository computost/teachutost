import { glob } from "glob";

import { rootFolderPath } from "./root-folder-path.js";
import { run } from "./run.js";

await run("creating a solution file")`dotnet new sln --force --name Teachutost`;

const projFiles = await glob("{apps,packages}/**/*.*proj", {
  cwd: rootFolderPath,
});
for (const file of projFiles) {
  await run(
    `adding the project ${file} to the solution`
  )`dotnet sln add ${file}`;
}
