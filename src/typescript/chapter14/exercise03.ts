/**
 * Exercise 3: Reverse Linked List
 *
 * Implement a function to reverse a singly linked list.
 */

import { LinkedList } from "../helpers/data-structures/linked-list";

console.log("=== Reverse Linked List ===\n");

const list = new LinkedList<number>();
[1, 2, 3, 4, 5].forEach((n) => list.append(n));

console.log("Original:", list.toString());
list.reverse();
console.log("Reversed:", list.toString());

console.log("\n✓ In-place reversal: O(n) time, O(1) space");
