package main

import "fmt"

func findMissingNumber(arr []int) int {
	n := len(arr)
	expectedSum := (n * (n + 1)) / 2

	actualSum := 0
	for _, num := range arr {
		actualSum += num
	}

	return expectedSum - actualSum
}

func findMissingNumberXOR(arr []int) int {
	n := len(arr)
	xor := 0

	for i := 0; i <= n; i++ {
		xor ^= i
	}

	for _, num := range arr {
		xor ^= num
	}

	return xor
}

func main() {
	fmt.Println("=== Find Missing Number ===")
	fmt.Println()

	testCases := [][]int{
		{3, 0, 1},
		{0, 1},
		{9, 6, 4, 2, 3, 5, 7, 0, 1},
		{0},
		{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 12, 13, 14, 15},
	}

	for _, test := range testCases {
		result1 := findMissingNumber(test)
		result2 := findMissingNumberXOR(test)
		fmt.Printf("Array (length %d): %v\n", len(test), test)
		fmt.Printf("  → Missing (sum method): %d\n", result1)
		fmt.Printf("  → Missing (XOR method): %d\n\n", result2)
	}

	fmt.Println("Both methods: O(n) time, O(1) space")
}

