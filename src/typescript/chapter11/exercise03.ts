/**
 * Exercise 3: String Reversal
 *
 * Use recursion to write a function that reverses a string.
 */

import { reverseString } from "../helpers/string/reverse";

const testCases = ["hello", "abcdefghij", "a", "", "racecar", "TypeScript"];

for (const test of testCases) {
  const result = reverseString(test);
  console.log(`"${test}"`);
  console.log(`  → "${result}"\n`);
}
