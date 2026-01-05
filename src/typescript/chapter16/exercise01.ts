/**
 * Exercise 1: Insert into Heap
 *
 * Implement the insert operation for a max-heap.
 */

import { MaxHeap } from "../helpers/data-structures/max-heap";

console.log("=== Max-Heap Insert ===\n");

const heap = new MaxHeap();
const values = [50, 30, 70, 10, 40, 60, 80];

console.log("Inserting values into max-heap:");
for (const value of values) {
  heap.insert(value);
  console.log(`  Insert ${value} → Heap: [${heap.getData().join(", ")}]`);
}

console.log(`\nMax value (peek): ${heap.peek()}`);
console.log("\n✓ Insert: O(log n) - heapify up from leaf to root");
