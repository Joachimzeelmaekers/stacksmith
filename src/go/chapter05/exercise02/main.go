package main

import "fmt"

func main() {
	fmt.Println("=== Analyzing Code Complexity ===")
	fmt.Println()

	fmt.Println("Pattern 1: Two separate loops")
	fmt.Println("  for num := range arr { sum += num }     // O(N)")
	fmt.Println("  for num := range arr { sum += num * 2 } // O(N)")
	fmt.Println("  → O(N) + O(N) = O(2N) = O(N)")
	fmt.Println()

	fmt.Println("Pattern 2: Nested loops with different arrays")
	fmt.Println("  for a := range arr1 {        // N iterations")
	fmt.Println("    for b := range arr2 { }    // M iterations each")
	fmt.Println("  }")
	fmt.Println("  → O(N × M) - NOT O(N²) unless N = M")
	fmt.Println()

	fmt.Println("Pattern 3: Loop that halves")
	fmt.Println("  for n > 1 { n = n / 2 }")
	fmt.Println("  → O(log N)")
	fmt.Println()

	fmt.Println("Demonstration:")
	for _, n := range []int{16, 64, 256, 1024} {
		count := 0
		temp := n
		for temp > 1 {
			temp = temp / 2
			count++
		}
		fmt.Printf("  n=%d: %d iterations\n", n, count)
	}
}

