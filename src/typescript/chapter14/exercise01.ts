/**
 * Exercise 1: Print All Elements
 *
 * Add a method to a linked list that prints all elements of the list.
 */

import { LinkedList } from "../helpers/data-structures/linked-list";

console.log("=== Print All Elements ===\n");

const list = new LinkedList<number>();
[1, 2, 3, 4, 5].forEach((n) => list.append(n));

console.log("Linked list contents:");
list.toString();

const stringList = new LinkedList<string>();
["Alice", "Bob", "Charlie"].forEach((s) => stringList.append(s));

console.log("\nString linked list:");
stringList.toString();
