/**
 * Exercise 2: Stack Pop Reading
 *
 * A stack is used to push the numbers 1, 2, 3, 4, 5, 6 in that order.
 * After two pops, what number would we read from the stack?
 */

import { Stack } from "../helpers/data-structures/stack";

const stack = new Stack<number>();

console.log("=== Stack Pop Reading Exercise ===\n");

console.log("Pushing numbers 1-6 onto the stack:");
for (let i = 1; i <= 6; i++) {
  stack.push(i);
  console.log(`  push(${i}) → stack: ${stack}`);
}

console.log("\nPerforming two pops:");
console.log(`  pop() → ${stack.pop()} removed`);
console.log(`  pop() → ${stack.pop()} removed`);

console.log(`\nReading top of stack: ${stack.peek()}`);
console.log("\n✓ Answer: 4");
