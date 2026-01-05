package main

import (
	"dsa/helpers"
	"fmt"
)

func findMagicIndex(arr []int) int {
	return binarySearchMagic(arr, 0, len(arr)-1)
}

func binarySearchMagic(arr []int, left, right int) int {
	if left > right {
		return -1
	}

	mid := (left + right) / 2

	if arr[mid] == mid {
		return mid
	}

	if arr[mid] > mid {
		return binarySearchMagic(arr, left, mid-1)
	}

	return binarySearchMagic(arr, mid+1, right)
}

func main() {
	fmt.Println("=== Magic Index ===")
	fmt.Println()

	testCases := [][]int{
		{-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13},
		{-10, -5, 0, 3, 7},
		{0, 2, 3, 4, 5},
		{1, 2, 3, 4, 5},
	}

	for _, test := range testCases {
		result := findMagicIndex(test)
		fmt.Printf("Array: %s\n", helpers.IntSliceToString(test))
		if result != -1 {
			fmt.Printf("  Magic index: %d (arr[%d] = %d)\n\n", result, result, test[result])
		} else {
			fmt.Println("  No magic index found")
			fmt.Println()
		}
	}

	fmt.Println("✓ Binary search: O(log n) time for sorted distinct arrays")
}
