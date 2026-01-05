/**
 * Exercise 4: Missing Number
 *
 * Given an array containing n-1 numbers from 1 to n, find the missing number.
 */

// Using sum formula: O(N) time, O(1) space
function missingNumberSum(arr: number[]): number {
  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

// Using XOR: O(N) time, O(1) space
function missingNumberXOR(arr: number[]): number {
  const n = arr.length + 1;
  let xor = 0;

  for (let i = 1; i <= n; i++) {
    xor ^= i;
  }

  for (const num of arr) {
    xor ^= num;
  }

  return xor;
}

// Using hash set: O(N) time, O(N) space
function missingNumberSet(arr: number[]): number {
  const n = arr.length + 1;
  const set = new Set(arr);

  for (let i = 1; i <= n; i++) {
    if (!set.has(i)) return i;
  }

  return -1;
}

console.log("=== Missing Number ===\n");

const testCases = [
  [1, 2, 4, 5, 6],
  [3, 7, 1, 2, 8, 4, 5],
  [1, 2, 3, 4, 5, 6, 7, 8, 10],
];

for (const arr of testCases) {
  const sum = missingNumberSum(arr);
  const xor = missingNumberXOR(arr);
  const set = missingNumberSet(arr);

  console.log(`[${arr.join(", ")}]`);
  console.log(`  Sum method: ${sum}`);
  console.log(`  XOR method: ${xor}`);
  console.log(`  Set method: ${set}\n`);
}

console.log("Comparison:");
console.log("  Sum: O(N) time, O(1) space - may overflow for large numbers");
console.log("  XOR: O(N) time, O(1) space - no overflow ✓");
console.log("  Set: O(N) time, O(N) space - simple but uses more memory");

