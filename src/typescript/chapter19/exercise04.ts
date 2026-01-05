/**
 * Exercise 4: Fibonacci with O(1) Space
 *
 * Calculate the nth Fibonacci number using constant space.
 */

function fibonacciConstantSpace(n: number): number {
  if (n <= 1) return n;

  let prev2 = 0;
  let prev1 = 1;

  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

function fibonacciRecursive(n: number): number {
  if (n <= 1) return n;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

function fibonacciMemoized(
  n: number,
  memo: Map<number, number> = new Map()
): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;

  const result = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  memo.set(n, result);
  return result;
}

console.log("=== Fibonacci Implementations ===\n");

console.log("Fibonacci sequence (first 15 numbers):");
const sequence = [];
for (let i = 0; i < 15; i++) {
  sequence.push(fibonacciConstantSpace(i));
}
console.log(`  ${sequence.join(", ")}\n`);

console.log("Comparison of approaches:");
console.log("  Recursive:      O(2^n) time, O(n) space (call stack)");
console.log("  Memoized:       O(n) time, O(n) space (memo map)");
console.log("  Constant Space: O(n) time, O(1) space ✓\n");

console.log("Testing F(40):");
const start = performance.now();
const result = fibonacciConstantSpace(40);
const time = (performance.now() - start).toFixed(3);
console.log(`  Result: ${result} (computed in ${time}ms)`);

