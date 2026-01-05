# Chapter 19 – Greedy Algorithms

## Context and Goals

Greedy algorithms build solutions incrementally by choosing the *locally optimal* step at each stage, assuming it leads to a global optimum. While not always correct for every problem, when applicable, greedy strategies deliver elegant, fast, and easy-to-implement solutions.

This chapter focuses on understanding when the greedy method works, implementing key examples, and analyzing the structure of greedy correctness.

---

## Core Concepts and Reasoning

### 1. Greedy Choice Property

A problem exhibits the **greedy-choice property** if a global optimum can be achieved by making a locally optimal choice at each step.

### 2. Optimal Substructure

A problem has **optimal substructure** if an optimal solution to the problem contains optimal solutions to its subproblems. This is what allows greedy strategies and dynamic programming to both work — though they use different reasoning.

### 3. When Greedy Works

* Local choices must lead naturally toward a global optimum.
* Decisions are irreversible (no backtracking or recomputation).
* The solution space must allow incremental construction.

---

## Examples

### Example 1: Interval Scheduling

Select the maximum number of non-overlapping intervals based on their end times.

#### TypeScript

```typescript
type Interval = [number, number];

function maxNonOverlappingIntervals(intervals: Interval[]): Interval[] {
  intervals.sort((a, b) => a[1] - b[1]); // Sort by end time
  const result: Interval[] = [];
  let lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      result.push([start, end]);
      lastEnd = end;
    }
  }
  return result;
}
```

#### Go

```go
type Interval struct { Start, End int }

func MaxNonOverlappingIntervals(intervals []Interval) []Interval {
  sort.Slice(intervals, func(i, j int) bool { return intervals[i].End < intervals[j].End })
  var result []Interval
  lastEnd := -1 << 31
  for _, iv := range intervals {
    if iv.Start >= lastEnd {
      result = append(result, iv)
      lastEnd = iv.End
    }
  }
  return result
}
```

### Example 2: Coin Change (Greedy)

When coin denominations are canonical (e.g., US currency), a greedy strategy yields the fewest coins.

#### TypeScript

```typescript
function coinChangeGreedy(coins: number[], amount: number): number[] {
  coins.sort((a, b) => b - a);
  const result: number[] = [];
  for (const coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      result.push(coin);
    }
  }
  return result;
}

console.log(coinChangeGreedy([25, 10, 5, 1], 63)); // [25, 25, 10, 1, 1, 1]
```

#### Go

```go
func CoinChangeGreedy(coins []int, amount int) []int {
  sort.Sort(sort.Reverse(sort.IntSlice(coins)))
  var result []int
  for _, c := range coins {
    for amount >= c {
      amount -= c
      result = append(result, c)
    }
  }
  return result
}
```

### Example 3: Huffman Coding

Greedy algorithms can minimize the average code length for character frequencies.

* Build a forest of trees sorted by frequency.
* Repeatedly merge the two smallest trees.
* The result is an optimal prefix code.

Time complexity: O(N log N) due to heap operations.

---

## Performance and Design Insights

* Greedy algorithms are often **simpler and faster** than dynamic programming.
* Proving correctness requires showing both **greedy-choice property** and **optimal substructure**.
* Some problems (like shortest paths with negative edges) **cannot** be solved greedily.
* Common use cases: scheduling, compression, spanning trees, and resource allocation.

### Complexity Summary

| Problem             | Time       | Space |
| ------------------- | ---------- | ----- |
| Interval Scheduling | O(N log N) | O(N)  |
| Coin Change         | O(N × k)   | O(k)  |
| Huffman Coding      | O(N log N) | O(N)  |

---

## Key Takeaways

* Greedy algorithms make locally optimal choices to build global solutions.
* They work only when problems have both **optimal substructure** and **greedy-choice property**.
* They often yield elegant, fast, and memory-efficient code.
* Always verify the problem structure before applying a greedy approach.
