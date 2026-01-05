/**
 * Chapter 5: Optimizing Code With and Without Big O
 *
 * Concept Benchmark: O(N²) vs O(N) - Finding Duplicates
 */

import { formatMs } from "../helpers/format/ms";

// O(N²) - Nested loops
function hasDuplicateNested(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// O(N) - Hash set
function hasDuplicateHash(arr: number[]): boolean {
  const seen = new Set<number>();
  for (const num of arr) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

interface BenchmarkResult {
  size: number;
  nestedMs: number;
  hashMs: number;
  speedup: number;
}

function benchmarkDuplicates(size: number): BenchmarkResult {
  // Create array with no duplicates (worst case for both)
  const arr = Array.from({ length: size }, (_, i) => i);

  // Benchmark nested loops O(N²)
  const nestedStart = performance.now();
  hasDuplicateNested(arr);
  const nestedMs = performance.now() - nestedStart;

  // Benchmark hash set O(N)
  const hashStart = performance.now();
  for (let i = 0; i < 100; i++) {
    hasDuplicateHash(arr);
  }
  const hashMs = (performance.now() - hashStart) / 100;

  return {
    size,
    nestedMs,
    hashMs,
    speedup: nestedMs / hashMs,
  };
}

function printResults(results: BenchmarkResult[]) {
  console.log("\n┌────────────┬──────────────┬──────────────┬──────────────┐");
  console.log("│    Size    │ Nested O(N²) │  Hash O(N)   │   Speedup    │");
  console.log("├────────────┼──────────────┼──────────────┼──────────────┤");

  for (const r of results) {
    const sizeStr = r.size.toLocaleString().padStart(10);
    const nestedStr = formatMs(r.nestedMs).padStart(12);
    const hashStr = formatMs(r.hashMs).padStart(12);
    const speedupStr = `${r.speedup.toFixed(1)}x`.padStart(12);
    console.log(`│ ${sizeStr} │ ${nestedStr} │ ${hashStr} │ ${speedupStr} │`);
  }

  console.log("└────────────┴──────────────┴──────────────┴──────────────┘");
}

console.log("═".repeat(60));
console.log("Chapter 5: Finding Duplicates - O(N^2) vs O(N)");
console.log("═".repeat(60));
console.log("\nThis benchmark shows how using a hash set can transform");
console.log("an O(N²) algorithm into O(N) - trading space for time.\n");

console.log("Checking for duplicates (worst case: no duplicates)...\n");

const sizes = [1_000, 2_000, 5_000, 10_000, 20_000];
const results: BenchmarkResult[] = [];

for (const size of sizes) {
  process.stdout.write(
    `  Benchmarking size ${size.toLocaleString().padStart(6)}...`
  );
  const result = benchmarkDuplicates(size);
  results.push(result);
  console.log(` done (hash ${result.speedup.toFixed(1)}x faster)`);
}

printResults(results);

console.log("\nKey Observations:");
console.log("   • Nested loops: O(N²) - checks every pair");
console.log("   • Hash set: O(N) - single pass with O(1) lookups");
console.log("   • Trade-off: hash uses O(N) extra space");
console.log("   • The speedup grows as data size increases\n");
