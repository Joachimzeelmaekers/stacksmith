/**
 * Exercise 5: Identify Big O
 *
 * Practice identifying the Big O of various code patterns.
 */

console.log("=== Identify Big O Patterns ===\n");

const patterns = [
  {
    name: "Array access by index",
    code: "arr[5]",
    complexity: "O(1)",
    reason: "Direct memory access",
  },
  {
    name: "Simple loop",
    code: "for (i = 0; i < n; i++) { ... }",
    complexity: "O(N)",
    reason: "Visits each element once",
  },
  {
    name: "Nested loops",
    code: "for (i..n) { for (j..n) { ... } }",
    complexity: "O(N²)",
    reason: "N × N iterations",
  },
  {
    name: "Binary search",
    code: "while (left <= right) { mid = (left+right)/2; ... }",
    complexity: "O(log N)",
    reason: "Halves search space each step",
  },
  {
    name: "Hash table lookup",
    code: "map.get(key)",
    complexity: "O(1)",
    reason: "Direct hash computation",
  },
  {
    name: "Sorting (efficient)",
    code: "arr.sort()",
    complexity: "O(N log N)",
    reason: "Divide and conquer",
  },
  {
    name: "Triple nested loops",
    code: "for (i..n) { for (j..n) { for (k..n) { ... } } }",
    complexity: "O(N³)",
    reason: "N × N × N iterations",
  },
];

for (const pattern of patterns) {
  console.log(`${pattern.name}`);
  console.log(`  Code: ${pattern.code}`);
  console.log(`  Complexity: ${pattern.complexity}`);
  console.log(`  Reason: ${pattern.reason}\n`);
}

