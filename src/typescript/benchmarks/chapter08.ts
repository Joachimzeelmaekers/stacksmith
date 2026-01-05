/**
 * Chapter 8: Blazing Fast Lookup with Hash Tables
 *
 * Concept Benchmark: Array O(N) vs Hash Table O(1) lookup
 */

import { formatMs } from "../helpers/format/ms";

interface BenchmarkResult {
  size: number;
  arrayMs: number;
  hashMs: number;
  speedup: number;
}

function benchmarkLookup(
  size: number,
  iterations: number = 1000
): BenchmarkResult {
  // Create array and hash map with same data
  const arr: number[] = [];
  const hashMap = new Map<number, number>();

  for (let i = 0; i < size; i++) {
    arr.push(i);
    hashMap.set(i, i);
  }

  // Target to search for (worst case for array - last element)
  const target = size - 1;

  // Benchmark array lookup (linear search)
  const arrayStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    arr.includes(target);
  }
  const arrayMs = performance.now() - arrayStart;

  // Benchmark hash map lookup
  const hashStart = performance.now();
  for (let i = 0; i < iterations; i++) {
    hashMap.has(target);
  }
  const hashMs = performance.now() - hashStart;

  return {
    size,
    arrayMs,
    hashMs,
    speedup: arrayMs / hashMs,
  };
}

function printResults(results: BenchmarkResult[]) {
  console.log("\n┌────────────┬──────────────┬──────────────┬──────────────┐");
  console.log("│    Size    │  Array O(N)  │  Hash O(1)   │   Speedup    │");
  console.log("├────────────┼──────────────┼──────────────┼──────────────┤");

  for (const r of results) {
    const sizeStr = r.size.toLocaleString().padStart(10);
    const arrayStr = formatMs(r.arrayMs).padStart(12);
    const hashStr = formatMs(r.hashMs).padStart(12);
    const speedupStr = `${r.speedup.toFixed(1)}x`.padStart(12);
    console.log(`│ ${sizeStr} │ ${arrayStr} │ ${hashStr} │ ${speedupStr} │`);
  }

  console.log("└────────────┴──────────────┴──────────────┴──────────────┘");
}

console.log("═".repeat(60));
console.log("Chapter 8: Array vs Hash Table Lookup Benchmark");
console.log("═".repeat(60));
console.log("\nThis benchmark demonstrates why hash tables have O(1) lookup");
console.log("compared to arrays which require O(N) linear search.\n");

console.log("Running 1000 lookups at each size...\n");

const sizes = [100, 1_000, 10_000, 100_000, 1_000_000];
const results: BenchmarkResult[] = [];

for (const size of sizes) {
  process.stdout.write(
    `  Benchmarking size ${size.toLocaleString().padStart(10)}...`
  );
  const result = benchmarkLookup(size);
  results.push(result);
  console.log(` done (${result.speedup.toFixed(1)}x faster)`);
}

printResults(results);

console.log("\nKey Observations:");
console.log("   • Array lookup time grows linearly with size (O(N))");
console.log("   • Hash table lookup stays constant regardless of size (O(1))");
console.log("   • The speedup increases as data size grows");
console.log("   • At 1M elements, hash lookup can be 1000x+ faster!\n");
