# Exercise 3: Valid Parentheses

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

## Rules

- Open brackets must be closed by the same type of brackets
- Open brackets must be closed in the correct order

**Key Insight:** Use a stack to track opening brackets. When you see a closing bracket, check if it matches the most recent opening bracket.

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter09/exercise03.ts`
- **Go:** `go run src/go/chapter09/exercise03/main.go`
