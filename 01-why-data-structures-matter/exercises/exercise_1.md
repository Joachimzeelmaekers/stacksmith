# Exercise 1: Array Operations Step Count

For an array containing 100 elements, provide the number of steps the following operations would take:

### Reading

When reading a specific element at a set index, it will be 1 step.

### Searching for a value not contained within the array

1 step for each element so 100 steps.

### Insertion at the beginning of the array

1 step to insert, and 100 steps to move the other elements by 1 so 101 steps.

### Insertion at the end of the array

1 step.

### Deletion at the beginning of the array

1 step to delete and 99 steps to move the other elements, so 100 steps.

### Deletion at the end of the array

1 step.

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter01/exercise01.ts`
- **Go:** `go run src/go/chapter01/exercise01/main.go`
