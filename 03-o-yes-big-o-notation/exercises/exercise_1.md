# Exercise 1: Leap Year - Time Complexity

Use Big O Notation to describe the time complexity of the following function that determines whether a given year is a leap year:

```
function isLeapYear(year) {
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}
```

## Answer

**O(1)** - The function only performs arithmetic operations, no loops or recursion.

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter03/exercise01.ts`
- **Go:** `go run src/go/chapter03/exercise01/main.go`
