/**
 * Exercise 1: Linear Search Step Count
 *
 * How many steps would it take to perform a linear search for the number 8
 * in the ordered array [2, 4, 6, 8, 10, 12, 13]?
 */

import { linearSearch } from "../helpers/search/linear";

console.log("=== Linear Search Step Count ===\n");

const arr = [2, 4, 6, 8, 10, 12, 13];
const target = 8;

console.log(`Array: [${arr.join(", ")}]`);
console.log(`Target: ${target}\n`);

console.log("Searching...");
const result = linearSearch(arr, target, { loggingEnabled: true });

console.log(`\nFound at index ${result.index} in ${result.steps} steps`);
console.log("\n✓ Answer: 4 steps");
