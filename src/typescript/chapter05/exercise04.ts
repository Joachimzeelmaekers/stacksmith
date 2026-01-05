/**
 * Exercise 4: Sum of Multiples
 *
 * Find sum of all multiples of 3 or 5 below N.
 */

// O(N) approach
function sumMultiplesLinear(n: number): number {
  let sum = 0;
  for (let i = 1; i < n; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  return sum;
}

// O(1) approach using math formula
function sumMultiplesConstant(n: number): number {
  const sumDivisibleBy = (k: number, max: number): number => {
    const p = Math.floor((max - 1) / k);
    return k * (p * (p + 1)) / 2;
  };

  return sumDivisibleBy(3, n) + sumDivisibleBy(5, n) - sumDivisibleBy(15, n);
}

console.log("=== Sum of Multiples - O(N) vs O(1) ===\n");

console.log("Find sum of all multiples of 3 or 5 below N\n");

console.log("Testing correctness:");
for (const n of [10, 100, 1000]) {
  const linear = sumMultiplesLinear(n);
  const constant = sumMultiplesConstant(n);
  console.log(`  N=${n}: linear=${linear}, constant=${constant}, match=${linear === constant}`);
}

console.log("\nPerformance comparison:");
console.log("N              O(N)         O(1)");
console.log("─".repeat(40));

for (const n of [1000000, 10000000, 100000000]) {
  const start1 = performance.now();
  sumMultiplesLinear(n);
  const linear = (performance.now() - start1).toFixed(3);

  const start2 = performance.now();
  sumMultiplesConstant(n);
  const constant = (performance.now() - start2).toFixed(3);

  console.log(`${n.toLocaleString().padStart(12)}   ${linear.padStart(8)}ms   ${constant.padStart(8)}ms`);
}

console.log("\n✓ Mathematical formulas can reduce O(N) to O(1)!");

