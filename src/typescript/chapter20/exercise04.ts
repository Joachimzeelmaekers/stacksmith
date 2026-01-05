/**
 * Exercise 4: Greatest Subsequence Sum (Kadane's Algorithm)
 *
 * Find the contiguous subarray with the largest sum.
 */

export function maxSubarraySum(input: number[]): {
  sum: number;
  start: number;
  end: number;
} {
  if (input.length === 0) {
    return { sum: 0, start: -1, end: -1 };
  }

  let bestSum = input[0];
  let bestStartIndex = 0;
  let bestEndIndex = 0;

  let runningSum = input[0];
  let runningStartIndex = 0;

  for (let currentIndex = 1; currentIndex < input.length; currentIndex++) {
    const currentValue = input[currentIndex];

    // Decide whether to extend the current subarray or start a new one
    if (runningSum + currentValue < currentValue) {
      runningSum = currentValue;
      runningStartIndex = currentIndex;
    } else {
      runningSum += currentValue;
    }

    // Update best result found so far
    if (runningSum > bestSum) {
      bestSum = runningSum;
      bestStartIndex = runningStartIndex;
      bestEndIndex = currentIndex;
    }
  }

  return {
    sum: bestSum,
    start: bestStartIndex,
    end: bestEndIndex,
  };
}

console.log("=== Greatest Subsequence Sum (Kadane's Algorithm) ===\n");

const testCases = [
  [-2, 1, -3, 4, -1, 2, 1, -5, 4],
  [1],
  [5, 4, -1, 7, 8],
  [-1, -2, -3, -4],
];

for (const test of testCases) {
  const result = maxSubarraySum(test);
  console.log(`Array: [${test.join(", ")}]`);
  console.log(`  Max sum: ${result.sum}`);
  if (result.start >= 0) {
    console.log(
      `  Subarray: [${test
        .slice(result.start, result.end + 1)
        .join(", ")}] (indices ${result.start} to ${result.end})`
    );
  }
  console.log();
}

console.log("✓ Kadane's Algorithm: O(n) time, O(1) space");
