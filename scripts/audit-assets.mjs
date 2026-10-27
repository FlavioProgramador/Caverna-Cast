import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const root = process.cwd();
const publicRoot = join(root, "public");
const sourceFiles = [
  ...["index.html", "estudio.html", "servicos.html", "pacotes.html", "contato.html"].map((file) => join(root, file)),
  join(root, "src"),
];
const textExtensions = new Set([".html", ".ts", ".tsx", ".css"]);
const filesToScan = [];
async function collect(target) {
  const info = await stat(target);
  if (info.isFile()) {
    if (textExtensions.has(extname(target))) filesToScan.push(target);
    return;
  }
  for (const item of await readdir(target, { withFileTypes: true })) {
    if (item.isDirectory()) await collect(join(target, item.name));
    else if (textExtensions.has(extname(item.name))) filesToScan.push(join(target, item.name));
  }
}
for (const target of sourceFiles) await collect(target);

const references = new Map();
for (const file of filesToScan) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(/\/(?:images\/[A-Za-z0-9_./-]+|caverna-cast-logo\.png)/g)) {
    const assetPath = match[0];
    if (!references.has(assetPath)) references.set(assetPath, []);
    references.get(assetPath).push(relative(root, file));
  }
}

let failures = 0;
for (const [assetPath, origins] of references) {
  const absolutePath = join(publicRoot, assetPath.slice(1));
  try {
    const info = await stat(absolutePath);
    if (!info.isFile()) throw new Error("not a file");
    if (info.size > 350 * 1024) {
      console.warn(`WARN ${assetPath}: ${(info.size / 1024).toFixed(1)} KiB (referenced by ${origins.join(", ")})`);
    }
  } catch {
    console.error(`MISSING ${assetPath} (referenced by ${origins.join(", ")})`);
    failures += 1;
  }
}

if (failures > 0) {
  console.error(`Asset audit failed: ${failures} missing asset(s).`);
  process.exit(1);
}
console.log(`Asset audit passed: ${references.size} unique local asset references checked across ${filesToScan.length} source files.`);
