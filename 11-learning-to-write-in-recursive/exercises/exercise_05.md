# Exercise 5: Staircase Problem

Count the number of ways to climb N stairs, taking 1, 2, or 3 steps at a time.

## Key Concepts

- Base case: 0 stairs = 1 way
- Recursive case: ways(n-1) + ways(n-2) + ways(n-3)
- Benefits from memoization

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter11/exercise05.ts`
- **Go:** `go run src/go/chapter11/exercise05/main.go`
