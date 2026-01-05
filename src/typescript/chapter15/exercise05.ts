/**
 * Exercise 5: BST Validity Check
 *
 * Write a function to check if a binary tree is a valid binary search tree.
 */

import { TreeNode } from "../helpers/data-structures/tree-node";

function isValidBST(
  node: TreeNode<number> | null,
  min: number = -Infinity,
  max: number = Infinity
): boolean {
  if (!node) return true;

  if (node.value <= min || node.value >= max) {
    return false;
  }

  return (
    isValidBST(node.left, min, node.value) &&
    isValidBST(node.right, node.value, max)
  );
}

console.log("=== BST Validity Check ===\n");

// Valid BST
const validBST = new TreeNode(50);
validBST.left = new TreeNode(25);
validBST.right = new TreeNode(75);
validBST.left.left = new TreeNode(10);
validBST.left.right = new TreeNode(33);

console.log("Tree 1:");
console.log("       50");
console.log("      /  \\");
console.log("    25    75");
console.log("   /  \\");
console.log("  10  33");
console.log(`Valid BST: ${isValidBST(validBST)}\n`);

// Invalid BST (60 is in wrong position)
const invalidBST = new TreeNode(50);
invalidBST.left = new TreeNode(25);
invalidBST.right = new TreeNode(75);
invalidBST.left.left = new TreeNode(10);
invalidBST.left.right = new TreeNode(60); // Invalid! 60 > 50

console.log("Tree 2:");
console.log("       50");
console.log("      /  \\");
console.log("    25    75");
console.log("   /  \\");
console.log("  10  60  ← Invalid! 60 > 50 but in left subtree");
console.log(`Valid BST: ${isValidBST(invalidBST)}`);
