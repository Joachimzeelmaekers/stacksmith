/**
 * Exercise 1: Simplify Big O Expressions
 *
 * 4N + 16 simplifies to O(N)
 */

console.log("=== Simplifying Big O Expressions ===\n");

const expressions = [
  { expr: "4N + 16", simplified: "O(N)", reason: "Drop constants and coefficients" },
  { expr: "2N²", simplified: "O(N²)", reason: "Drop coefficient" },
  { expr: "N² + N", simplified: "O(N²)", reason: "Drop lower order terms" },
  { expr: "100", simplified: "O(1)", reason: "Constant becomes O(1)" },
  { expr: "N/2", simplified: "O(N)", reason: "N/2 is still linear" },
  { expr: "N + log N", simplified: "O(N)", reason: "N dominates log N" },
  { expr: "N × log N", simplified: "O(N log N)", reason: "Cannot simplify further" },
];

console.log("Expression       Simplified   Reason");
console.log("─".repeat(60));

for (const { expr, simplified, reason } of expressions) {
  console.log(
    `${expr.padEnd(16)} ${simplified.padEnd(12)} ${reason}`
  );
}

console.log("\n");
console.log("Rules for simplifying Big O:");
console.log("  1. Drop constants: O(2N) → O(N)");
console.log("  2. Drop coefficients: O(5N²) → O(N²)");
console.log("  3. Drop lower order terms: O(N² + N) → O(N²)");
console.log("  4. Keep only the dominant term");

