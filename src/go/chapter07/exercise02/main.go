package main

import (
	"dsa/helpers"
	"dsa/helpers/array"
	"fmt"
)

func main() {
	fmt.Println("=== Two Sum ===")
	fmt.Println()

	testCases := []struct {
		nums   []int
		target int
	}{
		{[]int{2, 7, 11, 15}, 9},
		{[]int{3, 2, 4}, 6},
		{[]int{3, 3}, 6},
		{[]int{1, 2, 3, 4, 5}, 10},
	}

	for _, tc := range testCases {
		result := array.TwoSumSlice(tc.nums, tc.target)
		fmt.Printf("nums = %s, target = %d\n", helpers.IntSliceToString(tc.nums), tc.target)
		if len(result) == 2 {
			fmt.Printf("  Indices: [%d, %d]\n", result[0], result[1])
			fmt.Printf("  Values: %d + %d = %d\n\n", tc.nums[result[0]], tc.nums[result[1]], tc.target)
		} else {
			fmt.Println("  No solution found\n")
		}
	}

	fmt.Println("Time Complexity: O(N)")
	fmt.Println("Space Complexity: O(N)")
}
