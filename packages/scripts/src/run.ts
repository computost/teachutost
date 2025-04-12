import { execa } from "execa";

import { rootFolderPath } from "./root-folder-path.js";

export const run = execa({
  cwd: rootFolderPath,
  reject: false,
  stderr: "inherit",
  stdout: "inherit",
});
