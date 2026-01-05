# Chapter 12 – Divide and Conquer

## Context and Goals

Divide and Conquer is a design paradigm where a problem is broken down into smaller, independent subproblems, each of which is solved recursively and then combined to produce the final result. The goal is to reduce the problem size at each step, yielding better scalability and simpler reasoning.

This chapter shows how to identify problems suitable for Divide and Conquer, reason about their efficiency, and implement them in a clear, recursive structure.

---

## Core Concepts and Reasoning

### 1. The Three Steps of Divide and Conquer

1. **Divide** – Split the problem into smaller, independent pieces.
2. **Conquer** – Solve each subproblem recursively.
3. **Combine** – Merge the results to form the overall solution.

This structure is typical of sorting, searching, and geometric algorithms.

### 2. Recurrence and Complexity

For many Divide and Conquer algorithms, runtime follows a recurrence relation of the form:

```
T(N) = a * T(N/b) + f(N)
```

Where:

* `a` = number of subproblems
* `N/b` = size of each subproblem
* `f(N)` = cost of combining results

For example, Mergesort uses `a=2`, `b=2`, `f(N)=O(N)`, resulting in `T(N) = O(N log N)`.

### 3. Characteristics

* Works best when subproblems are **independent** and **similar**.
* Often leads to **logarithmic recursion depth**.
* Enables **parallelism** since subproblems can be solved concurrently.

---

## Examples

### Example 1: Mergesort

Mergesort is a canonical example of Divide and Conquer sorting.

#### TypeScript

```typescript
function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr; // Base case
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right); // Combine step
}
```

#### Go

```go
func merge(left, right []int) []int {
  result := make([]int, 0, len(left)+len(right))
  i, j := 0, 0
  for i < len(left) && j < len(right) {
    if left[i] <= right[j] {
      result = append(result, left[i])
      i++
    } else {
      result = append(result, right[j])
      j++
    }
  }
  result = append(result, left[i:]...)
  result = append(result, right[j:]...)
  return result
}

func mergeSort(arr []int) []int {
  if len(arr) <= 1 {
    return arr
  }
  mid := len(arr) / 2
  left := mergeSort(arr[:mid])
  right := mergeSort(arr[mid:])
  return merge(left, right)
}
```

### Example 2: Binary Search

Binary Search halves the input each time, illustrating logarithmic recursion depth.

#### TypeScript

```typescript
function binarySearch(arr: number[], target: number, low = 0, high = arr.length - 1): number {
  if (low > high) return -1; // Base case
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] === target) return mid;
  if (target < arr[mid]) return binarySearch(arr, target, low, mid - 1);
  return binarySearch(arr, target, mid + 1, high);
}
```

#### Go

```go
func BinarySearch(arr []int, target, low, high int) int {
  if low > high {
    return -1
  }
  mid := (low + high) / 2
  if arr[mid] == target {
    return mid
  } else if target < arr[mid] {
    return BinarySearch(arr, target, low, mid-1)
  }
  return BinarySearch(arr, target, mid+1, high)
}
```

---

## Performance and Design Insights

* Each level of recursion performs O(N) total work across subproblems.
* Recursion depth ≈ log₂N for balanced splits.
* Typical complexity: O(N log N) for sorting, O(log N) for binary search.
* Avoid using Divide and Conquer if combining results is costly or subproblems overlap heavily.

### Comparison with Dynamic Programming

| Technique           | Subproblems | Overlap | Combination            |
| ------------------- | ----------- | ------- | ---------------------- |
| Divide & Conquer    | Independent | None    | Combine results        |
| Dynamic Programming | Overlapping | High    | Cache or table results |

---

## Key Takeaways

* Divide and Conquer decomposes problems into smaller, **independent** subproblems.
* Mergesort and Binary Search are classic examples with O(N log N) and O(log N) complexity.
* Focus on **balanced partitioning** and efficient **combination**.
* Analyze recursion using recurrence relations to anticipate performance.
