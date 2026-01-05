/**
 * Exercise 3: Find Missing Number
 *
 * Given an array containing n distinct numbers from 0 to n,
 * find the one missing number. Do this in O(n) time.
 */

function findMissingNumber(arr: number[]): number {
  const n = arr.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

function findMissingNumberXOR(arr: number[]): number {
  const n = arr.length;
  let xor = 0;

  for (let i = 0; i <= n; i++) {
    xor ^= i;
  }

  for (const num of arr) {
    xor ^= num;
  }

  return xor;
}

console.log("=== Find Missing Number ===\n");

const testCases = [
  [3, 0, 1],
  [0, 1],
  [9, 6, 4, 2, 3, 5, 7, 0, 1],
  [0],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 12, 13, 14, 15],
];

for (const test of testCases) {
  const result1 = findMissingNumber(test);
  const result2 = findMissingNumberXOR(test);
  console.log(`Array (length ${test.length}): [${test.join(", ")}]`);
  console.log(`  → Missing (sum method): ${result1}`);
  console.log(`  → Missing (XOR method): ${result2}\n`);
}

console.log("Both methods: O(n) time, O(1) space");
