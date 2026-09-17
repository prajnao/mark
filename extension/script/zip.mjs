import { readFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const extension = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(extension, "dist");

// Repo root, one level above extension
const repoRoot = resolve(extension, "..");

// Read the version from the built manifest
const manifest = JSON.parse(
  readFileSync(resolve(dist, "manifest.json"), "utf8"),
);

const releases = resolve(repoRoot, "releases");
mkdirSync(releases, { recursive: true });

const out = resolve(releases, `mark-v${manifest.version}.zip`);

execSync(`zip -r -q -X "${out}" .`, { cwd: dist });

console.log(`Packaged ${out}`);