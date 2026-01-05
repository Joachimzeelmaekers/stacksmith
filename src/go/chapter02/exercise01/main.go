package main

import (
	"dsa/helpers/search"
	"fmt"
)

func main() {
	fmt.Println("=== Linear Search Step Count ===")
	fmt.Println()

	arr := []int{2, 4, 6, 8, 10, 12, 13}
	target := 8

	fmt.Printf("Array: %v\n", arr)
	fmt.Printf("Target: %d\n\n", target)

	fmt.Println("Searching...")
	index, steps := search.LinearSearch(arr, target, true)

	fmt.Printf("\nFound at index %d in %d steps\n", index, steps)
	fmt.Println()
	fmt.Println("✓ Answer: 4 steps")
}
