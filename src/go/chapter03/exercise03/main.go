package main

import "fmt"

func printPairs(arr []int) int {
	comparisons := 0
	for i := 0; i < len(arr); i++ {
		for j := 0; j < len(arr); j++ {
			comparisons++
		}
	}
	return comparisons
}

func main() {
	fmt.Println("=== Nested Loops - Time Complexity ===")
	fmt.Println()

	fmt.Println("Function:")
	fmt.Println("  for i := 0; i < len(arr); i++ {")
	fmt.Println("    for j := 0; j < len(arr); j++ {")
	fmt.Println("      // O(1) work")
	fmt.Println("    }")
	fmt.Println("  }")
	fmt.Println()

	fmt.Println("Analysis:")
	fmt.Println("  - Outer loop: N iterations")
	fmt.Println("  - Inner loop: N iterations for each outer")
	fmt.Println("  - Total: N × N = N²")
	fmt.Println()

	fmt.Println("✓ Time Complexity: O(N²)")
	fmt.Println()

	fmt.Println("Demonstration:")
	for _, size := range []int{5, 10, 20, 50} {
		arr := make([]int, size)
		comparisons := printPairs(arr)
		fmt.Printf("  Array size: %d, Comparisons: %d\n", size, comparisons)
	}

	fmt.Println()
	fmt.Println("Notice: Doubling N quadruples the work!")
}

