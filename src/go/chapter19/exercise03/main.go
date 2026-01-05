package main

import (
	"dsa/helpers"
	"fmt"
)

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func findDuplicates(nums []int) []int {
	var duplicates []int

	for i := 0; i < len(nums); i++ {
		index := abs(nums[i]) - 1

		if nums[index] < 0 {
			duplicates = append(duplicates, abs(nums[i]))
		} else {
			nums[index] = -nums[index]
		}
	}

	for i := 0; i < len(nums); i++ {
		nums[i] = abs(nums[i])
	}

	return duplicates
}

func main() {
	fmt.Println("=== Find Duplicates with O(1) Space ===")
	fmt.Println()

	testCases := [][]int{
		{4, 3, 2, 7, 8, 2, 3, 1},
		{1, 1, 2},
		{1},
		{1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9},
	}

	for _, test := range testCases {
		arr := make([]int, len(test))
		copy(arr, test)

		duplicates := findDuplicates(test)
		fmt.Printf("Array: %s\n", helpers.IntSliceToString(arr))
		fmt.Printf("Duplicates: %s\n\n", helpers.IntSliceToString(duplicates))
	}

	fmt.Println("✓ Time: O(n), Space: O(1) - uses array indices as hash")
	fmt.Println("  Trick: Negate values at index = num-1 to mark as seen")
}
