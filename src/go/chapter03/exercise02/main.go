package main

import (
	"dsa/helpers/array"
	"fmt"
)

func main() {
	fmt.Println("=== Array Sum - Time Complexity ===")
	fmt.Println()

	fmt.Println("Function:")
	fmt.Println("  func arraySum(arr []int) int {")
	fmt.Println("    sum := 0")
	fmt.Println("    for _, num := range arr {")
	fmt.Println("      sum += num")
	fmt.Println("    }")
	fmt.Println("    return sum")
	fmt.Println("  }")
	fmt.Println()

	fmt.Println("Analysis:")
	fmt.Println("  - Single loop through all N elements")
	fmt.Println("  - Each iteration does O(1) work")
	fmt.Println("  - Total: N iterations × O(1) = O(N)")
	fmt.Println()

	fmt.Println("✓ Time Complexity: O(N)")
	fmt.Println()

	sizes := []int{10, 100, 1000}
	for _, n := range sizes {
		arr := make([]int, n)
		for i := range arr {
			arr[i] = i + 1
		}
		result := array.ArraySum(arr)
		fmt.Printf("  Array of %d elements: sum = %d\n", n, result)
	}
}
