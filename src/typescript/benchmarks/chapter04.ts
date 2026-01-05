/**
 * Chapter 4: Speeding Up Your Code with Big O
 *
 * Concept Benchmark: O(N²) vs O(N log N) Sorting
 */

import { formatMs } from "../helpers/format/ms";
import { bubbleSort } from "../helpers/sort/bubble";
import { quickSort } from "../helpers/sort/quick";

interface BenchmarkResult {
  size: number;
  bubbleMs: number;
  quickMs: number;
  builtinMs: number;
  speedup: number;
}

function benchmarkSort(size: number): BenchmarkResult {
  // Create random array
  const arr = Array.from({ length: size }, () =>
    Math.floor(Math.random() * size)
  );

  // Benchmark bubble sort
  const bubbleStart = performance.now();
  bubbleSort([...arr]);
  const bubbleMs = performance.now() - bubbleStart;

  // Benchmark quicksort
  const quickStart = performance.now();
  quickSort([...arr]);
  const quickMs = performance.now() - quickStart;

  // Benchmark built-in sort
  const builtinStart = performance.now();
  [...arr].sort((a, b) => a - b);
  const builtinMs = performance.now() - builtinStart;

  return {
    size,
    bubbleMs,
    quickMs,
    builtinMs,
    speedup: bubbleMs / quickMs,
  };
}

function printResults(results: BenchmarkResult[]) {
  console.log(
    "\n┌──────────┬──────────────┬──────────────┬──────────────┬──────────┐"
  );
  console.log(
    "│   Size   │ Bubble O(N²) │Quick O(NlogN)│   Built-in   │ Speedup  │"
  );
  console.log(
    "├──────────┼──────────────┼──────────────┼──────────────┼──────────┤"
  );

  for (const r of results) {
    const sizeStr = r.size.toLocaleString().padStart(8);
    const bubbleStr = formatMs(r.bubbleMs).padStart(12);
    const quickStr = formatMs(r.quickMs).padStart(12);
    const builtinStr = formatMs(r.builtinMs).padStart(12);
    const speedupStr = `${r.speedup.toFixed(1)}x`.padStart(8);
    console.log(
      `│ ${sizeStr} │ ${bubbleStr} │ ${quickStr} │ ${builtinStr} │ ${speedupStr} │`
    );
  }

  console.log(
    "└──────────┴──────────────┴──────────────┴──────────────┴──────────┘"
  );
}

console.log("═".repeat(60));
console.log("Chapter 4: Sorting Algorithm Benchmark");
console.log("═".repeat(60));
console.log("\nThis benchmark shows why O(N²) algorithms like bubble sort");
console.log("become impractical for large datasets.\n");

console.log("Sorting random arrays at each size...\n");

// Smaller sizes for bubble sort (it's very slow!)
const sizes = [100, 500, 1_000, 2_000, 5_000];
const results: BenchmarkResult[] = [];

for (const size of sizes) {
  process.stdout.write(
    `  Benchmarking size ${size.toLocaleString().padStart(6)}...`
  );
  const result = benchmarkSort(size);
  results.push(result);
  console.log(` done (quicksort ${result.speedup.toFixed(1)}x faster)`);
}

printResults(results);

console.log("\nKey Observations:");
console.log("   • Bubble sort: O(N²) - time quadruples when N doubles");
console.log("   • Quicksort: O(N log N) - much more scalable");
console.log("   • At 5000 elements, bubble sort is already painfully slow");
console.log("   • Built-in sort uses optimized O(N log N) algorithms\n");

console.log("Note: Bubble sort at 10,000+ elements would take minutes!\n");
