# Chapter 15 – Trees

## Context and Goals

Trees generalize linked lists by allowing each node to have multiple children. They are essential in data organization, search optimization, and hierarchical modeling (e.g., file systems, DOM, syntax trees). This chapter focuses on **binary trees** and **binary search trees (BSTs)** — exploring how their structure enables efficient search, insertion, and traversal.

---

## Core Concepts and Reasoning

### 1. Structure

A tree is composed of **nodes** linked by **edges**:

* Each node contains a **value** and references to **children**.
* The **root** is the topmost node.
* Nodes with no children are **leaves**.
* In a **binary tree**, each node has at most two children — `left` and `right`.

### 2. Binary Search Tree (BST) Property

In a BST:

* Left child values < Parent value
* Right child values > Parent value

This ordering allows efficient O(log N) search and insertion — similar to binary search.

---

## Examples

### Example 1: Search in a BST

#### TypeScript

```typescript
interface Node {
  value: number;
  left?: Node;
  right?: Node;
}

function searchBST(root: Node | undefined, target: number): boolean {
  if (!root) return false;
  if (root.value === target) return true;
  if (target < root.value) return searchBST(root.left, target);
  return searchBST(root.right, target);
}
```

#### Go

```go
type Node struct {
  Value int
  Left, Right *Node
}

func SearchBST(root *Node, target int) bool {
  if root == nil {
    return false
  }
  if root.Value == target {
    return true
  } else if target < root.Value {
    return SearchBST(root.Left, target)
  }
  return SearchBST(root.Right, target)
}
```

### Example 2: Insertion into a BST

#### TypeScript

```typescript
function insertBST(root: Node | undefined, value: number): Node {
  if (!root) return { value };
  if (value < root.value) root.left = insertBST(root.left, value);
  else root.right = insertBST(root.right, value);
  return root;
}
```

#### Go

```go
func InsertBST(root *Node, value int) *Node {
  if root == nil {
    return &Node{Value: value}
  }
  if value < root.Value {
    root.Left = InsertBST(root.Left, value)
  } else {
    root.Right = InsertBST(root.Right, value)
  }
  return root
}
```

### Example 3: Traversals

Traversals define how we visit nodes in a tree.

#### TypeScript

```typescript
function inorder(root?: Node): void {
  if (!root) return;
  inorder(root.left);
  console.log(root.value);
  inorder(root.right);
}

function preorder(root?: Node): void {
  if (!root) return;
  console.log(root.value);
  preorder(root.left);
  preorder(root.right);
}

function postorder(root?: Node): void {
  if (!root) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.value);
}
```

#### Go

```go
func InOrder(root *Node) {
  if root == nil { return }
  InOrder(root.Left)
  fmt.Println(root.Value)
  InOrder(root.Right)
}

func PreOrder(root *Node) {
  if root == nil { return }
  fmt.Println(root.Value)
  PreOrder(root.Left)
  PreOrder(root.Right)
}

func PostOrder(root *Node) {
  if root == nil { return }
  PostOrder(root.Left)
  PostOrder(root.Right)
  fmt.Println(root.Value)
}
```

---

## Performance and Design Insights

* **Balanced BSTs** maintain height ≈ log₂N → operations O(log N).
* **Unbalanced BSTs** degrade to O(N) (e.g., inserting sorted data).
* Self-balancing trees (AVL, Red–Black, B-Trees) solve this by maintaining height invariants.
* Traversals map naturally to recursive thinking — trees are inherently recursive structures.

### When to Use Trees

* When data must remain **sorted dynamically**.
* When relationships are **hierarchical or nested**.
* When logarithmic search/insertion performance is desired.

---

## Key Takeaways

* Trees provide hierarchical organization for efficient search and ordered data.
* BSTs offer logarithmic performance if balanced.
* Traversals (inorder, preorder, postorder) underpin many algorithms like serialization and expression parsing.
* Balance is key — unbalanced trees lose their efficiency advantage.
