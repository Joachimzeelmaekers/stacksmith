# Yes! Big O Notation

## Introduction to Big O
- Big O Notation describes **algorithm efficiency** in terms of steps relative to input size `N`.
- Instead of using fixed step counts (e.g., 22 steps), Big O generalizes step growth as `N` changes.
- Example: Linear search takes `N` steps for `N` elements → **O(N)**.

## Purpose of Big O
- Offers a **consistent, concise language** for expressing algorithm performance.
- Answers the **key question**: _If there are N data elements, how many steps will the algorithm take?_

## Examples of Big O Notation

### O(N): Linear Time
- **Linear Search**: In worst case, checks every element → **O(N)**.
- Performance grows **proportionally** with input size.

### O(1): Constant Time
- **Array Lookup**: Accessing any index takes one step → **O(1)**.
- Step count remains the **same regardless of input size**.

## The “Soul” of Big O
- Big O expresses **how step count scales** as data increases—not exact steps.
- O(1), O(3), O(100) are all treated as **O(1)** since steps don’t grow with `N`.
- **O(N)** increases with `N`, so it's less efficient as `N` grows large.

## Best- vs. Worst-Case
- **Linear search** is:
  - Best-case: O(1) (item found first)
  - Worst-case: O(N) (item found last or not at all)
- By convention, Big O usually refers to the **worst-case** scenario.

## O(log N): Logarithmic Time
- **Binary Search**: Halves the data each step → **O(log N)**.
- Grows much slower than O(N), more efficient for large datasets.
- Each doubling of `N` adds just **one extra step**.

## Understanding Logarithms
- **Logarithm = number of times N can be divided by 2 to reach 1**.
  - Example: log₂(8) = 3 → 8 → 4 → 2 → 1
- In Big O, log usually means **log base 2**.

### Efficiency Comparison Table

| N Elements | O(N) Steps | O(log N) Steps |
|------------|------------|----------------|
| 8          | 8          | 3              |
| 64         | 64         | 6              |
| 1024       | 1024       | 10             |

## Summary
- **O(1)**: Constant steps (best performance)
- **O(log N)**: Logarithmic steps (efficient)
- **O(N)**: Linear steps (slower as `N` grows)
