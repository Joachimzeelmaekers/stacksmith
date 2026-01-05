# Exercise 1: Find Greatest Value in BST

Write an algorithm that finds the greatest value within a binary search tree.

## Key Insight

In a BST, the greatest value is always in the rightmost node. Keep going right until you can't.

## Complexity

- Time: O(log N) average, O(N) worst case
- Space: O(1)

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter15/exercise01.ts`
- **Go:** `go run src/go/chapter15/exercise01/main.go`
