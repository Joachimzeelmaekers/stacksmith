package main

import (
	"dsa/helpers"
	"fmt"
	"math"
)

type CoinResult struct {
	count     int
	usedCoins []int
}

func coinChange(coins []int, amount int) CoinResult {
	dp := make([]int, amount+1)
	usedCoin := make([]int, amount+1)

	for i := range dp {
		dp[i] = math.MaxInt32
		usedCoin[i] = -1
	}
	dp[0] = 0

	for i := 1; i <= amount; i++ {
		for _, coin := range coins {
			if coin <= i && dp[i-coin] != math.MaxInt32 && dp[i-coin]+1 < dp[i] {
				dp[i] = dp[i-coin] + 1
				usedCoin[i] = coin
			}
		}
	}

	if dp[amount] == math.MaxInt32 {
		return CoinResult{count: -1, usedCoins: nil}
	}

	var result []int
	remaining := amount
	for remaining > 0 {
		result = append(result, usedCoin[remaining])
		remaining -= usedCoin[remaining]
	}

	return CoinResult{count: dp[amount], usedCoins: result}
}

func main() {
	fmt.Println("=== Coin Change - Minimum Coins ===")
	fmt.Println()

	testCases := []struct {
		coins  []int
		amount int
	}{
		{[]int{1, 2, 5}, 11},
		{[]int{2}, 3},
		{[]int{1}, 0},
		{[]int{1, 5, 10, 25}, 67},
	}

	for _, tc := range testCases {
		result := coinChange(tc.coins, tc.amount)
		fmt.Printf("Coins: %s, Amount: %d\n", helpers.IntSliceToString(tc.coins), tc.amount)
		if result.count >= 0 {
			fmt.Printf("  Minimum coins: %d\n", result.count)
			fmt.Printf("  Coins used: %s\n\n", helpers.IntSliceToString(result.usedCoins))
		} else {
			fmt.Println("  Not possible to make this amount")
			fmt.Println()
		}
	}

	fmt.Println("✓ Dynamic Programming: O(amount * coins) time, O(amount) space")
}
