/**
 * Exercise 1: Find Greatest Value
 *
 * Write a method in a Binary Search Tree to find the greatest value in the tree.
 */

import { BinarySearchTree } from "../helpers/data-structures/binary-search-tree";

console.log("=== Find Greatest Value in BST ===\n");

const bst = new BinarySearchTree<number>();
[50, 25, 75, 10, 33, 56, 89, 4, 11, 30, 40, 52, 61, 82, 95].forEach((n) =>
  bst.insert(n)
);

console.log(
  "BST created with values: 50, 25, 75, 10, 33, 56, 89, 4, 11, 30, 40, 52, 61, 82, 95"
);
console.log(`\nGreatest value: ${bst.findGreatest()}`);
console.log("\n✓ O(log n) average case - just follow right pointers");
