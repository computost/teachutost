import { execa } from "execa";
import { exit } from "process";

import { rootFolderPath } from "./root-folder-path.js";

export function run(
  intent: string
): (template: TemplateStringsArray, ...parameters: string[]) => Promise<void> {
  return async (template: TemplateStringsArray, ...parameters: string[]) => {
    const { exitCode } = await execa({
      cwd: rootFolderPath,
      reject: false,
      stderr: "inherit",
      stdout: "inherit",
    })(template, ...parameters);

    if (exitCode !== 0) {
      console.error(`There was an error ${intent}.`);
      console.error(String.raw(template, ...parameters));
      exit(exitCode);
    }
  };
}
