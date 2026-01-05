/**
 * Exercise 2: Product of All Other Elements
 *
 * Given an array of integers, return an array where each element is the
 * product of all other elements (without using division).
 */

function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

console.log("=== Product of All Other Elements ===\n");

const testCases = [
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [-1, 1, 0, -3, 3],
];

for (const test of testCases) {
  const result = productExceptSelf(test);
  console.log(`Input:  [${test.join(", ")}]`);
  console.log(`Output: [${result.join(", ")}]\n`);
}

console.log("✓ Time: O(n), Space: O(1) (excluding output array)");
console.log("  Use left and right running products");
