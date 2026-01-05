/**
 * Exercise 2: Two Sum
 *
 * Given an array of integers and a target sum, find two numbers that add up to the target.
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
  console.log(`nums = [${nums.join(", ")}], target = ${target}`);
  if (result.length === 2) {
    console.log(`  Indices: [${result[0]}, ${result[1]}]`);
    console.log(
      `  Values: ${nums[result[0]]} + ${nums[result[1]]} = ${target}\n`
    );
  } else {
    console.log(`  No solution found\n`);
  }
}

console.log("Time Complexity: O(N)");
console.log("Space Complexity: O(N)");
