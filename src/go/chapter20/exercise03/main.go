package main

import (
	"dsa/helpers"
	"fmt"
)

func maxProfit(prices []int) int {
	if len(prices) < 2 {
		return 0
	}

	minPrice := prices[0]
	maxProfit := 0

	for i := 1; i < len(prices); i++ {
		profit := prices[i] - minPrice
		if profit > maxProfit {
			maxProfit = profit
		}
		if prices[i] < minPrice {
			minPrice = prices[i]
		}
	}

	return maxProfit
}

func main() {
	fmt.Println("=== Greatest Single Sale Profit ===")
	fmt.Println()

	testCases := []struct {
		prices   []int
		expected int
	}{
		{[]int{7, 1, 5, 3, 6, 4}, 5},
		{[]int{7, 6, 4, 3, 1}, 0},
		{[]int{2, 4, 1}, 2},
		{[]int{10, 7, 5, 8, 11, 9}, 6},
	}

	for _, tc := range testCases {
		result := maxProfit(tc.prices)
		fmt.Printf("Prices: %s\n", helpers.IntSliceToString(tc.prices))
		fmt.Printf("  Max profit: %d (expected: %d)\n\n", result, tc.expected)
	}

	fmt.Println("✓ Time: O(n), Space: O(1)")
	fmt.Println("  Track minimum price seen and maximum profit")
}
