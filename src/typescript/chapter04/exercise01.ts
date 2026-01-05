/**
 * Exercise 1: Big O Step Count Table
 *
 * Fill in the step counts for different Big O complexities.
 */

console.log("=== Big O Step Count Table ===\n");

console.log("N Elements     O(N)        O(log N)        O(N²)");
console.log("─".repeat(55));

const data = [
  { n: 100, oN: 100, oLogN: Math.log2(100).toFixed(2), oN2: 10000 },
  { n: 2000, oN: 2000, oLogN: Math.log2(2000).toFixed(2), oN2: 4000000 },
];

for (const row of data) {
  console.log(
    `${row.n.toString().padStart(10)}     ` +
    `${row.oN.toString().padStart(6)}      ` +
    `${row.oLogN.toString().padStart(8)}      ` +
    `${row.oN2.toLocaleString().padStart(10)}`
  );
}

console.log("\n");
console.log("How to calculate:");
console.log("  O(N)     = N");
console.log("  O(log N) = log₂(N)");
console.log("  O(N²)    = N × N");

