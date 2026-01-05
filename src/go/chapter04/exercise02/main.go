package main

import (
	"dsa/helpers"
	"dsa/helpers/sorts"
	"fmt"
)

func main() {
	fmt.Println("=== Bubble Sort Analysis ===")
	fmt.Println()

	testArrays := [][]int{
		{5, 4, 3, 2, 1},
		{1, 2, 3, 4, 5},
		{3, 1, 4, 1, 5, 9, 2, 6},
	}

	for _, arr := range testArrays {
		fmt.Printf("Input:  %s\n", helpers.IntSliceToString(arr))
		sorted, comparisons, swaps := sorts.BubbleSort(arr)
		fmt.Printf("Output: %s\n", helpers.IntSliceToString(sorted))
		fmt.Printf("  Comparisons: %d, Swaps: %d\n\n", comparisons, swaps)
	}

	fmt.Println("Time Complexity:")
	fmt.Println("  Worst case: O(N²) - reverse sorted")
	fmt.Println("  Best case:  O(N) - already sorted")
	fmt.Println("  Average:    O(N²)")
}
