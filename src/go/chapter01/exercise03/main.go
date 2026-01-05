package main

import (
	"dsa/helpers"
	"fmt"
)

func main() {
	fmt.Println("=== Set-Based Array Operations ===")
	fmt.Println()

	testArrays := [][]int{
		{1, 2, 3, 4, 5},
		{1, 2, 3, 2, 5},
		{1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
	}

	fmt.Println("Checking for duplicates:")
	fmt.Println()

	for _, arr := range testArrays {
		result := helpers.HasDuplicateFast(arr)
		fmt.Printf("%v\n", arr)
		fmt.Printf("  Has duplicate: %t\n\n", result)
	}

	fmt.Println("──────────────────────────────────────────────────")
	fmt.Println("Complexity comparison:")
	fmt.Println("  Nested loop (O(n²)): Checks every pair")
	fmt.Println("  Hash set (O(n)):     Single pass with O(1) lookup")
}
