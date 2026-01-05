/**
 * Exercise 1: Call Center Queue
 *
 * If you were writing software for a call center that places callers on hold
 * and then assigns them to "the next available representative," would you use
 * a stack or a queue?
 *
 * Answer: A QUEUE - because callers should be served in FIFO (First In, First Out)
 * order. The first caller to be placed on hold should be the first to be served.
 */

import { Queue } from "../helpers/data-structures/queue";

// Simulate a call center
const callQueue = new Queue<string>();

console.log("=== Call Center Simulation ===\n");

// Callers arriving and being placed on hold
console.log("Incoming calls being placed on hold:");
callQueue.enqueue("Alice");
console.log("  → Alice placed on hold");
callQueue.enqueue("Bob");
console.log("  → Bob placed on hold");
callQueue.enqueue("Charlie");
console.log("  → Charlie placed on hold");

console.log("\nRepresentatives becoming available:");

// Representatives becoming available
while (!callQueue.isEmpty()) {
  const caller = callQueue.dequeue();
  console.log(`  → ${caller} connected to representative`);
}

console.log("\n✓ All callers served in order they arrived (FIFO)");
