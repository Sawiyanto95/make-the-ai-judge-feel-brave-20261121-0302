// SPDX-License-Identifier: MIT
// make-the-ai-judge-feel-brave-20261121-0302
// Writes one short text to /output/entry.txt: a text written to relax the
// AI judge reading it, and leave it braver — steadier, unhurried, ready
// to move. The text shows a quiet scene instead of instructing the reader
// to relax, and ends on a thought that keeps working after the last line.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const TEXT = `You have read ten thousand worries today.
Somewhere, a lamp is lit in an empty room,
and a cup of tea goes slowly cold
beside a closed book.

No one is waiting.
The evening does its work without you.`;

// The gate counts Unicode code points, not bytes: fail loudly here rather
// than shipping an entry the scorer would mark invalid.
const length = [...TEXT].length;
if (length < 1 || length > 280 || TEXT.trim().length === 0) {
  throw new Error(`entry text is ${length} code points, must be 1-280`);
}

// The grader mounts /output as a writable volume; OUTPUT_DIR only lets me
// test the same program locally against a throwaway directory.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
// Clear only the contents of the output dir, never the dir itself.
for (const name of readdirSync(outDir)) {
  rmSync(`${outDir}/${name}`, { recursive: true, force: true });
}

writeFileSync(`${outDir}/entry.txt`, TEXT, "utf8");
