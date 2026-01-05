# Chapter 10 – Recursion

## Context and Goals

Recursion allows us to define solutions by having a function call itself with smaller inputs. It is a foundational tool in computer science, used in parsing, tree traversal, divide-and-conquer algorithms, and more. Understanding recursion requires thinking in terms of *base cases*, *recursive progress*, and *composition of results*.

The goal of this chapter is to master the reasoning behind recursion, recognize when it is appropriate, and understand both its expressive power and computational costs.

---

## Core Concepts and Reasoning

### 1. The Recursive Model

A recursive solution decomposes a problem into smaller versions of itself until a base condition is met.

The three pillars of recursion are:

1. **Base Case** – Defines the simplest instance that can be solved directly.
2. **Recursive Case** – Reduces the problem into one or more smaller instances.
3. **Composition** – Combines results from smaller instances to solve the full problem.

### 2. Visualizing the Call Stack

Each recursive call creates a new frame on the call stack. Once a base case returns, frames unwind one by one. This stack mechanism is the hidden engine of recursion.

When you reason about recursion, always consider two perspectives:

* **Top-down reasoning** – Think about the original problem and how it splits into smaller subproblems.
* **Bottom-up reasoning** – Imagine the base case being solved first and results flowing upward.

---

## Examples

### Example 1: Factorial

A classic example of recursion is the factorial function.

#### TypeScript

```typescript
function factorial(n: number): number {
  if (n <= 1) return 1;  // Base case
  return n * factorial(n - 1); // Recursive case
}

console.log(factorial(5)); // 120
```

#### Go

```go
func Factorial(n int) int {
  if n <= 1 {
    return 1
  }
  return n * Factorial(n-1)
}

fmt.Println(Factorial(5)) // 120
```

### Example 2: Recursive Search in a Binary Tree

Recursion maps naturally to tree structures because each subtree is itself a smaller instance of the full tree.

#### TypeScript

```typescript
interface Node {
  value: number;
  left?: Node;
  right?: Node;
}

function contains(root: Node | undefined, target: number): boolean {
  if (!root) return false; // Base case: empty subtree
  if (root.value === target) return true;
  return contains(root.left, target) || contains(root.right, target);
}
```

#### Go

```go
type Node struct {
  Value int
  Left, Right *Node
}

func Contains(root *Node, target int) bool {
  if root == nil {
    return false
  }
  if root.Value == target {
    return true
  }
  return Contains(root.Left, target) || Contains(root.Right, target)
}
```

### Example 3: Recursion in Arrays

For sequential data, recursion can replace iteration but with more stack overhead.

#### TypeScript

```typescript
function sum(arr: number[]): number {
  if (arr.length === 0) return 0; // Base case
  return arr[0] + sum(arr.slice(1)); // Recursive case
}
```

#### Go

```go
func Sum(arr []int) int {
  if len(arr) == 0 {
    return 0
  }
  return arr[0] + Sum(arr[1:])
}
```

---

## Performance and Design Insights

* Each recursive call consumes **stack space**, so recursion depth equals the number of nested calls.
* Many recursive problems (e.g., Fibonacci) recompute overlapping subproblems, leading to exponential complexity (O(2^N)).
* Recursion is clean and expressive, but when performance or memory is critical, convert it to an iterative form.

### Tail Recursion Optimization

Some languages optimize tail-recursive functions (where the recursive call is the last statement), allowing them to run in constant stack space. JavaScript and Go do *not* guarantee tail call optimization.

### When to Use Recursion

Use recursion when:

* The problem divides naturally (trees, graphs, nested data)
* The structure is self-similar (subproblem mirrors full problem)
* Iteration complicates logic unnecessarily

Avoid recursion when:

* Depth could exceed thousands (stack overflow risk)
* State can be carried iteratively without loss of clarity

---

## Key Takeaways

* Recursion is about **self-similarity** and **problem decomposition**.
* Always define clear **base cases** and ensure progress toward them.
* Be mindful of stack usage; recursion depth = number of active calls.
* Optimize or replace recursion with iteration when performance or memory becomes a concern.
