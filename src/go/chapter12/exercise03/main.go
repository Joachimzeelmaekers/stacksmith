package main

import "fmt"

func climbingStairs(n int) int {
	if n < 0 {
		return 0
	}
	if n == 0 {
		return 1
	}
	if n == 1 {
		return 1
	}
	if n == 2 {
		return 2
	}

	dp := make([]int, n+1)
	dp[0] = 1
	dp[1] = 1
	dp[2] = 2

	for i := 3; i <= n; i++ {
		dp[i] = dp[i-1] + dp[i-2] + dp[i-3]
	}

	return dp[n]
}

func main() {
	fmt.Println("=== Climbing Stairs (1, 2, or 3 steps) ===")
	fmt.Println()

	fmt.Println("Ways to climb N stairs:")
	for n := 1; n <= 15; n++ {
		result := climbingStairs(n)
		fmt.Printf("  %d stairs → %d ways\n", n, result)
	}

	fmt.Println()
	fmt.Println("✓ Bottom-up DP: O(n) time, O(n) space")
	fmt.Println("  (Can be optimized to O(1) space by only keeping last 3 values)")
}

