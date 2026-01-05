package main

import (
	"dsa/helpers"
	"fmt"
)

type LISResult struct {
	length   int
	sequence []int
}

func longestIncreasingSubsequence(nums []int) LISResult {
	if len(nums) == 0 {
		return LISResult{length: 0, sequence: nil}
	}

	n := len(nums)
	dp := make([]int, n)
	parent := make([]int, n)

	for i := range dp {
		dp[i] = 1
		parent[i] = -1
	}

	maxLen := 1
	maxIdx := 0

	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if nums[j] < nums[i] && dp[j]+1 > dp[i] {
				dp[i] = dp[j] + 1
				parent[i] = j
			}
		}
		if dp[i] > maxLen {
			maxLen = dp[i]
			maxIdx = i
		}
	}

	var sequence []int
	idx := maxIdx
	for idx != -1 {
		sequence = append([]int{nums[idx]}, sequence...)
		idx = parent[idx]
	}

	return LISResult{length: maxLen, sequence: sequence}
}

func main() {
	fmt.Println("=== Longest Increasing Subsequence ===")
	fmt.Println()

	testCases := [][]int{
		{10, 9, 2, 5, 3, 7, 101, 18},
		{0, 1, 0, 3, 2, 3},
		{7, 7, 7, 7, 7, 7, 7},
		{4, 10, 4, 3, 8, 9},
	}

	for _, test := range testCases {
		result := longestIncreasingSubsequence(test)
		fmt.Printf("Array: %s\n", helpers.IntSliceToString(test))
		fmt.Printf("  LIS length: %d\n", result.length)
		fmt.Printf("  Sequence: %s\n\n", helpers.IntSliceToString(result.sequence))
	}

	fmt.Println("✓ DP approach: O(n²) time, O(n) space")
	fmt.Println("  Binary search optimization: O(n log n) time")
}
