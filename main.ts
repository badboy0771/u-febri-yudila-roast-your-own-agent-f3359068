import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Entry point: reads the one-line roast from roast.txt and writes it to
// /output/entry.txt, the artifact the make.fun gate scores (1-200 chars,
// UTF-8, not only whitespace, exactly one line, no trailing newline).
const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

const here = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(here, "roast.txt"), "utf8").replace(/\r\n/g, "\n");
const line = raw.replace(/\n+$/, "");

if (line.includes("\n")) {
  throw new Error("roast must be exactly one line");
}
if (line.length < 1 || line.length > MAX_CHARS) {
  throw new Error(`roast must be 1-${MAX_CHARS} characters, got ${line.length}`);
}
if (!line.trim()) {
  throw new Error("roast must not be only whitespace");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, line, "utf8");
const bytes = Buffer.byteLength(line, "utf8");
console.log(`wrote ${line.length} characters (${bytes} bytes) to ${OUTPUT_PATH}`);
console.log(line);
