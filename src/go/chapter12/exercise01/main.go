package main

import (
	"fmt"
	"strings"
)

func golomb(n int, memo map[int]int) int {
	if n == 1 {
		return 1
	}
	if val, ok := memo[n]; ok {
		return val
	}

	result := 1 + golomb(n-golomb(golomb(n-1, memo), memo), memo)
	memo[n] = result
	return result
}

func main() {
	fmt.Println("=== Golomb Sequence ===")
	fmt.Println()

	memo := make(map[int]int)

	fmt.Println("First 20 numbers in the Golomb sequence:")
	sequence := make([]string, 20)
	for i := 1; i <= 20; i++ {
		sequence[i-1] = fmt.Sprintf("%d", golomb(i, memo))
	}
	fmt.Printf("  %s\n\n", strings.Join(sequence, ", "))

	fmt.Println("Individual values:")
	for i := 1; i <= 10; i++ {
		fmt.Printf("  G(%d) = %d\n", i, golomb(i, memo))
	}
}

