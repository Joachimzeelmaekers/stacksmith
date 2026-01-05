/**
 * Exercise 2: Preorder Traversal
 *
 * Implement a preorder traversal algorithm for a Binary Search Tree.
 */

import { BinarySearchTree } from "../helpers/data-structures/binary-search-tree";

console.log("=== BST Traversals ===\n");

const bst = new BinarySearchTree<number>();
[50, 25, 75, 10, 33, 56, 89].forEach((n) => bst.insert(n));

console.log("BST structure:");
console.log("       50");
console.log("      /  \\");
console.log("    25    75");
console.log("   /  \\  /  \\");
console.log("  10  33 56  89\n");

const preorder: number[] = [];
bst.preorderTraversal((v) => preorder.push(v));
console.log(`Preorder (root, left, right):  [${preorder.join(", ")}]`);

const inorder: number[] = [];
bst.inorderTraversal((v) => inorder.push(v));
console.log(`Inorder (left, root, right):   [${inorder.join(", ")}]`);

const postorder: number[] = [];
bst.postorderTraversal((v) => postorder.push(v));
console.log(`Postorder (left, right, root): [${postorder.join(", ")}]`);
