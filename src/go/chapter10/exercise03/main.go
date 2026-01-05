package main

import (
	"fmt"
	"strings"
)

func triangularNumber(n int) int {
	if n == 1 {
		return 1
	}
	return n + triangularNumber(n-1)
}

func main() {
	fmt.Println("=== Triangular Numbers ===")
	fmt.Println()
	fmt.Println("Triangular number sequence:")
	fmt.Println("  T(n) = 1 + 2 + 3 + ... + n")
	fmt.Println()

	for n := 1; n <= 10; n++ {
		result := triangularNumber(n)

		parts := make([]string, n)
		for i := 0; i < n; i++ {
			parts[i] = fmt.Sprintf("%d", i+1)
		}
		sum := strings.Join(parts, " + ")

		fmt.Printf("  T(%d) = %s = %d\n", n, sum, result)
	}

	fmt.Println()
	fmt.Println("✓ Each triangular number adds N to the previous result")
}

