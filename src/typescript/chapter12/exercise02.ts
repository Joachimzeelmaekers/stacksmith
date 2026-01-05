/**
 * Exercise 2: Unique Paths with Memoization
 *
 * Optimize the unique paths problem from Chapter 11 using memoization.
 */

import { uniquePaths } from "../helpers/unique-paths";

console.log("=== Unique Paths with Memoization ===\n");

const grids = [
  { rows: 2, cols: 2 },
  { rows: 3, cols: 3 },
  { rows: 3, cols: 7 },
  { rows: 10, cols: 10 },
  { rows: 15, cols: 15 },
  { rows: 20, cols: 20 },
];

for (const { rows, cols } of grids) {
  const start = performance.now();
  const result = uniquePaths(rows, cols);
  const time = (performance.now() - start).toFixed(3);
  console.log(`Grid ${rows}x${cols}:`);
  console.log(`  → Unique paths: ${result} (${time}ms)\n`);
}

console.log("✓ Memoization makes this efficient even for large grids!");
