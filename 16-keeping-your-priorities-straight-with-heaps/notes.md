# Chapter 16 – Heaps

## Context and Goals

Heaps are specialized binary trees that efficiently support *priority-based retrieval*. They ensure that the smallest or largest element (depending on the type) is always at the root. This chapter explores how heaps maintain order, how they map naturally to arrays, and how they underpin efficient algorithms like priority queues and heapsort.

---

## Core Concepts and Reasoning

### 1. Heap Structure

A **binary heap** is a complete binary tree that satisfies the **heap property**:

* **Min-heap:** Every parent node ≤ its children.
* **Max-heap:** Every parent node ≥ its children.

Because it’s *complete*, the tree is compact and can be stored efficiently in an array:

* Parent index `i`
* Left child index `2i + 1`
* Right child index `2i + 2`

### 2. Operations Overview

| Operation          | Time Complexity | Description                               |
| ------------------ | --------------- | ----------------------------------------- |
| Insert (push)      | O(log N)        | Add to end, sift up to restore order      |
| Remove root (pop)  | O(log N)        | Replace root with last element, sift down |
| Peek (get min/max) | O(1)            | Return root without removing              |

---

## Examples

### Example 1: Min-Heap Implementation

#### TypeScript

```typescript
class MinHeap {
  private data: number[] = [];

  private parent(i: number) { return Math.floor((i - 1) / 2); }
  private left(i: number) { return 2 * i + 1; }
  private right(i: number) { return 2 * i + 2; }

  push(value: number): void {
    this.data.push(value);
    this.siftUp(this.data.length - 1);
  }

  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const root = this.data[0];
    const end = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = end;
      this.siftDown(0);
    }
    return root;
  }

  private siftUp(i: number): void {
    while (i > 0) {
      const p = this.parent(i);
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  private siftDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const l = this.left(i), r = this.right(i);
      if (l < n && this.data[l] < this.data[smallest]) smallest = l;
      if (r < n && this.data[r] < this.data[smallest]) smallest = r;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}
```

#### Go

```go
type MinHeap struct {
  data []int
}

func (h *MinHeap) push(x int) {
  h.data = append(h.data, x)
  h.siftUp(len(h.data) - 1)
}

func (h *MinHeap) pop() (int, bool) {
  if len(h.data) == 0 {
    return 0, false
  }
  root := h.data[0]
  end := h.data[len(h.data)-1]
  h.data = h.data[:len(h.data)-1]
  if len(h.data) > 0 {
    h.data[0] = end
    h.siftDown(0)
  }
  return root, true
}

func (h *MinHeap) siftUp(i int) {
  for i > 0 {
    p := (i - 1) / 2
    if h.data[p] <= h.data[i] {
      break
    }
    h.data[p], h.data[i] = h.data[i], h.data[p]
    i = p
  }
}

func (h *MinHeap) siftDown(i int) {
  n := len(h.data)
  for {
    smallest := i
    l, r := 2*i+1, 2*i+2
    if l < n && h.data[l] < h.data[smallest] {
      smallest = l
    }
    if r < n && h.data[r] < h.data[smallest] {
      smallest = r
    }
    if smallest == i {
      break
    }
    h.data[i], h.data[smallest] = h.data[smallest], h.data[i]
    i = smallest
  }
}
```

---

### Example 2: Heapsort

Heapsort first builds a heap, then repeatedly extracts the smallest (or largest) element.

#### TypeScript

```typescript
function heapSort(arr: number[]): number[] {
  const heap = new MinHeap();
  for (const n of arr) heap.push(n);
  const sorted: number[] = [];
  while (true) {
    const val = heap.pop();
    if (val === undefined) break;
    sorted.push(val);
  }
  return sorted;
}
```

#### Go

```go
func HeapSort(arr []int) []int {
  h := &MinHeap{}
  for _, v := range arr {
    h.push(v)
  }
  var sorted []int
  for {
    val, ok := h.pop()
    if !ok {
      break
    }
    sorted = append(sorted, val)
  }
  return sorted
}
```

---

## Performance and Design Insights

* Heap operations (push/pop) run in **O(log N)** due to the height of the tree.
* Building a heap from an array can be done in **O(N)** using bottom-up construction.
* **Heapsort** runs in **O(N log N)** and can be done in-place.
* Heaps underpin **priority queues**, **Dijkstra’s algorithm**, and **event simulation systems**.

### When to Use

* When you need dynamic ordering (e.g., job schedulers, median finders).
* When repeatedly fetching min/max efficiently matters.

---

## Key Takeaways

* A heap maintains partial order efficiently using array-based tree representation.
* Push and pop operations are logarithmic, making heaps ideal for priority management.
* Heapsort leverages heap structure for efficient in-place sorting.
* Heaps form the foundation for several graph and optimization algorithms.
