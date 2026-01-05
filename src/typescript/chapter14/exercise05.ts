/**
 * Exercise 5: Find Last Element Efficiently
 *
 * Implement a linked list with O(1) access to the last element using a tail pointer.
 */

import { LinkedList } from "../helpers/data-structures/linked-list";

console.log("=== Linked List with Tail Pointer ===\n");

const list = new LinkedList<number>();

console.log("Adding elements:");
[10, 20, 30, 40, 50].forEach((n) => {
  list.append(n);
  console.log(`  Appended ${n} → Last: ${list.getLast()} (O(1))`);
});

console.log(`\nFinal list: ${list.toString()}`);
console.log(`First element: ${list.getFirst()} (O(1))`);
console.log(`Last element: ${list.getLast()} (O(1))`);
console.log(`Size: ${list.size()}`);
