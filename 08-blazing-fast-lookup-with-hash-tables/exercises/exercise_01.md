# Exercise 1: Group Anagrams

Given an array of strings, group anagrams together.

**Example:**
- Input: `["eat", "tea", "tan", "ate", "nat", "bat"]`
- Output: `[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]`

**Requirements:**
- Two strings are anagrams if they contain the same characters in any order
- Use a hash map for O(N × K) time where K is the max string length

**Complexity:**
- Sorting method: O(N × K log K)
- Count method: O(N × K) - no sorting needed ✓

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter08/exercise01.ts`
- **Go:** `go run src/go/chapter08/exercise01/main.go`
