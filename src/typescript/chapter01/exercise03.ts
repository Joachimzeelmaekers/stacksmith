/**
 * Exercise 3: Set-Based Array Operations
 *
 * Demonstrate how sets can optimize certain array operations.
 */

console.log("=== Set-Based Array Operations ===\n");

function hasDuplicateArray(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

function hasDuplicateSet(arr: number[]): boolean {
  const seen = new Set<number>();
  for (const num of arr) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}

const testArrays = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 2, 5],
  Array.from({ length: 100 }, (_, i) => i),
  [...Array.from({ length: 99 }, (_, i) => i), 50],
];

console.log("Checking for duplicates:\n");

for (const arr of testArrays) {
  const preview =
    arr.length > 10
      ? `[${arr.slice(0, 5).join(", ")}, ... ${arr.length} elements]`
      : `[${arr.join(", ")}]`;

  const hasdup = hasDuplicateSet(arr);
  console.log(`${preview}`);
  console.log(`  Has duplicate: ${hasdup}\n`);
}

console.log("─".repeat(50));
console.log("Complexity comparison:");
console.log("  Nested loop (O(n²)): Checks every pair");
console.log("  Hash set (O(n)):     Single pass with O(1) lookup");
