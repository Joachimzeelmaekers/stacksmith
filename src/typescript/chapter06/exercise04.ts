/**
 * Exercise 4: Optimistic vs Pessimistic Scenarios
 *
 * Show when optimistic assumptions pay off.
 */

console.log("=== Optimistic vs Pessimistic Scenarios ===\n");

// Scenario: Checking if array is sorted
function isSortedPessimistic(arr: number[]): boolean {
  // Always checks all elements
  let sorted = true;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      sorted = false;
      // Still continues checking...
    }
  }
  return sorted;
}

function isSortedOptimistic(arr: number[]): boolean {
  // Returns early on first violation
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false; // Early return!
    }
  }
  return true;
}

const sorted = Array.from({ length: 10000 }, (_, i) => i);
const unsortedEarly = [
  10,
  1,
  2,
  3,
  4,
  ...Array.from({ length: 9995 }, (_, i) => i + 5),
];
const unsortedLate = [...Array.from({ length: 9998 }, (_, i) => i), 10, 1];

console.log("Checking 10,000 element arrays:\n");

const scenarios = [
  { name: "Sorted array", arr: sorted },
  { name: "Unsorted at start", arr: unsortedEarly },
  { name: "Unsorted at end", arr: unsortedLate },
];

console.log("Scenario              Pessimistic    Optimistic");
console.log("─".repeat(50));

for (const { name, arr } of scenarios) {
  const start1 = performance.now();
  for (let i = 0; i < 100; i++) isSortedPessimistic(arr);
  const pess = ((performance.now() - start1) / 100).toFixed(3);

  const start2 = performance.now();
  for (let i = 0; i < 100; i++) isSortedOptimistic(arr);
  const opt = ((performance.now() - start2) / 100).toFixed(3);

  console.log(
    `${name.padEnd(20)}  ${pess.padStart(8)}ms   ${opt.padStart(8)}ms`
  );
}

console.log("\n✓ Early returns optimize for the common case");
