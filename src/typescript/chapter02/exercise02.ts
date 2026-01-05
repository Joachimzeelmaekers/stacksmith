/**
 * Exercise 2: Binary Search Step Count
 *
 * How many steps would binary search take for the same array and target?
 */

import { binarySearch } from "../helpers/search/binary";

console.log("=== Binary Search Step Count ===\n");

const arr = [2, 4, 6, 8, 10, 12, 13];
const target = 8;

console.log(`Array: [${arr.join(", ")}]`);
console.log(`Target: ${target}\n`);

console.log("Searching...");
const result = binarySearch(arr, target, { loggingEnabled: true });

console.log(`\nFound at index ${result.index} in ${result.steps} steps`);
console.log("\n✓ Binary search: O(log n) - much faster for large arrays");
