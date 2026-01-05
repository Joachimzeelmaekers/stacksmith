# Exercise 3: Find Kth Largest Element

Use a heap to find the kth largest element in an array.

## Approaches

1. Max heap: build heap, extract k times
2. Min heap of size k: more efficient for large arrays

## Complexity

- Using max heap: O(N + k log N)
- Using min heap of size k: O(N log k)

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter16/exercise03.ts`
- **Go:** `go run src/go/chapter16/exercise03/main.go`
