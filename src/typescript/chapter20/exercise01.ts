/**
 * Exercise 1: Magic Index
 *
 * A magic index is an index i where array[i] = i.
 * Find a magic index in a sorted array of distinct integers.
 */

function findMagicIndex(arr: number[]): number {
  return binarySearchMagic(arr, 0, arr.length - 1);
}

function binarySearchMagic(arr: number[], left: number, right: number): number {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === mid) return mid;

  if (arr[mid] > mid) {
    return binarySearchMagic(arr, left, mid - 1);
  }

  return binarySearchMagic(arr, mid + 1, right);
}

console.log("=== Magic Index ===\n");

const testCases = [
  [-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13],
  [-10, -5, 0, 3, 7],
  [0, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
];

for (const test of testCases) {
  const result = findMagicIndex(test);
  console.log(`Array: [${test.join(", ")}]`);
  if (result !== -1) {
    console.log(
      `  Magic index: ${result} (arr[${result}] = ${test[result]})\n`
    );
  } else {
    console.log(`  No magic index found\n`);
  }
}

console.log("✓ Binary search: O(log n) time for sorted distinct arrays");
