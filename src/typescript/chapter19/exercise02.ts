/**
 * Exercise 2: Reverse Array In-Place
 *
 * Reverse an array using O(1) extra space.
 */

function reverseInPlace<T>(arr: T[]): T[] {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr;
}

console.log("=== Reverse Array In-Place ===\n");

const testCases = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5, 6],
  ["a", "b", "c", "d"],
  [1],
  [],
];

for (const test of testCases) {
  const original = [...test];
  const reversed = reverseInPlace([...test]);
  console.log(`Original: [${original.join(", ")}]`);
  console.log(`Reversed: [${reversed.join(", ")}]\n`);
}

console.log("✓ Time: O(n), Space: O(1) - swap in place with two pointers");

