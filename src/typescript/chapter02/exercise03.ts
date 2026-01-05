/**
 * Exercise 3: Linear vs Binary Search Comparison
 *
 * Compare the number of steps for different array sizes.
 */

function linearSearchSteps(n: number): number {
  return n; // Worst case: check every element
}

function binarySearchSteps(n: number): number {
  return Math.ceil(Math.log2(n + 1)); // O(log n)
}

console.log("=== Linear vs Binary Search Comparison ===\n");

console.log("Array Size   Linear Search   Binary Search   Speedup");
console.log("─".repeat(55));

const sizes = [10, 100, 1000, 10000, 100000, 1000000];

for (const n of sizes) {
  const linear = linearSearchSteps(n);
  const binary = binarySearchSteps(n);
  const speedup = (linear / binary).toFixed(0);

  console.log(
    `${n.toString().padStart(9)}   ${linear.toString().padStart(13)}   ${binary
      .toString()
      .padStart(13)}   ${speedup}x`
  );
}

console.log("\n✓ Binary search is exponentially faster as data grows");
console.log("  But requires sorted data!");
