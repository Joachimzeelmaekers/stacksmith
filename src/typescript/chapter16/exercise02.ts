/**
 * Exercise 2: Extract from Heap
 *
 * Implement the delete/extract-max operation for a max-heap.
 */

import { MaxHeap } from "../helpers/data-structures/max-heap";

console.log("=== Max-Heap Extract ===\n");

const heap = new MaxHeap();
[50, 30, 70, 10, 40, 60, 80].forEach((v) => heap.insert(v));

console.log(`Initial heap: [${heap.getData().join(", ")}]`);
console.log("\nExtracting all values in order:");

while (heap.size() > 0) {
  const max = heap.extractMax();
  console.log(`  Extracted ${max} → Remaining: [${heap.getData().join(", ")}]`);
}

console.log("\n✓ Extract: O(log n) - heapify down from root");
