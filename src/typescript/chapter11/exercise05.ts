/**
 * Exercise 5: Unique Paths in Grid
 *
 * Imagine a robot on a grid that can only move right or down.
 * Write a function that calculates the number of unique paths
 * from top-left to bottom-right of a grid with given rows and columns.
 */

import { uniquePaths } from "../helpers/unique-paths";

console.log("=== Unique Paths in Grid ===\n");

const grids = [
  { rows: 2, cols: 2 },
  { rows: 3, cols: 3 },
  { rows: 3, cols: 7 },
  { rows: 4, cols: 4 },
  { rows: 5, cols: 5 },
];

for (const { rows, cols } of grids) {
  // Explicitly don't use optimal solution here by passing useMemo: false
  const result = uniquePaths(rows, cols, { useMemo: false });
  console.log(`Grid ${rows}x${cols}:`);
  console.log(`  → Unique paths: ${result}\n`);
}

console.log("Note: This naive recursion has exponential time complexity.");
console.log("Chapter 12 shows how to optimize with dynamic programming.");
