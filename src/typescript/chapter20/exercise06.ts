/**
 * Exercise 6: Longest Increasing Subsequence
 *
 * Find the length of the longest increasing subsequence in an array.
 */

function longestIncreasingSubsequence(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }

  const tails: number[] = [];

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }

  return tails.length;
}

function lisWithSequence(nums: number[]): {
  length: number;
  sequence: number[];
} {
  if (nums.length === 0) return { length: 0, sequence: [] };

  const n = nums.length;
  const dp = new Array(n).fill(1);
  const parent = new Array(n).fill(-1);

  let maxLen = 1;
  let maxIdx = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        parent[i] = j;
      }
    }
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      maxIdx = i;
    }
  }

  const sequence: number[] = [];
  let idx = maxIdx;
  while (idx !== -1) {
    sequence.unshift(nums[idx]);
    idx = parent[idx];
  }

  return { length: maxLen, sequence };
}

console.log("=== Longest Increasing Subsequence ===\n");

const testCases = [
  [10, 9, 2, 5, 3, 7, 101, 18],
  [0, 1, 0, 3, 2, 3],
  [7, 7, 7, 7, 7, 7, 7],
  [4, 10, 4, 3, 8, 9],
];

for (const test of testCases) {
  const result = lisWithSequence(test);
  console.log(`Array: [${test.join(", ")}]`);
  console.log(`  LIS length: ${result.length}`);
  console.log(`  Sequence: [${result.sequence.join(", ")}]\n`);
}

console.log("✓ DP approach: O(n²) time, O(n) space");
console.log("  Binary search optimization: O(n log n) time");
