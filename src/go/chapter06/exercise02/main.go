package main

import (
	"dsa/helpers/search"
	"fmt"
)

func main() {
	fmt.Println("=== Best, Worst, Average Case ===")
	fmt.Println()

	arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	fmt.Printf("Array: %v\n\n", arr)

	_, best := search.LinearSearch(arr, 1, true)
	fmt.Println("Best case (target = 1, at start):")
	fmt.Printf("  Steps: %d → O(1)\n\n", best)

	_, worst := search.LinearSearch(arr, 99, true)
	fmt.Println("Worst case (target = 99, not found):")
	fmt.Printf("  Steps: %d → O(N)\n\n", worst)

	_, average := search.LinearSearch(arr, 5, true)
	fmt.Println("Average case (target = 5, in middle):")
	fmt.Printf("  Steps: %d → O(N/2) = O(N)\n\n", average)

	fmt.Println("──────────────────────────────────────────────────")
	fmt.Println("Key insight:")
	fmt.Println("  - Big O typically refers to WORST case")
	fmt.Println("  - But best/average cases matter for algorithm choice")
	fmt.Println("  - Insertion sort: O(N²) worst, but O(N) best")
	fmt.Println("  - This makes it ideal for nearly-sorted data")
}
