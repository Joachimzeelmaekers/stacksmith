/**
 * Chapter 2: Why Algorithms Matter
 *
 * Concept Benchmark: Linear Search O(N) vs Binary Search O(log N)
 */

import { formatMs } from "../helpers/format/ms";
import { binarySearch } from "../helpers/search/binary";
import { linearSearch } from "../helpers/search/linear";

interface BenchmarkResult {
  size: number;
  linearMs: number;
  binaryMs: number;
  speedup: number;
}

function benchmarkSearch(
  size: number,
  iterations: number = 1000
): BenchmarkResult {
  // Create sorted array
  const arr = Array.from({ length: size }, (_, i) => i);

  // Target: last element (worst case for linear)
  const target = size - 1;

  // Benchmark linear search
  const linearStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    linearSearch(arr, target);
  }
  const linearMs = performance.now() - linearStart;

  // Benchmark binary search
  const binaryStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    binarySearch(arr, target);
  }
  const binaryMs = performance.now() - binaryStart;

  return {
    size,
    linearMs,
    binaryMs,
    speedup: linearMs / binaryMs,
  };
}

function printResults(results: BenchmarkResult[]) {
  console.log("\n┌────────────┬──────────────┬──────────────┬──────────────┐");
  console.log("│    Size    │  Linear O(N) │Binary O(logN)│   Speedup    │");
  console.log("├────────────┼──────────────┼──────────────┼──────────────┤");

  for (const r of results) {
    const sizeStr = r.size.toLocaleString().padStart(10);
    const linearStr = formatMs(r.linearMs).padStart(12);
    const binaryStr = formatMs(r.binaryMs).padStart(12);
    const speedupStr = `${r.speedup.toFixed(1)}x`.padStart(12);
    console.log(`│ ${sizeStr} │ ${linearStr} │ ${binaryStr} │ ${speedupStr} │`);
  }

  console.log("└────────────┴──────────────┴──────────────┴──────────────┘");
}

console.log("═".repeat(60));
console.log("Chapter 2: Linear vs Binary Search Benchmark");
console.log("═".repeat(60));
console.log("\nThis benchmark demonstrates why binary search O(log N) is");
console.log("dramatically faster than linear search O(N) on sorted data.\n");

console.log("Running 1000 searches at each size...\n");

const sizes = [100, 1_000, 10_000, 100_000, 1_000_000];
const results: BenchmarkResult[] = [];

for (const size of sizes) {
  process.stdout.write(
    `  Benchmarking size ${size.toLocaleString().padStart(10)}...`
  );
  const result = benchmarkSearch(size);
  results.push(result);
  console.log(` done (${result.speedup.toFixed(1)}x faster)`);
}

printResults(results);

console.log("\nKey Observations:");
console.log("   • Linear search checks every element: O(N)");
console.log("   • Binary search halves the search space each step: O(log N)");
console.log("   • At 1M elements: linear = 1M steps, binary = ~20 steps!");
console.log("   • Binary search requires sorted data\n");
