/**
 * Exercise 2: Array vs Set Operations
 *
 * Demonstrate the difference in step counts between arrays and sets.
 */

console.log("=== Array vs Set Operations ===\n");

const size = 1000;
const arr = Array.from({ length: size }, (_, i) => i);
const set = new Set(arr);

console.log(`Data size: ${size} elements\n`);

// Search operation
const searchValue = 999;

console.log("Search Operation:");
console.log("─".repeat(40));

let arraySteps = 0;
for (const val of arr) {
  arraySteps++;
  if (val === searchValue) break;
}
console.log(`  Array: ${arraySteps} steps (linear search)`);
console.log(`  Set:   1 step (hash lookup)`);

// Demonstrate with timing
console.log("\nActual Performance Test:");
console.log("─".repeat(40));

const largeArr = Array.from({ length: 1000000 }, (_, i) => i);
const largeSet = new Set(largeArr);
const target = 999999;

const arrStart = performance.now();
largeArr.includes(target);
const arrTime = performance.now() - arrStart;

const setStart = performance.now();
largeSet.has(target);
const setTime = performance.now() - setStart;

console.log(`  Array search: ${arrTime.toFixed(4)}ms`);
console.log(`  Set lookup:   ${setTime.toFixed(4)}ms`);
console.log(
  `  Speedup:      ${(arrTime / setTime).toFixed(1)}x faster with Set`
);
