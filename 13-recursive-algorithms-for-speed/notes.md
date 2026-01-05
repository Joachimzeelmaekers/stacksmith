# Chapter 13 – Space Complexity

## Context and Goals

Performance optimization is not just about time; **memory usage** can be equally critical. Space complexity measures how much extra memory an algorithm requires beyond its input data. This chapter introduces how to reason about auxiliary space and understand the trade-offs between speed, memory, and code simplicity.

---

## Core Concepts and Reasoning

### 1. Definitions

* **Total space**: All memory consumed during execution (inputs + auxiliary data + recursion stack).
* **Auxiliary space**: Additional memory used beyond the input itself.

An algorithm that modifies data in place without extra structures is considered **space-efficient**.

### 2. Sources of Space Consumption

* **Variables and constants**: Fixed-size, usually negligible.
* **Dynamic data structures**: Arrays, hash maps, trees.
* **Recursion stack**: Each recursive call adds a new frame to the call stack.

### 3. Measuring Space Complexity

Focus on *growth rate* with respect to input size N, not on specific hardware memory units. For example:

| Algorithm            | Space Complexity | Description                      |
| -------------------- | ---------------- | -------------------------------- |
| Iterative sum        | O(1)             | Constant extra variables         |
| Recursive sum        | O(N)             | One stack frame per call         |
| Mergesort            | O(N)             | Temporary merged array           |
| Quicksort (in-place) | O(log N)         | Stack frames for recursion depth |

---

## Examples

### Example 1: Recursive vs. Iterative Summation

#### TypeScript

```typescript
function recursiveSum(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr[0] + recursiveSum(arr.slice(1)); // Uses new stack frame each call
}

function iterativeSum(arr: number[]): number {
  let total = 0;
  for (const n of arr) total += n; // O(1) auxiliary space
  return total;
}
```

#### Go

```go
func RecursiveSum(arr []int) int {
  if len(arr) == 0 {
    return 0
  }
  return arr[0] + RecursiveSum(arr[1:]) // Each call adds stack frame
}

func IterativeSum(arr []int) int {
  total := 0
  for _, n := range arr {
    total += n // O(1) auxiliary space
  }
  return total
}
```

### Example 2: Mergesort vs. Heapsort

* **Mergesort**: Requires temporary arrays → O(N) space.
* **Heapsort**: Operates in-place → O(1) auxiliary space, but with less predictable cache behavior.

---

## Performance and Design Insights

* Recursive algorithms implicitly use space for their call stacks.
* Iterative conversions can reduce space from O(N) to O(1) but sometimes at the cost of readability.
* Using extra memory (like hash maps or DP tables) often reduces time complexity — a common **time-space trade-off**.
* For large-scale systems, excessive memory allocations can cause GC pressure or cache misses even if asymptotic space seems acceptable.

### Example: Time–Space Trade-Off

A lookup table can precompute results at O(N) space but reduce future computations to O(1):

#### TypeScript

```typescript
const fibTable = [0, 1];
for (let i = 2; i < 1000; i++) fibTable[i] = fibTable[i - 1] + fibTable[i - 2]; // O(N) space, O(1) lookup
```

#### Go

```go
fibTable := make([]int, 1000)
fibTable[0], fibTable[1] = 0, 1
for i := 2; i < 1000; i++ {
  fibTable[i] = fibTable[i-1] + fibTable[i-2]
}
// O(N) space but constant-time access
```

---

## Key Takeaways

* Space complexity tracks *additional* memory, not total system usage.
* **Recursion depth** adds implicit space via the call stack.
* Optimize memory only when it’s a bottleneck — clarity and maintainability often matter more.
* Time–space trade-offs are central: using more memory can make programs faster, and vice versa.
