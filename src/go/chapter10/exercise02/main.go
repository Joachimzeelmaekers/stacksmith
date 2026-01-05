package main

import "fmt"

func findEvenNumbers(arr []int) []int {
	if len(arr) == 0 {
		return []int{}
	}

	rest := findEvenNumbers(arr[1:])

	if arr[0]%2 == 0 {
		return append([]int{arr[0]}, rest...)
	}

	return rest
}

func main() {
	fmt.Println("=== Find Even Numbers ===")
	fmt.Println()

	testCases := [][]int{
		{1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
		{1, 3, 5, 7, 9},
		{2, 4, 6, 8},
		{},
		{0, -2, -3, 4, -5, 6},
	}

	for _, test := range testCases {
		result := findEvenNumbers(test)
		fmt.Printf("%v\n", test)
		fmt.Printf("  → Even numbers: %v\n\n", result)
	}
}

