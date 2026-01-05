package main

import (
	"dsa/helpers"
	"fmt"
	"time"
)

func main() {
	fmt.Println("=== Finding Duplicates - O(N²) vs O(N) ===")
	fmt.Println()

	fmt.Println("Testing correctness:")
	tests := [][]int{
		{1, 2, 3, 4, 5},
		{1, 2, 3, 2, 5},
		{1, 1},
	}

	for _, arr := range tests {
		fmt.Printf("  %v: slow=%t, fast=%t\n", arr, helpers.HasDuplicateSlow(arr), helpers.HasDuplicateFast(arr))
	}

	fmt.Println()
	fmt.Println("Performance comparison:")
	fmt.Println("Size       O(N²)        O(N)")
	fmt.Println("───────────────────────────────────")

	for _, size := range []int{1000, 5000, 10000, 20000} {
		arr := make([]int, size)
		for i := range arr {
			arr[i] = i
		}

		start := time.Now()
		helpers.HasDuplicateSlow(arr)
		slow := time.Since(start)

		start = time.Now()
		helpers.HasDuplicateFast(arr)
		fast := time.Since(start)

		fmt.Printf("%6d   %10v   %10v\n", size, slow, fast)
	}

	fmt.Println()
	fmt.Println("✓ Hash set trades space for time: O(N) space, O(N) time")
}
