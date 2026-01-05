package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println("=== Big O Step Count Table ===")
	fmt.Println()

	fmt.Println("N Elements     O(N)        O(log N)        O(N²)")
	fmt.Println("───────────────────────────────────────────────────────")

	data := []struct {
		n    int
		oN   int
		oN2  int
	}{
		{100, 100, 10000},
		{2000, 2000, 4000000},
	}

	for _, row := range data {
		oLogN := math.Log2(float64(row.n))
		fmt.Printf("%10d     %6d      %8.2f      %10d\n",
			row.n, row.oN, oLogN, row.oN2)
	}

	fmt.Println()
	fmt.Println()
	fmt.Println("How to calculate:")
	fmt.Println("  O(N)     = N")
	fmt.Println("  O(log N) = log₂(N)")
	fmt.Println("  O(N²)    = N × N")
}

