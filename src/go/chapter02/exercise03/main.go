package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println("=== Linear vs Binary Search Comparison ===")
	fmt.Println()

	fmt.Println("Array Size   Linear Search   Binary Search   Speedup")
	fmt.Println("───────────────────────────────────────────────────────")

	sizes := []int{10, 100, 1000, 10000, 100000, 1000000}

	for _, n := range sizes {
		linear := n
		binary := int(math.Ceil(math.Log2(float64(n + 1))))
		speedup := linear / binary

		fmt.Printf("%9d   %13d   %13d   %dx\n", n, linear, binary, speedup)
	}

	fmt.Println()
	fmt.Println("✓ Binary search is exponentially faster as data grows")
	fmt.Println("  But requires sorted data!")
}

