package main

import (
	"dsa/helpers"
	"fmt"
)

func productExceptSelf(nums []int) []int {
	n := len(nums)
	result := make([]int, n)
	for i := range result {
		result[i] = 1
	}

	leftProduct := 1
	for i := 0; i < n; i++ {
		result[i] = leftProduct
		leftProduct *= nums[i]
	}

	rightProduct := 1
	for i := n - 1; i >= 0; i-- {
		result[i] *= rightProduct
		rightProduct *= nums[i]
	}

	return result
}

func main() {
	fmt.Println("=== Product of All Other Elements ===")
	fmt.Println()

	testCases := [][]int{
		{1, 2, 3, 4},
		{2, 3, 4, 5},
		{1, 2, 3, 4, 5},
		{-1, 1, 0, -3, 3},
	}

	for _, test := range testCases {
		result := productExceptSelf(test)
		fmt.Printf("Input:  %s\n", helpers.IntSliceToString(test))
		fmt.Printf("Output: %s\n\n", helpers.IntSliceToString(result))
	}

	fmt.Println("✓ Time: O(n), Space: O(1) (excluding output array)")
	fmt.Println("  Use left and right running products")
}
