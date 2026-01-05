package main

import (
	"dsa/helpers"
	"fmt"
)

func longestConsecutive(nums []int) int {
	numSet := make(map[int]struct{})
	for _, num := range nums {
		numSet[num] = struct{}{}
	}

	maxLength := 0

	for num := range numSet {
		if _, exists := numSet[num-1]; exists {
			continue
		}

		currentNum := num
		currentLength := 1

		for {
			if _, exists := numSet[currentNum+1]; !exists {
				break
			}
			currentNum++
			currentLength++
		}

		if currentLength > maxLength {
			maxLength = currentLength
		}
	}

	return maxLength
}

func main() {
	fmt.Println("=== Longest Consecutive Sequence ===")
	fmt.Println()

	testCases := [][]int{
		{100, 4, 200, 1, 3, 2},
		{0, 3, 7, 2, 5, 8, 4, 6, 0, 1},
		{9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6},
		{},
		{1},
	}

	for _, nums := range testCases {
		result := longestConsecutive(nums)
		fmt.Printf("%s\n", helpers.IntSliceToString(nums))
		fmt.Printf("  Longest consecutive sequence: %d\n\n", result)
	}

	fmt.Println("Key insight:")
	fmt.Println("  - Only start counting from numbers with no predecessor")
	fmt.Println("  - This ensures each sequence is counted only once")
	fmt.Println("  - Each number visited at most twice: O(N)")
}
