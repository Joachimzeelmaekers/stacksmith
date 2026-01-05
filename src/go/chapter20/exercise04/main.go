package main

import (
	"dsa/helpers"
	"fmt"
)

type SubarrayResult struct {
	sum   int
	start int
	end   int
}

func maxSubarraySum(nums []int) SubarrayResult {
	if len(nums) == 0 {
		return SubarrayResult{sum: 0, start: -1, end: -1}
	}

	maxSum := nums[0]
	currentSum := nums[0]
	start := 0
	end := 0
	tempStart := 0

	for i := 1; i < len(nums); i++ {
		if nums[i] > currentSum+nums[i] {
			currentSum = nums[i]
			tempStart = i
		} else {
			currentSum = currentSum + nums[i]
		}

		if currentSum > maxSum {
			maxSum = currentSum
			start = tempStart
			end = i
		}
	}

	return SubarrayResult{sum: maxSum, start: start, end: end}
}

func main() {
	fmt.Println("=== Greatest Subsequence Sum (Kadane's Algorithm) ===")
	fmt.Println()

	testCases := [][]int{
		{-2, 1, -3, 4, -1, 2, 1, -5, 4},
		{1},
		{5, 4, -1, 7, 8},
		{-1, -2, -3, -4},
	}

	for _, test := range testCases {
		result := maxSubarraySum(test)
		fmt.Printf("Array: %s\n", helpers.IntSliceToString(test))
		fmt.Printf("  Max sum: %d\n", result.sum)
		if result.start >= 0 {
			subarray := test[result.start : result.end+1]
			fmt.Printf("  Subarray: %s (indices %d to %d)\n", helpers.IntSliceToString(subarray), result.start, result.end)
		}
		fmt.Println()
	}

	fmt.Println("✓ Kadane's Algorithm: O(n) time, O(1) space")
}
