/**
 * Exercise 1: Golomb Sequence
 *
 * The Golomb sequence is defined as follows:
 * - G(1) = 1
 * - G(n) = 1 + G(n - G(G(n - 1)))
 *
 * Implement this function using memoization.
 */

function golomb(n: number, memo: Map<number, number> = new Map()): number {
  if (n === 1) return 1;
  if (memo.has(n)) return memo.get(n)!;

  const result = 1 + golomb(n - golomb(golomb(n - 1, memo), memo), memo);
  memo.set(n, result);
  return result;
}

console.log("=== Golomb Sequence ===\n");

console.log("First 20 numbers in the Golomb sequence:");
const sequence: number[] = [];
for (let i = 1; i <= 20; i++) {
  sequence.push(golomb(i));
}
console.log(`  ${sequence.join(", ")}\n`);

console.log("Individual values:");
for (let i = 1; i <= 10; i++) {
  console.log(`  G(${i}) = ${golomb(i)}`);
}

