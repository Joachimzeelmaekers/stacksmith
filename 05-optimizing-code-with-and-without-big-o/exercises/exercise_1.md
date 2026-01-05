# Exercise 1: Simplify Big O Expressions

Use Big O Notation to describe the time complexity of an algorithm that takes 4N + 16 steps.

## Answer

**O(N)** - Drop constants and coefficients.

## Rules for Simplifying

1. Drop constants: O(2N) → O(N)
2. Drop coefficients: O(5N²) → O(N²)
3. Drop lower order terms: O(N² + N) → O(N²)
4. Keep only the dominant term

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter05/exercise01.ts`
- **Go:** `go run src/go/chapter05/exercise01/main.go`
