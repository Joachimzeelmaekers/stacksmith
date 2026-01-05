/**
 * Exercise 3: Selection Sort Implementation
 *
 * Implement and analyze selection sort.
 */

import { selectionSort } from "../helpers/sort/selection";

console.log("=== Selection Sort Analysis ===\n");

const testArrays = [
  [5, 4, 3, 2, 1],
  [1, 2, 3, 4, 5],
  [3, 1, 4, 1, 5, 9, 2, 6],
];

for (const arr of testArrays) {
  console.log(`Input:  [${arr.join(", ")}]`);
  const result = selectionSort(arr);
  console.log(`Output: [${result.sorted.join(", ")}]`);
  console.log(`  Comparisons: ${result.comparisons}`);
  console.log(`  Swaps: ${result.swaps}\n`);
}

console.log("Time Complexity: O(N²) always");
console.log("  - Always makes N(N-1)/2 comparisons");
console.log("  - But only N-1 swaps maximum");
console.log("  - Better than bubble sort when writes are expensive");
