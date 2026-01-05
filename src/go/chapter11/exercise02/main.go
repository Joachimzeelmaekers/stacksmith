package main

import (
	"dsa/helpers/array"
	"fmt"
)

func main() {
	fmt.Println("=== Array Sum ===")
	fmt.Println()

	testCases := [][]int{
		{1, 2, 3, 4, 5},
		{10, 20, 30},
		{1},
		{},
		{-5, 5, -10, 10},
		{100, 200, 300, 400, 500},
	}

	for _, test := range testCases {
		result := array.ArraySum(test)
		fmt.Printf("%v\n", test)
		fmt.Printf("  → Sum: %d\n\n", result)
	}
}
