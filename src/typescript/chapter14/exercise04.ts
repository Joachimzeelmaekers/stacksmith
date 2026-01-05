/**
 * Exercise 4: Delete Node from Linked List
 *
 * Implement a method to delete a node by value from a linked list.
 */

import { LinkedList } from "../helpers/data-structures/linked-list";

console.log("=== Delete Node from Linked List ===\n");

const list = new LinkedList<number>();
[1, 2, 3, 4, 5].forEach((n) => list.append(n));

console.log("Original:", list.toString());

console.log("\nDeleting 3:");
list.delete(3);
console.log("  Result:", list.toString());

console.log("\nDeleting 1 (head):");
list.delete(1);
console.log("  Result:", list.toString());

console.log("\nDeleting 5 (tail):");
list.delete(5);
console.log("  Result:", list.toString());

console.log("\nDeleting 99 (not found):");
const found = list.delete(99);
console.log(`  Found: ${found}, Result:`, list.toString());
