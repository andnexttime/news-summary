// News summary entry: copies the summary written for 11 November 2026
// (summary.txt beside this file) to the grader's output file.
// Node 22, standard library only; no network, no randomness, no clock,
// so the same input always produces the same bytes.
//
// Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const text = readFileSync(new URL('./summary.txt', import.meta.url), 'utf8');

// Fail loudly rather than submit an invalid entry: the gate takes
// UTF-8 text of 1 to 2,000 characters (Unicode code points).
if (text.trim().length < 1 || [...text].length > 2000) {
  throw new Error('summary.txt must hold 1 to 2,000 characters');
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), text, 'utf8');
