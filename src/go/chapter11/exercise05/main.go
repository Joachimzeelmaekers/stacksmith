package main

import "fmt"

func uniquePaths(rows, cols int) int {
	if rows == 1 || cols == 1 {
		return 1
	}
	return uniquePaths(rows-1, cols) + uniquePaths(rows, cols-1)
}

func main() {
	fmt.Println("=== Unique Paths in Grid ===")
	fmt.Println()

	grids := []struct{ rows, cols int }{
		{2, 2},
		{3, 3},
		{3, 7},
		{4, 4},
		{5, 5},
	}

	for _, g := range grids {
		result := uniquePaths(g.rows, g.cols)
		fmt.Printf("Grid %dx%d:\n", g.rows, g.cols)
		fmt.Printf("  → Unique paths: %d\n\n", result)
	}

	fmt.Println("Note: This naive recursion has exponential time complexity.")
	fmt.Println("Chapter 12 shows how to optimize with dynamic programming.")
}

