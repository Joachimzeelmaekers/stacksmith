/**
 * Exercise 1: Leap Year - Time Complexity
 *
 * What is the time complexity of this function?
 */

function isLeapYear(year: number): boolean {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

console.log("=== Leap Year - Time Complexity ===\n");

console.log("Function:");
console.log("  function isLeapYear(year) {");
console.log(
  "    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);"
);
console.log("  }\n");

console.log("Analysis:");
console.log("  - Only performs arithmetic operations");
console.log("  - No loops or recursion");
console.log("  - Always takes the same number of steps");
console.log("  - Does NOT depend on input size\n");

console.log("✓ Time Complexity: O(1) - Constant time\n");

console.log("Testing the function:");
const years = [2000, 2020, 2021, 2024, 1900, 2100];
for (const year of years) {
  console.log(
    `  ${year}: ${isLeapYear(year) ? "Leap year" : "Not a leap year"}`
  );
}
