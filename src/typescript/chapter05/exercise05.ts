/**
 * Exercise 5: Array Intersection
 *
 * Find common elements between two arrays.
 */

// O(N × M) approach
function intersectionSlow(arr1: number[], arr2: number[]): number[] {
  const result: number[] = [];
  for (const a of arr1) {
    for (const b of arr2) {
      if (a === b && !result.includes(a)) {
        result.push(a);
      }
    }
  }
  return result;
}

// O(N + M) approach
function intersectionFast(arr1: number[], arr2: number[]): number[] {
  const set1 = new Set(arr1);
  const result = new Set<number>();

  for (const b of arr2) {
    if (set1.has(b)) {
      result.add(b);
    }
  }

  return Array.from(result);
}

console.log("=== Array Intersection ===\n");

console.log("Testing correctness:");
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [4, 5, 6, 7, 8];
console.log(`  arr1: [${arr1.join(", ")}]`);
console.log(`  arr2: [${arr2.join(", ")}]`);
console.log(`  slow: [${intersectionSlow(arr1, arr2).join(", ")}]`);
console.log(`  fast: [${intersectionFast(arr1, arr2).join(", ")}]`);

console.log("\nPerformance comparison:");
console.log("Size       O(N×M)        O(N+M)");
console.log("─".repeat(40));

for (const size of [500, 1000, 2000, 3000]) {
  const a1 = Array.from({ length: size }, (_, i) => i);
  const a2 = Array.from({ length: size }, (_, i) => i + size / 2);

  const start1 = performance.now();
  intersectionSlow(a1, a2);
  const slow = (performance.now() - start1).toFixed(2);

  const start2 = performance.now();
  intersectionFast(a1, a2);
  const fast = (performance.now() - start2).toFixed(2);

  console.log(`${size.toString().padStart(6)}   ${slow.padStart(10)}ms   ${fast.padStart(10)}ms`);
}

console.log("\n✓ Hash set enables O(N + M) intersection");

