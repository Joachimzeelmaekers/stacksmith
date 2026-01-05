package main

import (
	"fmt"
	"strings"
	"time"
)

func fibonacciConstantSpace(n int) int {
	if n <= 1 {
		return n
	}

	prev2 := 0
	prev1 := 1

	for i := 2; i <= n; i++ {
		current := prev1 + prev2
		prev2 = prev1
		prev1 = current
	}

	return prev1
}

func main() {
	fmt.Println("=== Fibonacci Implementations ===")
	fmt.Println()

	fmt.Println("Fibonacci sequence (first 15 numbers):")
	var sequence []string
	for i := 0; i < 15; i++ {
		sequence = append(sequence, fmt.Sprintf("%d", fibonacciConstantSpace(i)))
	}
	fmt.Printf("  %s\n\n", strings.Join(sequence, ", "))

	fmt.Println("Comparison of approaches:")
	fmt.Println("  Recursive:      O(2^n) time, O(n) space (call stack)")
	fmt.Println("  Memoized:       O(n) time, O(n) space (memo map)")
	fmt.Println("  Constant Space: O(n) time, O(1) space ✓")
	fmt.Println()

	fmt.Println("Testing F(40):")
	start := time.Now()
	result := fibonacciConstantSpace(40)
	elapsed := time.Since(start)
	fmt.Printf("  Result: %d (computed in %v)\n", result, elapsed)
}

