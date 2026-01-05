/**
 * Exercise 3: Postorder Traversal
 *
 * Implement a postorder traversal algorithm for a Binary Search Tree.
 */

import { BinarySearchTree } from "../helpers/data-structures/binary-search-tree";

console.log("=== Postorder Traversal ===\n");

const bst = new BinarySearchTree<number>();
[50, 25, 75, 10, 33, 56, 89].forEach((n) => bst.insert(n));

console.log("BST structure:");
console.log("       50");
console.log("      /  \\");
console.log("    25    75");
console.log("   /  \\  /  \\");
console.log("  10  33 56  89\n");

const result = bst.postorderTraversal();
console.log(
  `Postorder traversal: [${
    Array.isArray(result) ? result.join(", ") : "ERROR"
  }]`
);
console.log("\n✓ Postorder visits: left subtree → right subtree → root");
console.log("  Useful for: deleting trees, evaluating expressions");
