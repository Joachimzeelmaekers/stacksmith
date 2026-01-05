package main

import (
	"dsa/helpers"
	"fmt"
)

func findFirstDuplicate(arr []int) int {
	seen := make(map[int]struct{})

	for _, num := range arr {
		if _, exists := seen[num]; exists {
			return num
		}
		seen[num] = struct{}{}
	}

	return -1
}

func main() {
	fmt.Println("=== Find First Duplicate ===")
	fmt.Println()

	testCases := [][]int{
		{2, 1, 3, 5, 3, 2},
		{1, 2, 3, 4, 5},
		{5, 5, 5, 5},
		{1, 2, 3, 4, 5, 1},
	}

	for _, arr := range testCases {
		result := findFirstDuplicate(arr)
		resultStr := "None"
		if result != -1 {
			resultStr = fmt.Sprintf("%d", result)
		}
		fmt.Printf("%s\n", helpers.IntSliceToString(arr))
		fmt.Printf("  First duplicate: %s\n\n", resultStr)
	}

	fmt.Println("Time Complexity: O(N) - single pass")
	fmt.Println("Space Complexity: O(N) - hash set")
}
