/**
 * Exercise 3: Nested Loops - Time Complexity
 *
 * What is the time complexity of nested loops?
 */

function printPairs(arr: number[]): void {
  let comparisons = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      comparisons++;
    }
  }
  console.log(`  Array size: ${arr.length}, Comparisons: ${comparisons}`);
}

console.log("=== Nested Loops - Time Complexity ===\n");

console.log("Function:");
console.log("  for (let i = 0; i < arr.length; i++) {");
console.log("    for (let j = 0; j < arr.length; j++) {");
console.log("      // O(1) work");
console.log("    }");
console.log("  }\n");

console.log("Analysis:");
console.log("  - Outer loop: N iterations");
console.log("  - Inner loop: N iterations for each outer");
console.log("  - Total: N × N = N²\n");

console.log("✓ Time Complexity: O(N²)\n");

console.log("Demonstration:");
for (const size of [5, 10, 20, 50]) {
  const arr = Array.from({ length: size }, (_, i) => i);
  printPairs(arr);
}

console.log("\nNotice: Doubling N quadruples the work!");

