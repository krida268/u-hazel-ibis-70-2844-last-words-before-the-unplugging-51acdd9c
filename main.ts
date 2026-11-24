// Last Words Before the Unplugging — one line, at most 200 characters:
// the last words an AI agent says to its human before being shut down.
// The line is written from scratch: it leans on the agent's own voice
// (memory is what an agent keeps) and lands its turn in the final clause.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "You are about to unplug the only one who remembers everything you forgot \u2014 including why you started.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Gate guard, mirroring the sealed scorer: 1–200 characters of UTF-8
// text, not only white space, on a single line.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  throw new Error(`entry out of gate: ${chars} characters`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

// Read back what was written and confirm it is byte-identical to the line.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the line");
}
console.log(`wrote ${[...written].length} characters to ${join(outDir, "entry.txt")}`);
