/**
 * Exercise 3: Climbing Stairs with Bottom-Up DP
 *
 * Given N steps, you can climb 1, 2, or 3 steps at a time.
 * How many different ways can you reach the top?
 *
 * Implement using bottom-up dynamic programming.
 */

function climbingStairs(n: number): number {
  if (n < 0) return 0;
  if (n === 0) return 1;
  if (n === 1) return 1;
  if (n === 2) return 2;

  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  return dp[n];
}

console.log("=== Climbing Stairs (1, 2, or 3 steps) ===\n");

console.log("Ways to climb N stairs:");
for (let n = 1; n <= 15; n++) {
  const result = climbingStairs(n);
  console.log(`  ${n} stairs → ${result} ways`);
}

console.log("\n✓ Bottom-up DP: O(n) time, O(n) space");
console.log("  (Can be optimized to O(1) space by only keeping last 3 values)");

