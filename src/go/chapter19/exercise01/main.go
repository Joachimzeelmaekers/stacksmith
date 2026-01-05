package main

import (
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
		i, j, found := array.TwoSum(tc.nums, tc.target)
		fmt.Printf("Array: %v, Target: %d\n", tc.nums, tc.target)
		if found {
			fmt.Printf("  Indices: [%d, %d]\n", i, j)
			fmt.Printf("  Values: %d + %d = %d\n", tc.nums[i], tc.nums[j], tc.target)
		} else {
			fmt.Println("  No solution found")
		}
		fmt.Println()
	}

	fmt.Println("✓ Time: O(n), Space: O(n) - hash map stores seen values")
}
