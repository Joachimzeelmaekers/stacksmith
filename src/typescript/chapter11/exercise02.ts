/**
 * Exercise 2: Array Sum
 *
 * Use recursion to write a function that accepts an array of numbers
 * and returns the sum of all numbers in the array.
 */

import { arraySum } from "../helpers/array/sum";

console.log("=== Array Sum ===\n");

const testCases = [
  [1, 2, 3, 4, 5],
  [10, 20, 30],
  [1],
  [],
  [-5, 5, -10, 10],
  [100, 200, 300, 400, 500],
];

for (const test of testCases) {
  const result = arraySum(test);
  console.log(`[${test.join(", ")}]`);
  console.log(`  → Sum: ${result}\n`);
}
