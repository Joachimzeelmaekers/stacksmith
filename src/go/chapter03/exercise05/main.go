package main

import "fmt"

func main() {
	fmt.Println("=== Identify Big O Patterns ===")
	fmt.Println()

	patterns := []struct {
		name       string
		code       string
		complexity string
		reason     string
	}{
		{"Array access by index", "arr[5]", "O(1)", "Direct memory access"},
		{"Simple loop", "for i := 0; i < n; i++ { ... }", "O(N)", "Visits each element once"},
		{"Nested loops", "for i..n { for j..n { ... } }", "O(N²)", "N × N iterations"},
		{"Binary search", "for left <= right { mid = (left+right)/2 }", "O(log N)", "Halves search space each step"},
		{"Hash table lookup", "m[key]", "O(1)", "Direct hash computation"},
		{"Sorting (efficient)", "sort.Ints(arr)", "O(N log N)", "Divide and conquer"},
		{"Triple nested loops", "for i..n { for j..n { for k..n { } } }", "O(N³)", "N × N × N iterations"},
	}

	for _, p := range patterns {
		fmt.Println(p.name)
		fmt.Printf("  Code: %s\n", p.code)
		fmt.Printf("  Complexity: %s\n", p.complexity)
		fmt.Printf("  Reason: %s\n\n", p.reason)
	}
}

