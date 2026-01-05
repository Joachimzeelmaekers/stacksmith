/**
 * Exercise 4: Reverse String Using Stack
 *
 * Write a function that uses a stack to reverse a string.
 */

import { reverseStringWithStack } from "../helpers/string/reverse-with-stack";

console.log("=== Reverse String Using Stack ===\n");

const testCases = [
  "abcde",
  "hello",
  "TypeScript",
  "A man a plan a canal Panama",
];

for (const test of testCases) {
  const result = reverseStringWithStack(test);
  console.log(`"${test}"`);
  console.log(`  → "${result}"\n`);
}

console.log("✓ String reversal complete using LIFO stack property");
