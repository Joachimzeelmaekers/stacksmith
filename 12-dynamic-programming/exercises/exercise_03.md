# Exercise 3: Unique Paths with Memoization

Count unique paths in a grid with memoization to avoid redundant calculations.

## Key Concepts

- Base case: 1 row or 1 column = 1 path
- Recursive case: paths(rows-1, cols) + paths(rows, cols-1)
- Memoization caches previously computed results

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter12/exercise03.ts`
- **Go:** `go run src/go/chapter12/exercise03/main.go`
