/**
 * Exercise 3: Largest Product of Three
 *
 * Find the largest product of any three numbers in an array.
 */

function largestProductOfThree(arr: number[]): number {
  if (arr.length < 3) return 0;

  arr.sort((a, b) => a - b);

  const n = arr.length;

  // Option 1: Three largest positive numbers
  const product1 = arr[n - 1] * arr[n - 2] * arr[n - 3];

  // Option 2: Two smallest (most negative) and largest positive
  const product2 = arr[0] * arr[1] * arr[n - 1];

  return Math.max(product1, product2);
}

console.log("=== Largest Product of Three ===\n");

const testCases = [
  [1, 2, 3, 4, 5],
  [-10, -10, 1, 2, 3],
  [-5, -4, -3, -2, -1],
  [1, 2, 3],
  [-1, -2, -3, 4],
];

for (const arr of testCases) {
  const result = largestProductOfThree(arr);
  console.log(`[${arr.join(", ")}]`);
  console.log(`  Largest product: ${result}\n`);
}

console.log("Key insight:");
console.log("  - Two negatives × positive can be larger than three positives");
console.log("  - Always check both possibilities");
console.log("\nTime Complexity: O(N log N) for sorting");

