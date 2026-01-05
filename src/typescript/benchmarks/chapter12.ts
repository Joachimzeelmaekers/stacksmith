/**
 * Chapter 12: Dynamic Programming
 *
 * Concept Benchmark: Naive Recursion O(2^N) vs Memoization O(N)
 */

import { formatMs } from "../helpers/format/ms";

// Naive recursive Fibonacci - O(2^N)
function fibNaive(n: number): number {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}

// Memoized Fibonacci - O(N)
function fibMemo(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;

  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}

// Bottom-up DP Fibonacci - O(N)
function fibDP(n: number): number {
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

interface BenchmarkResult {
  n: number;
  naiveMs: number | null;
  memoMs: number;
  dpMs: number;
}

function benchmarkFib(
  n: number,
  includeNaive: boolean = true
): BenchmarkResult {
  let naiveMs: number | null = null;

  // Only benchmark naive for small N (it's exponential!)
  if (includeNaive && n <= 35) {
    const naiveStart = performance.now();
    fibNaive(n);
    naiveMs = performance.now() - naiveStart;
  }

  // Benchmark memoized
  const memoStart = performance.now();
  for (let i = 0; i < 1000; i++) {
    fibMemo(n, new Map());
  }
  const memoMs = (performance.now() - memoStart) / 1000;

  // Benchmark bottom-up DP
  const dpStart = performance.now();
  for (let i = 0; i < 1000; i++) {
    fibDP(n);
  }
  const dpMs = (performance.now() - dpStart) / 1000;

  return { n, naiveMs, memoMs, dpMs };
}

function printResults(results: BenchmarkResult[]) {
  console.log("\n┌──────┬──────────────┬──────────────┬──────────────┐");
  console.log("│  N   │ Naive O(2^N) │  Memo O(N)   │   DP O(N)    │");
  console.log("├──────┼──────────────┼──────────────┼──────────────┤");

  for (const r of results) {
    const nStr = r.n.toString().padStart(4);
    const naiveStr = formatMs(r.naiveMs).padStart(12);
    const memoStr = formatMs(r.memoMs).padStart(12);
    const dpStr = formatMs(r.dpMs).padStart(12);
    console.log(`│ ${nStr} │ ${naiveStr} │ ${memoStr} │ ${dpStr} │`);
  }

  console.log("└──────┴──────────────┴──────────────┴──────────────┘");
}

console.log("═".repeat(60));
console.log("Chapter 12: Dynamic Programming Benchmark");
console.log("═".repeat(60));
console.log("\nThis benchmark shows the dramatic difference between naive");
console.log("recursion O(2^N) and dynamic programming O(N).\n");

console.log("Computing Fibonacci numbers...\n");

const results: BenchmarkResult[] = [];

// Small N with naive recursion
for (const n of [10, 20, 25, 30, 35]) {
  process.stdout.write(
    `  Benchmarking fib(${n.toString().padStart(2)}) with naive...`
  );
  const result = benchmarkFib(n, true);
  results.push(result);
  console.log(` done`);
}

// Larger N without naive (would take forever)
console.log("\n  Skipping naive for large N (would take hours/days)...\n");
for (const n of [40, 50, 100, 1000]) {
  process.stdout.write(
    `  Benchmarking fib(${n.toString().padStart(4)}) with memo/DP...`
  );
  const result = benchmarkFib(n, false);
  results.push(result);
  console.log(` done`);
}

printResults(results);

console.log("\nKey Observations:");
console.log("   • Naive recursion: O(2^N) - doubles with each +1 to N");
console.log("   • fib(35) naive ≈ 2^35 = 34 billion operations!");
console.log("   • Memoization: O(N) - each value computed only once");
console.log("   • Bottom-up DP: O(N) time, O(1) space - most efficient");
console.log("   • fib(1000) is instant with DP, impossible with naive\n");
