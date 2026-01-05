/**
 * Exercise 1: Find First Duplicate
 *
 * Write a function that finds the first duplicate value in an array.
 */

function findFirstDuplicate(arr: number[]): number {
  const seen = new Set<number>();

  for (const num of arr) {
    if (seen.has(num)) {
      return num;
    }
    seen.add(num);
  }

  return -1;
}

console.log("=== Find First Duplicate ===\n");

const testCases = [
  [2, 1, 3, 5, 3, 2],
  [1, 2, 3, 4, 5],
  [5, 5, 5, 5],
  [1, 2, 3, 4, 5, 1],
];

for (const arr of testCases) {
  const result = findFirstDuplicate(arr);
  console.log(`[${arr.join(", ")}]`);
  console.log(`  First duplicate: ${result === -1 ? "None" : result}\n`);
}

console.log("Time Complexity: O(N) - single pass");
console.log("Space Complexity: O(N) - hash set");

