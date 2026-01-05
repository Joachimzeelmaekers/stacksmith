/**
 * Exercise 4: Big O Comparison Chart
 *
 * Visualize how different Big O complexities grow.
 */

console.log("=== Big O Growth Comparison ===\n");

console.log("N        O(1)     O(log N)    O(N)      O(N log N)    O(N²)");
console.log("─".repeat(65));

const sizes = [1, 10, 100, 1000, 10000];

for (const n of sizes) {
  const o1 = 1;
  const oLogN = Math.ceil(Math.log2(n || 1));
  const oN = n;
  const oNLogN = n * Math.ceil(Math.log2(n || 1));
  const oN2 = n * n;

  console.log(
    `${n.toString().padStart(6)}   ` +
    `${o1.toString().padStart(4)}     ` +
    `${oLogN.toString().padStart(6)}      ` +
    `${oN.toString().padStart(6)}    ` +
    `${oNLogN.toString().padStart(10)}    ` +
    `${oN2.toString().padStart(10)}`
  );
}

console.log("\n");
console.log("Key Takeaways:");
console.log("  • O(1) - Constant: Always the same");
console.log("  • O(log N) - Logarithmic: Grows very slowly (binary search)");
console.log("  • O(N) - Linear: Grows proportionally (simple loops)");
console.log("  • O(N log N) - Linearithmic: Efficient sorting (mergesort)");
console.log("  • O(N²) - Quadratic: Avoid for large N (nested loops)");

