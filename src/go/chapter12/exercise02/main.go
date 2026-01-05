package main

import (
	"fmt"
	"time"
)

func uniquePaths(rows, cols int, memo map[string]int) int {
	if rows == 1 || cols == 1 {
		return 1
	}

	key := fmt.Sprintf("%d,%d", rows, cols)
	if val, ok := memo[key]; ok {
		return val
	}

	result := uniquePaths(rows-1, cols, memo) + uniquePaths(rows, cols-1, memo)
	memo[key] = result
	return result
}

func main() {
	fmt.Println("=== Unique Paths with Memoization ===")
	fmt.Println()

	grids := []struct{ rows, cols int }{
		{2, 2},
		{3, 3},
		{3, 7},
		{10, 10},
		{15, 15},
		{20, 20},
	}

	for _, g := range grids {
		memo := make(map[string]int)
		start := time.Now()
		result := uniquePaths(g.rows, g.cols, memo)
		elapsed := time.Since(start)

		fmt.Printf("Grid %dx%d:\n", g.rows, g.cols)
		fmt.Printf("  → Unique paths: %d (%v)\n\n", result, elapsed)
	}

	fmt.Println("✓ Memoization makes this efficient even for large grids!")
}

