/**
 * Exercise 3: Triangular Numbers
 *
 * "Triangular numbers" are numbers like 1, 3, 6, 10, 15, 21...
 * The Nth triangular number is the sum of all positive integers up to N.
 *
 * Write a function that accepts a number for N and returns the correct
 * triangular number.
 */

function triangularNumber(n: number): number {
  if (n === 1) {
    return 1;
  }
  return n + triangularNumber(n - 1);
}

console.log("=== Triangular Numbers ===\n");

console.log("Triangular number sequence:");
console.log("  T(n) = 1 + 2 + 3 + ... + n\n");

for (let n = 1; n <= 10; n++) {
  const result = triangularNumber(n);
  const sum = Array.from({ length: n }, (_, i) => i + 1).join(" + ");
  console.log(`  T(${n}) = ${sum} = ${result}`);
}

console.log("\n✓ Each triangular number adds N to the previous result");
