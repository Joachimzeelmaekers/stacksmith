# Exercise 1: Eliminate Unnecessary Recursive Calls

The following function makes unnecessary recursive calls. Fix the code to eliminate redundant recursion:

```ruby
def add_until_100(array)
  return 0 if array.length == 0
  if array[0] + add_until_100(array[1, array.length - 1]) > 100
    return add_until_100(array[1, array.length - 1])
  else
    return array[0] + add_until_100(array[1, array.length - 1])
  end
end
```

## Problem

The recursive call is made up to 3 times in each iteration.

## Solution

Store the result of the recursive call in a variable.

**Before Optimization:** O(3^N) - exponential
**After Optimization:** O(N) - linear

**Key Insight:** When you see the same function call repeated, store the result in a variable. This is the foundation of memoization.

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter12/exercise01.ts`
- **Go:** `go run src/go/chapter12/exercise01/main.go`
