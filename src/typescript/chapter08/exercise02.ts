/**
 * Exercise 2: Longest Consecutive Sequence
 *
 * Given an unsorted array of integers, find the length of the longest
 * consecutive elements sequence in O(N) time.
 */

function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);
  let maxLength = 0;

  for (const num of numSet) {
    // Only start counting if this is the beginning of a sequence
    if (numSet.has(num - 1)) {
      continue;
    }

    let currentNum = num;
    let currentLength = 1;

    while (numSet.has(currentNum + 1)) {
      currentNum++;
      currentLength++;
    }

    maxLength = Math.max(maxLength, currentLength);
  }

  return maxLength;
}

console.log("=== Longest Consecutive Sequence ===\n");

const testCases = [
  [100, 4, 200, 1, 3, 2],
  [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
  [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6],
  [],
  [1],
];

for (const nums of testCases) {
  const result = longestConsecutive(nums);
  console.log(`[${nums.join(", ")}]`);
  console.log(`  Longest consecutive sequence: ${result}\n`);
}

console.log("Key insight:");
console.log("  - Only start counting from numbers with no predecessor");
console.log("  - This ensures each sequence is counted only once");
console.log("  - Each number visited at most twice: O(N)");

