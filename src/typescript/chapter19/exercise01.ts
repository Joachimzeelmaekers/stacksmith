/**
 * Exercise 1: Two Sum with O(n) Space
 *
 * Given an array of integers and a target sum, find two numbers that add up
 * to the target. Use a hash map for O(n) time and O(n) space.
 */

import { twoSum } from "../helpers/array/two-sum";

console.log("=== Two Sum ===\n");

const testCases = [
  { nums: [2, 7, 11, 15], target: 9 },
  { nums: [3, 2, 4], target: 6 },
  { nums: [3, 3], target: 6 },
  { nums: [1, 2, 3, 4, 5], target: 10 },
];

for (const { nums, target } of testCases) {
  const result = twoSum(nums, target);
  console.log(`Array: [${nums.join(", ")}], Target: ${target}`);
  if (result) {
    console.log(`  Indices: [${result[0]}, ${result[1]}]`);
    console.log(
      `  Values: ${nums[result[0]]} + ${nums[result[1]]} = ${target}`
    );
  } else {
    console.log(`  No solution found`);
  }
  console.log();
}

console.log("✓ Time: O(n), Space: O(n) - hash map stores seen values");
