/**
 * Exercise 3: Finding Duplicates - Optimization
 *
 * Compare O(N²) vs O(N) approaches to finding duplicates.
 */

// O(N²) approach - nested loops
function hasDuplicateSlow(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// O(N) approach - hash set
function hasDuplicateFast(arr: number[]): boolean {
  const seen = new Set<number>();
  for (const num of arr) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

console.log("=== Finding Duplicates - O(N²) vs O(N) ===\n");

console.log("Testing correctness:");
const tests = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 2, 5],
  [1, 1],
];

for (const arr of tests) {
  console.log(`  [${arr.join(", ")}]: slow=${hasDuplicateSlow(arr)}, fast=${hasDuplicateFast(arr)}`);
}

console.log("\nPerformance comparison:");
console.log("Size       O(N²)        O(N)");
console.log("─".repeat(35));

for (const size of [1000, 5000, 10000, 20000]) {
  const arr = Array.from({ length: size }, (_, i) => i);

  const start1 = performance.now();
  hasDuplicateSlow(arr);
  const slow = (performance.now() - start1).toFixed(2);

  const start2 = performance.now();
  hasDuplicateFast(arr);
  const fast = (performance.now() - start2).toFixed(2);

  console.log(`${size.toString().padStart(6)}   ${slow.padStart(8)}ms   ${fast.padStart(8)}ms`);
}

console.log("\n✓ Hash set trades space for time: O(N) space, O(N) time");

