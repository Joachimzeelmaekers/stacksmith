/**
 * Exercise 3: Greatest Single Sale Profit
 *
 * Given an array of stock prices where prices[i] is the price on day i,
 * find the maximum profit from a single buy and sell transaction.
 */

function maxProfit(prices: number[]): number {
  if (prices.length < 2) return 0;

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const profit = prices[i] - minPrice;
    maxProfit = Math.max(maxProfit, profit);
    minPrice = Math.min(minPrice, prices[i]);
  }

  return maxProfit;
}

console.log("=== Greatest Single Sale Profit ===\n");

const testCases = [
  { prices: [7, 1, 5, 3, 6, 4], expected: 5 },
  { prices: [7, 6, 4, 3, 1], expected: 0 },
  { prices: [2, 4, 1], expected: 2 },
  { prices: [10, 7, 5, 8, 11, 9], expected: 6 },
];

for (const { prices, expected } of testCases) {
  const result = maxProfit(prices);
  console.log(`Prices: [${prices.join(", ")}]`);
  console.log(`  Max profit: ${result} (expected: ${expected})\n`);
}

console.log("✓ Time: O(n), Space: O(1)");
console.log("  Track minimum price seen and maximum profit");
