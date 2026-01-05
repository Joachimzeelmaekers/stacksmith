/**
 * Exercise 1: Insertion Sort
 *
 * Implement and analyze insertion sort - optimized for nearly sorted data.
 */

import { insertionSort } from "../helpers/sort/insertion";

console.log("=== Insertion Sort ===\n");

const scenarios = [
  { name: "Worst case (reverse)", arr: [5, 4, 3, 2, 1] },
  { name: "Best case (sorted)", arr: [1, 2, 3, 4, 5] },
  { name: "Nearly sorted", arr: [1, 2, 4, 3, 5] },
  { name: "Random", arr: [3, 1, 4, 1, 5, 9, 2, 6] },
];

for (const { name, arr } of scenarios) {
  console.log(`${name}:`);
  console.log(`  Input:  [${arr.join(", ")}]`);
  const result = insertionSort(arr);
  console.log(`  Output: [${result.sorted.join(", ")}]`);
  console.log(
    `  Comparisons: ${result.comparisons}, Shifts: ${result.shifts}\n`
  );
}

console.log("Time Complexity:");
console.log("  Worst case: O(N²) - reverse sorted");
console.log("  Best case:  O(N) - already sorted ← Key advantage!");
console.log("  Average:    O(N²)");
