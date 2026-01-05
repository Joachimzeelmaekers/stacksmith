/**
 * Exercise 3: Find Duplicates with O(1) Space
 *
 * Given an array of n integers where each integer is in range [1, n],
 * find all duplicates using O(1) extra space.
 */

function findDuplicates(nums: number[]): number[] {
  const duplicates: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;

    if (nums[index] < 0) {
      duplicates.push(Math.abs(nums[i]));
    } else {
      nums[index] = -nums[index];
    }
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = Math.abs(nums[i]);
  }

  return duplicates;
}

console.log("=== Find Duplicates with O(1) Space ===\n");

const testCases = [
  [4, 3, 2, 7, 8, 2, 3, 1],
  [1, 1, 2],
  [1],
  [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9],
];

for (const test of testCases) {
  const arr = [...test];
  const duplicates = findDuplicates([...test]);
  console.log(`Array: [${arr.join(", ")}]`);
  console.log(`Duplicates: [${duplicates.join(", ")}]\n`);
}

console.log("✓ Time: O(n), Space: O(1) - uses array indices as hash");
console.log("  Trick: Negate values at index = num-1 to mark as seen");

