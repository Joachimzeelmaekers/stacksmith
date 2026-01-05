/**
 * Exercise 2: Array Sum - Time Complexity
 *
 * What is the time complexity of summing all elements in an array?
 */

import { arraySum } from "../helpers/array/sum";

console.log("=== Array Sum - Time Complexity ===\n");

console.log("Analysis:");
console.log("  - Single loop through all N elements");
console.log("  - Each iteration does O(1) work");
console.log("  - Total: N iterations × O(1) = O(N)\n");

console.log("✓ Time Complexity: O(N)\n");

const sizes = [10, 100, 1000];
for (const n of sizes) {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  const result = arraySum(arr);
  console.log(`  Array of ${n} elements: sum = ${result}`);
}
