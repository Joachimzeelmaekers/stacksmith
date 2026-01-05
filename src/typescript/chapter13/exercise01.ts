/**
 * Exercise 1: Partition Array
 *
 * Given an array of positive integers, partition them such that all
 * even integers appear before all odd integers.
 */

function partitionEvenOdd(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    while (left < right && arr[left] % 2 === 0) {
      left++;
    }
    while (left < right && arr[right] % 2 !== 0) {
      right--;
    }
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr;
}

console.log("=== Partition Even/Odd ===\n");

const testCases = [
  [1, 2, 3, 4, 5, 6, 7, 8],
  [8, 7, 6, 5, 4, 3, 2, 1],
  [2, 4, 6, 8],
  [1, 3, 5, 7],
  [1],
  [],
];

for (const test of testCases) {
  const original = [...test];
  const result = partitionEvenOdd([...test]);
  console.log(`Original: [${original.join(", ")}]`);
  console.log(`  → Partitioned: [${result.join(", ")}]\n`);
}
