/**
 * Exercise 3: Queue Dequeue Reading
 *
 * A queue is used to insert the numbers 1, 2, 3, 4, 5, 6 in that order.
 * After two dequeues, what number would we read from the queue?
 */

import { Queue } from "../helpers/data-structures/queue";

const queue = new Queue<number>();

console.log("=== Queue Dequeue Reading Exercise ===\n");

console.log("Enqueueing numbers 1-6:");
for (let i = 1; i <= 6; i++) {
  queue.enqueue(i);
  console.log(`  enqueue(${i}) → queue: ${queue}`);
}

console.log("\nPerforming two dequeues:");
console.log(`  dequeue() → ${queue.dequeue()} removed`);
console.log(`  dequeue() → ${queue.dequeue()} removed`);

console.log(`\nReading front of queue: ${queue.peek()}`);
console.log("\n✓ Answer: 3");
