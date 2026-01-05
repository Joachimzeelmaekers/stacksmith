/**
 * Exercise 4: Compare Sorting Algorithms
 *
 * Compare bubble sort, selection sort, and built-in sort.
 */

import { bubbleSort } from "../helpers/sort/bubble";
import { selectionSort } from "../helpers/sort/selection";

console.log("=== Sorting Algorithm Comparison ===\n");

const sizes = [100, 500, 1000, 2000];

console.log("Array Size   Bubble Sort   Selection Sort   Built-in Sort");
console.log("─".repeat(60));

for (const size of sizes) {
  const arr = Array.from({ length: size }, () =>
    Math.floor(Math.random() * 10000)
  );

  const start1 = performance.now();
  bubbleSort([...arr]);
  const bubble = (performance.now() - start1).toFixed(2);

  const start2 = performance.now();
  selectionSort([...arr]);
  const selection = (performance.now() - start2).toFixed(2);

  const start3 = performance.now();
  [...arr].sort((a, b) => a - b);
  const builtin = (performance.now() - start3).toFixed(2);

  console.log(
    `${size.toString().padStart(10)}   ` +
      `${bubble.padStart(8)}ms     ` +
      `${selection.padStart(10)}ms   ` +
      `${builtin.padStart(10)}ms`
  );
}

console.log("\n✓ Built-in sort uses O(N log N) algorithm (Timsort)");
console.log("  Much faster than O(N²) algorithms for large arrays");
