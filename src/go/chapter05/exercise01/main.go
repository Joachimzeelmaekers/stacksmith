package main

import "fmt"

func main() {
	fmt.Println("=== Simplifying Big O Expressions ===")
	fmt.Println()

	expressions := []struct {
		expr       string
		simplified string
		reason     string
	}{
		{"4N + 16", "O(N)", "Drop constants and coefficients"},
		{"2N²", "O(N²)", "Drop coefficient"},
		{"N² + N", "O(N²)", "Drop lower order terms"},
		{"100", "O(1)", "Constant becomes O(1)"},
		{"N/2", "O(N)", "N/2 is still linear"},
		{"N + log N", "O(N)", "N dominates log N"},
		{"N × log N", "O(N log N)", "Cannot simplify further"},
	}

	fmt.Println("Expression       Simplified   Reason")
	fmt.Println("────────────────────────────────────────────────────────────")

	for _, e := range expressions {
		fmt.Printf("%-16s %-12s %s\n", e.expr, e.simplified, e.reason)
	}

	fmt.Println()
	fmt.Println()
	fmt.Println("Rules for simplifying Big O:")
	fmt.Println("  1. Drop constants: O(2N) → O(N)")
	fmt.Println("  2. Drop coefficients: O(5N²) → O(N²)")
	fmt.Println("  3. Drop lower order terms: O(N² + N) → O(N²)")
	fmt.Println("  4. Keep only the dominant term")
}

