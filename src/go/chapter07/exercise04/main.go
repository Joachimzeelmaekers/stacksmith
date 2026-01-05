package main

import (
	"dsa/helpers"
	"fmt"
)

func missingNumberSum(arr []int) int {
	n := len(arr) + 1
	expectedSum := (n * (n + 1)) / 2

	actualSum := 0
	for _, num := range arr {
		actualSum += num
	}

	return expectedSum - actualSum
}

func missingNumberXOR(arr []int) int {
	n := len(arr) + 1
	xor := 0

	for i := 1; i <= n; i++ {
		xor ^= i
	}

	for _, num := range arr {
		xor ^= num
	}

	return xor
}

func missingNumberSet(arr []int) int {
	n := len(arr) + 1
	set := make(map[int]struct{})
	for _, num := range arr {
		set[num] = struct{}{}
	}

	for i := 1; i <= n; i++ {
		if _, exists := set[i]; !exists {
			return i
		}
	}

	return -1
}

func main() {
	fmt.Println("=== Missing Number ===")
	fmt.Println()

	testCases := [][]int{
		{1, 2, 4, 5, 6},
		{3, 7, 1, 2, 8, 4, 5},
		{1, 2, 3, 4, 5, 6, 7, 8, 10},
	}

	for _, arr := range testCases {
		sum := missingNumberSum(arr)
		xor := missingNumberXOR(arr)
		set := missingNumberSet(arr)

		fmt.Printf("%s\n", helpers.IntSliceToString(arr))
		fmt.Printf("  Sum method: %d\n", sum)
		fmt.Printf("  XOR method: %d\n", xor)
		fmt.Printf("  Set method: %d\n\n", set)
	}

	fmt.Println("Comparison:")
	fmt.Println("  Sum: O(N) time, O(1) space - may overflow for large numbers")
	fmt.Println("  XOR: O(N) time, O(1) space - no overflow ✓")
	fmt.Println("  Set: O(N) time, O(N) space - simple but uses more memory")
}
