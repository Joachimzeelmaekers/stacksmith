# Why Algorithms Matter

The first chapter of the book about:
1. The Ordered Array
2. Linear Search
3. Binary Search
4. Binary vs Linear Search

## Ordered Array

This is an array that is always ordered. Meaning that we can trust the values to be in the correct order at all times.
An example of an ordered array is `[1, 7, 20, 88]`.

An ordered array has a different insert operation to the normal array. The normal array inserts the items at the end of the array, without moving anything around. The ordered array always first has to do a search to see where a certain item need to be inserted.

To give an example:

Let's say we want to insert `17` into our example array of `[1, 7, 20, 88]`.

1. We will do a comparison starting on the first element of the array. `17` is greater than `1`, so we need to jump to the next element. `17` is still greater than `7` so we go to the next element. `17` is smaller than `20`, so we know our location where we need to insert.
2. Now we need to make space for the `17` to be inserted, so we shift all elements starting with the `20` to the right.
3. We can insert the `17` on the location where `20` was before.

We can define this type of insertion as N + 2 steps. Even if we find the value early on in the array, we still need to shift all other elements to the right to make space for the value to be inserted.

## Searching an ordered array

We discussed searching an array earlier, but applying a linear search on an ordered array is much more efficient than a classic array. To give an example:

Let's say we want to search for a non-existing value in a normal array. We would have to evaluate each value of the array to make sure that the value is not present in the array. This would take N-steps.

For an ordered array, it takes fewer steps. Let's search for `17` in our example array `[1, 7, 20, 88]`.

1. We check the first value of the array, which is `1`, so we need to check the next value since `17` is greater than `1`.
2. The second value is `7`, so we need to check the next value since it's smaller than `17`.
3. The third value is `20`. This is greater than `17` so we know that `17` is not present in the array.

As you can see, we take 1 step less than a normal search in this example. This wouldn't matter for small arrays, but when we are talking about an array of `100 000` items, this would be a way more efficient search.

### Code samples for linear search

#### Typescript

```ts
function linearSearch<T>(list: T[], targetValue: T): number {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === targetValue) {
      return i; // Target found
    }
  }
  return -1; // Target not found
}
```

#### Go
```go
package main

import (
	"fmt"
)

func linearSearch(list []int, target_value int) int {
	for i, v := range list {
		if v == target_value {
			return i // Target found
		}
	}
	return -1 // Target not found
}
```

## Binary Search

As we saw in the previous example, the ordered array allows us to use the linear search algorithm to search for an element. But there is a different type of search that is possible with this type of array. The Binary Search.

The Binary search can be explained fairly easily by explaining a guessing game higher/lower.

I am thinking of a number between `1` and `10`, and I can only say higher or lower. This game essentially applies the binary search if you want to optimally play this game.

1. the first guess that you make would be `5` as it would immediately cut the options in half.
2. If the person says lower, you know that `5, 6, 7, 8, 9` and `10` are not relevant anymore. This gives you `4` remaining options: `1, 2, 3` and `4`
3. You'd now likely say `2` or `3`. let's take `2` as an example. The answer is higher. This makes `1` and `2` irrelevant.
4. So it can only be `3` or `4`. We say `3` and they say higher so we know the answer is `4`.

This made us search the entire array of items in only 4 steps.

A binary search is only possible on an ordered array. If you don't sort the array, it's impossible for the binary search to work as it can't eliminate options like we did in the higher/lower game.

### Code samples for binary search

#### Typescript

```ts

function binarySearch(list: number[], targetValue: number): number {
  let left = 0;
  let right = list.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1;

    if (list[mid] === targetValue) return mid;

    if (list[mid] < targetValue) {
      left = mid + 1;
      continue;
    }

    right = mid - 1;
  }

  return -1;
}
```

#### Go

```go
package main

import (
	"fmt"
)

func binarySearch(list []int, targetValue int) int {
	left := 0
	right := len(list) - 1

	for left <= right {
		mid := (left + right) / 2

		if list[mid] == targetValue {
			return mid
		}

		if list[mid] < targetValue {
			left = mid + 1
			continue
		}

		right = mid - 1
	}

	return -1
}
```

## Linear Search vs Binary Search

Based on the examples that we have discussed earlier in these notes, we did not show the power of the binary search vs the linear search since our examples were very small. But for an array of 100 elements we can clearly see a difference:

1. The Linear search: takes 100 steps to search
2. The Binary search: takes 7 steps to search

We can state based on that example that the more elements there are in an ordered list, the more efficient the binary search is compared to the linear search. To give you an idea of the difference in steps for an array of 200 elements, the linear search would take 200 steps, while the binary search would only take 8 steps.

We can confidently say that every time we double the size of the ordered list, we only add 1 step to the binary search, while the linear search would double in steps.

Note: Remember we're only talking about searching here. If you have an insert-heavy array, you might want to consider a different type of array since inserting in an ordered array can be drastically more expensive than in a simple array.
