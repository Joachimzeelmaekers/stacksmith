/**
 * Exercise 4: Build Balanced BST from Sorted Array
 *
 * Given a sorted array, build a balanced binary search tree.
 */

import { TreeNode } from "../helpers/data-structures/tree-node";

function buildBalancedBST<T>(sortedArray: T[]): TreeNode<T> | null {
  if (sortedArray.length === 0) return null;

  const mid = Math.floor(sortedArray.length / 2);
  const node = new TreeNode(sortedArray[mid]);

  node.left = buildBalancedBST(sortedArray.slice(0, mid));
  node.right = buildBalancedBST(sortedArray.slice(mid + 1));

  return node;
}

function printTree<T>(
  node: TreeNode<T> | null,
  prefix = "",
  isLeft = true
): void {
  if (!node) return;

  if (node.right) {
    printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
  }

  console.log(prefix + (isLeft ? "└── " : "┌── ") + node.value);

  if (node.left) {
    printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
  }
}

function getHeight<T>(node: TreeNode<T> | null): number {
  if (!node) return 0;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

console.log("=== Build Balanced BST from Sorted Array ===\n");

const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log(`Sorted array: [${sortedArray.join(", ")}]\n`);

const root = buildBalancedBST(sortedArray);

console.log("Balanced BST structure:");
printTree(root);

console.log(`\nTree height: ${getHeight(root)}`);
console.log(
  `Optimal height for ${sortedArray.length} nodes: ${Math.ceil(
    Math.log2(sortedArray.length + 1)
  )}`
);
