/**
 * Exercise 2: Doubly Linked List
 *
 * Add a method to a doubly linked list to print all elements in reverse.
 */

import { DoublyLinkedList } from "../helpers/data-structures/double-linked-list";

console.log("=== Doubly Linked List - Print in Reverse ===\n");

const list = new DoublyLinkedList<number>();
[1, 2, 3, 4, 5].forEach((n) => list.append(n));

console.log("Doubly linked list:");
list.printForward();
list.printReverse();
