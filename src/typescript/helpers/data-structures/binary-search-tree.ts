import { TreeNode } from "./tree-node";

export type Comparator<T> = (a: T, b: T) => number;
export type TraversalOrder = "preorder" | "inorder" | "postorder";

export class BinarySearchTree<T> {
  root: TreeNode<T> | null = null;

  private compare: Comparator<T>;

  constructor(compare?: Comparator<T>) {
    // Default comparator works for numbers and strings
    this.compare =
      compare ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  }

  insert(value: T): void {
    if (this.root === null) {
      this.root = new TreeNode(value);
      return;
    }

    this.insertInto(this.root, value);
  }

  private insertInto(currentNode: TreeNode<T>, value: T): void {
    if (this.compare(value, currentNode.value) < 0) {
      if (currentNode.left === null) {
        currentNode.left = new TreeNode(value);
      } else {
        this.insertInto(currentNode.left, value);
      }
    } else {
      if (currentNode.right === null) {
        currentNode.right = new TreeNode(value);
      } else {
        this.insertInto(currentNode.right, value);
      }
    }
  }

  findGreatest(): T | null {
    if (this.root === null) {
      return null;
    }

    let currentNode = this.root;
    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode.value;
  }

  traverse(order: TraversalOrder, visit: (value: T) => void): void {
    this.traverseNode(this.root, order, visit);
  }

  toArray(order: TraversalOrder): T[] {
    const values: T[] = [];
    this.traverse(order, (value) => values.push(value));
    return values;
  }

  preorderTraversal(visit: (value: T) => void): void {
    this.traverse("preorder", visit);
  }

  inorderTraversal(visit: (value: T) => void): void {
    this.traverse("inorder", visit);
  }

  postorderTraversal(visit?: (value: T) => void): void | T[] {
    if (visit) {
      this.traverse("postorder", visit);
      return;
    }
    return this.toArray("postorder");
  }

  private traverseNode(
    currentNode: TreeNode<T> | null,
    order: TraversalOrder,
    visit: (value: T) => void
  ): void {
    if (currentNode === null) {
      return;
    }

    // We don't use a switch here, as we will need to traverse nodes in a different way depending on the order
    if (order === "preorder") {
      visit(currentNode.value);
    }
    this.traverseNode(currentNode.left, order, visit);
    if (order === "inorder") {
      visit(currentNode.value);
    }
    this.traverseNode(currentNode.right, order, visit);
    if (order === "postorder") {
      visit(currentNode.value);
    }
  }
}
