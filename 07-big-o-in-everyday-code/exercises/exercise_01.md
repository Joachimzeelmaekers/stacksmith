# Exercise 1: Find First Duplicate

Write a function that finds the first duplicate value in an array. The function should return the first value that appears more than once when reading the array from left to right.

**Example:**
- Input: `[2, 1, 3, 5, 3, 2]`
- Output: `3` (3 appears again before 2 does)

**Requirements:**
- Implement an O(N) solution using a hash set
- Return -1 if no duplicates exist

**Complexity:**
- Time: O(N) - single pass
- Space: O(N) - hash set

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter07/exercise01.ts`
- **Go:** `go run src/go/chapter07/exercise01/main.go`
