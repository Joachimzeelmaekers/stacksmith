/**
 * Exercise 2: Analyzing Code Complexity
 *
 * Analyze the time complexity of different code patterns.
 */

console.log("=== Analyzing Code Complexity ===\n");

// Pattern 1: Two separate loops
function twoLoops(arr: number[]): number {
  let sum = 0;
  for (const num of arr) sum += num;      // O(N)
  for (const num of arr) sum += num * 2;  // O(N)
  return sum;                              // Total: O(N) + O(N) = O(2N) = O(N)
}

console.log("Pattern 1: Two separate loops");
console.log("  for (num of arr) sum += num;     // O(N)");
console.log("  for (num of arr) sum += num * 2; // O(N)");
console.log("  → O(N) + O(N) = O(2N) = O(N)\n");

// Pattern 2: Nested loops with different arrays
function nestedDifferent(arr1: number[], arr2: number[]): number {
  let count = 0;
  for (const a of arr1) {      // O(N)
    for (const b of arr2) {    // O(M)
      count++;
    }
  }
  return count;                // Total: O(N × M)
}

console.log("Pattern 2: Nested loops with different arrays");
console.log("  for (a of arr1) {        // N iterations");
console.log("    for (b of arr2) { }    // M iterations each");
console.log("  }");
console.log("  → O(N × M) - NOT O(N²) unless N = M\n");

// Pattern 3: Loop that halves
function halvingLoop(n: number): number {
  let count = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    count++;
  }
  return count;
}

console.log("Pattern 3: Loop that halves");
console.log("  while (n > 1) { n = n / 2; }");
console.log("  → O(log N)\n");

console.log("Demonstration:");
for (const n of [16, 64, 256, 1024]) {
  console.log(`  n=${n}: ${halvingLoop(n)} iterations (log₂(${n}) = ${Math.log2(n)})`);
}

