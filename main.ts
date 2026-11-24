import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Gate: entry.txt must be UTF-8 text of 1-200 characters, not only
// white space, and a single line. Copy it verbatim to the output dir.
const dir = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(dir, "entry.txt"), "utf8");

if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (text !== text.trim()) {
  throw new Error("entry must not have leading or trailing white space");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
