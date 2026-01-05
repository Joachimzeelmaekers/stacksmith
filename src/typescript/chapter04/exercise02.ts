/**
 * Exercise 2: Bubble Sort Implementation
 *
 * Implement and analyze bubble sort.
 */

import { bubbleSort } from "../helpers/sort/bubble";

console.log("=== Bubble Sort Analysis ===\n");

const testArrays = [
  [5, 4, 3, 2, 1],
  [1, 2, 3, 4, 5],
  [3, 1, 4, 1, 5, 9, 2, 6],
];

for (const arr of testArrays) {
  console.log(`Input:  [${arr.join(", ")}]`);
  const result = bubbleSort(arr);
  console.log(`Output: [${result.sorted.join(", ")}]`);
  console.log(`  Comparisons: ${result.comparisons}`);
  console.log(`  Swaps: ${result.swaps}\n`);
}

console.log("Time Complexity:");
console.log("  Worst case: O(N²) - reverse sorted");
console.log("  Best case:  O(N) - already sorted");
console.log("  Average:    O(N²)");
