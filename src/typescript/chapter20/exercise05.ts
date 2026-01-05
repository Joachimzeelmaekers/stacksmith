/**
 * Exercise 5: Coin Change - Minimum Coins
 *
 * Given coins of different denominations and a total amount,
 * find the minimum number of coins needed to make up that amount.
 */

function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

function coinChangeWithCoins(
  coins: number[],
  amount: number
): { count: number; usedCoins: number[] } {
  const dp = new Array(amount + 1).fill(Infinity);
  const usedCoin = new Array(amount + 1).fill(-1);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
        usedCoin[i] = coin;
      }
    }
  }

  if (dp[amount] === Infinity) {
    return { count: -1, usedCoins: [] };
  }

  const result: number[] = [];
  let remaining = amount;
  while (remaining > 0) {
    result.push(usedCoin[remaining]);
    remaining -= usedCoin[remaining];
  }

  return { count: dp[amount], usedCoins: result };
}

console.log("=== Coin Change - Minimum Coins ===\n");

const testCases = [
  { coins: [1, 2, 5], amount: 11 },
  { coins: [2], amount: 3 },
  { coins: [1], amount: 0 },
  { coins: [1, 5, 10, 25], amount: 67 },
];

for (const { coins, amount } of testCases) {
  const result = coinChangeWithCoins(coins, amount);
  console.log(`Coins: [${coins.join(", ")}], Amount: ${amount}`);
  if (result.count >= 0) {
    console.log(`  Minimum coins: ${result.count}`);
    console.log(`  Coins used: [${result.usedCoins.join(", ")}]\n`);
  } else {
    console.log(`  Not possible to make this amount\n`);
  }
}

console.log("✓ Dynamic Programming: O(amount * coins) time, O(amount) space");
