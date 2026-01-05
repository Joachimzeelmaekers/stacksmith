# Chapter 11 – Speeding Up Recursion

## Context and Goals

While recursion provides elegant problem decomposition, it often suffers from redundant computations. This chapter focuses on techniques that retain the clarity of recursion while improving its performance — namely, **memoization** and **dynamic programming**.

You’ll learn how to identify overlapping subproblems and convert naive recursive approaches into efficient ones without losing readability.

---

## Core Concepts and Reasoning

### 1. Overlapping Subproblems

In many recursive algorithms, the same subproblem is computed multiple times. A classic case is the Fibonacci sequence:

```
F(n) = F(n - 1) + F(n - 2)
```

Naively, each call to `F(n)` triggers two further recursive calls, creating an exponential number of computations.

### 2. Caching Results (Memoization)

**Memoization** solves this inefficiency by storing the results of previously computed subproblems in a cache. When a recursive call repeats, we can return the cached value immediately instead of recomputing.

This converts exponential time (O(2^N)) into linear time (O(N)).

---

## Examples

### Example 1: Fibonacci with Memoization

#### TypeScript

```typescript
function fib(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n; // Base case
  if (memo.has(n)) return memo.get(n)!; // Cached result

  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}

console.log(fib(10)); // 55
```

#### Go

```go
func Fib(n int, memo map[int]int) int {
  if n <= 1 {
    return n
  }
  if val, ok := memo[n]; ok {
    return val
  }
  result := Fib(n-1, memo) + Fib(n-2, memo)
  memo[n] = result
  return result
}

func main() {
  memo := make(map[int]int)
  fmt.Println(Fib(10, memo)) // 55
}
```

### Example 2: Bottom-Up Dynamic Programming

When recursion depth becomes large, a bottom-up (iterative) approach can achieve the same effect without stack overhead.

#### TypeScript

```typescript
function fibIter(n: number): number {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
```

#### Go

```go
func FibIter(n int) int {
  if n <= 1 {
    return n
  }
  a, b := 0, 1
  for i := 2; i <= n; i++ {
    a, b = b, a+b
  }
  return b
}
```

Both the memoized and bottom-up versions compute each subproblem once, leading to linear time complexity.

---

## Performance and Design Insights

* **Memoization** works best for recursion that recomputes the same input multiple times.
* **Bottom-up dynamic programming** eliminates recursion overhead entirely by solving from the smallest subproblems up.
* Both techniques trade a small amount of **memory** for a large improvement in **speed**.
* Always analyze whether a recursive function exhibits *overlapping subproblems* — if yes, caching or tabulation is an immediate win.

### Comparison Summary

| Technique       | Time   | Space      | Style                   |
| --------------- | ------ | ---------- | ----------------------- |
| Naive Recursion | O(2^N) | O(N) stack | Elegant but slow        |
| Memoization     | O(N)   | O(N)       | Recursive and fast      |
| Bottom-Up DP    | O(N)   | O(1)–O(N)  | Iterative and efficient |

---

## Key Takeaways

* Identify **overlapping subproblems** to know when recursion is wasteful.
* Use **memoization** for a quick fix without refactoring logic.
* Use **bottom-up dynamic programming** for iterative efficiency and memory control.
* Always balance clarity, performance, and maintainability — recursion is elegant, but optimization often lies in iteration.
