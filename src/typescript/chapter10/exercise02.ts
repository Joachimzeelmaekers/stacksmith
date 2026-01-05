/**
 * Exercise 2: Find Even Numbers
 *
 * Use recursion to write a function that accepts an array of numbers
 * and returns a new array containing just the even numbers.
 */

function findEvenNumbers(arr: number[]): number[] {
  if (arr.length === 0) {
    return [];
  }

  const rest = findEvenNumbers(arr.slice(1));

  if (arr[0] % 2 === 0) {
    return [arr[0], ...rest];
  }

  return rest;
}

console.log("=== Find Even Numbers ===\n");

const testCases = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 3, 5, 7, 9],
  [2, 4, 6, 8],
  [],
  [0, -2, -3, 4, -5, 6],
];

for (const test of testCases) {
  const result = findEvenNumbers(test);
  console.log(`[${test.join(", ")}]`);
  console.log(`  → Even numbers: [${result.join(", ")}]\n`);
}
