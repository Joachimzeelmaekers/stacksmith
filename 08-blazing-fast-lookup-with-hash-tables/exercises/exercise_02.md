# Exercise 2: Longest Consecutive Sequence

Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

**Example:**
- Input: `[100, 4, 200, 1, 3, 2]`
- Output: `4` (The longest consecutive sequence is [1, 2, 3, 4])

**Requirements:**
- Implement an O(N) solution using a hash set
- Do not sort the array

**Key Insight:**
- Only start counting from numbers that are the beginning of a sequence (no num-1 exists)
- This ensures we don't recount sequences from the middle

**Complexity:**
- Time: O(N) - each number visited at most twice
- Space: O(N) - for the hash set

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter08/exercise02.ts`
- **Go:** `go run src/go/chapter08/exercise02/main.go`
