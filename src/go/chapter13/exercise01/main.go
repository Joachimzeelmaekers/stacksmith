package main

import "fmt"

func partitionEvenOdd(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}

	left := 0
	right := len(arr) - 1

	for left < right {
		for left < right && arr[left]%2 == 0 {
			left++
		}
		for left < right && arr[right]%2 != 0 {
			right--
		}
		if left < right {
			arr[left], arr[right] = arr[right], arr[left]
			left++
			right--
		}
	}

	return arr
}

func main() {
	fmt.Println("=== Partition Even/Odd ===")
	fmt.Println()

	testCases := [][]int{
		{1, 2, 3, 4, 5, 6, 7, 8},
		{8, 7, 6, 5, 4, 3, 2, 1},
		{2, 4, 6, 8},
		{1, 3, 5, 7},
		{1},
		{},
	}

	for _, test := range testCases {
		original := make([]int, len(test))
		copy(original, test)

		result := partitionEvenOdd(test)
		fmt.Printf("Original: %v\n", original)
		fmt.Printf("  → Partitioned: %v\n\n", result)
	}
}

