package main

import (
	"dsa/helpers"
	"fmt"
	"sort"
)

func largestProductOfThree(arr []int) int {
	if len(arr) < 3 {
		return 0
	}

	sort.Ints(arr)

	n := len(arr)

	product1 := arr[n-1] * arr[n-2] * arr[n-3]
	product2 := arr[0] * arr[1] * arr[n-1]

	if product1 > product2 {
		return product1
	}
	return product2
}

func main() {
	fmt.Println("=== Largest Product of Three ===")
	fmt.Println()

	testCases := [][]int{
		{1, 2, 3, 4, 5},
		{-10, -10, 1, 2, 3},
		{-5, -4, -3, -2, -1},
		{1, 2, 3},
		{-1, -2, -3, 4},
	}

	for _, arr := range testCases {
		result := largestProductOfThree(arr)
		fmt.Printf("%s\n", helpers.IntSliceToString(arr))
		fmt.Printf("  Largest product: %d\n\n", result)
	}

	fmt.Println("Key insight:")
	fmt.Println("  - Two negatives × positive can be larger than three positives")
	fmt.Println("  - Always check both possibilities")
	fmt.Println()
	fmt.Println("Time Complexity: O(N log N) for sorting")
}
