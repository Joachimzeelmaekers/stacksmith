/**
 * Exercise 2: Best, Worst, Average Case Analysis
 *
 * Demonstrate how the same algorithm performs differently based on input.
 */

import { linearSearch } from "../helpers/search/linear";

console.log("=== Best, Worst, Average Case ===\n");

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(`Array: [${arr.join(", ")}]\n`);

// Best case - target at beginning
const best = linearSearch(arr, 1);
console.log("Best case (target = 1, at start):");
console.log(`  Steps: ${best.steps} → O(1)\n`);

// Worst case - target not found
const worst = linearSearch(arr, 99);
console.log("Worst case (target = 99, not found):");
console.log(`  Steps: ${worst.steps} → O(N)\n`);

// Average case - target in middle
const average = linearSearch(arr, 5);
console.log("Average case (target = 5, in middle):");
console.log(`  Steps: ${average.steps} → O(N/2) = O(N)\n`);

console.log("─".repeat(50));
console.log("Key insight:");
console.log("  - Big O typically refers to WORST case");
console.log("  - But best/average cases matter for algorithm choice");
console.log("  - Insertion sort: O(N²) worst, but O(N) best");
console.log("  - This makes it ideal for nearly-sorted data");
