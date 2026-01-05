# Exercise 2: Golomb Sequence

Implement the Golomb sequence with memoization.

G(1) = 1
G(n) = 1 + G(n - G(G(n-1)))

## Key Concepts

- Without memoization: exponential time
- With memoization: O(N) time

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter12/exercise02.ts`
- **Go:** `go run src/go/chapter12/exercise02/main.go`
