import { glob } from "glob";
import { homedir, platform } from "os";
import { join } from "path";
import { exit } from "process";

import { run } from "./run.js";
import { rootFolderPath } from "./root-folder-path.js";
import { writeFile } from "fs/promises";

await run("installing chromium")`pnpm playwright-core install chromium`;
await run(
  "installing system dependencies for chromium"
)`pnpm playwright-core install-deps chromium`;

const playwrightInstallationLocationsByPlatform: {
  [Key in ReturnType<typeof platform>]?: string;
} = {
  linux: `${homedir()}/.cache/ms-playwright`,
};

const playwrightInstallationLocation =
  playwrightInstallationLocationsByPlatform[platform()];

if (playwrightInstallationLocation === undefined) {
  console.error(`Unsupported platform: ${platform()}`);
  exit(1);
}

const chromiumFolders = await glob("chromium-*", {
  cwd: playwrightInstallationLocation,
});
const currentVersion = Math.max(
  ...chromiumFolders.map((folder) =>
    parseInt(
      // Chromium folders are of the format chromium-1234, where 1234 is the
      // version number.
      folder.replace(/^chromium-/, "")
    )
  )
);
const chromiumFolderPath = join(
  playwrightInstallationLocation,
  `chromium-${currentVersion}`
);

const chromeExecutableNames = await glob(
  `*/chrome${platform() === "win32" ? ".exe" : ""}`,
  {
    cwd: chromiumFolderPath,
  }
);
const chromeExecutablePath = join(chromiumFolderPath, chromeExecutableNames[0]);

const dotenvFilePath = join(
  rootFolderPath,
  "apps/native/.env.development.local"
);
await writeFile(dotenvFilePath, `EDGE_PATH=${chromeExecutablePath}`);
