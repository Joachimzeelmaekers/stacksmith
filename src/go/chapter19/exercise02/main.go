package main

import (
	"dsa/helpers"
	"fmt"
)

func reverseInPlace(arr []int) []int {
	left := 0
	right := len(arr) - 1

	for left < right {
		arr[left], arr[right] = arr[right], arr[left]
		left++
		right--
	}

	return arr
}

func main() {
	fmt.Println("=== Reverse Array In-Place ===")
	fmt.Println()

	testCases := [][]int{
		{1, 2, 3, 4, 5},
		{1, 2, 3, 4, 5, 6},
		{1},
		{},
	}

	for _, test := range testCases {
		original := make([]int, len(test))
		copy(original, test)

		reversed := reverseInPlace(test)
		fmt.Printf("Original: %s\n", helpers.IntSliceToString(original))
		fmt.Printf("Reversed: %s\n\n", helpers.IntSliceToString(reversed))
	}

	fmt.Println("✓ Time: O(n), Space: O(1) - swap in place with two pointers")
}
