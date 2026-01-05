# Speeding Up Your Code with Big O

## Using Big O to Evaluate and Improve Code
- Big O helps determine if an algorithm is fast or slow.
- If your code falls into a slow category (e.g., O(N²)), consider optimizing to a faster one (e.g., O(N)) when possible.

## Bubble Sort: A Classic Inefficient Algorithm

### What It Solves
- Sorts an unsorted array into ascending order.

### How Bubble Sort Works
1. Compare two adjacent elements.
2. Swap if the left is greater than the right.
3. Move to the next pair and repeat to the end.
4. If any swaps occurred, restart from the beginning.
5. Stop once a full pass makes no swaps.

### Key Insights
- The largest unsorted value "bubbles up" to the correct position in each pass.
- "exponential" or "quadratic" increase when the array grows O (N^2)

### Python Implementation

```python
def bubble_sort(list):
    unsorted_until_index = len(list) - 1
    sorted = False
    while not sorted:
        sorted = True
        for i in range(unsorted_until_index):
            if list[i] > list[i+1]:
                list[i], list[i+1] = list[i+1], list[i]
                sorted = False
        unsorted_until_index -= 1
    return list
```


# Analyzing Bubble Sort's Efficiency

## Types of Steps

- **Comparisons**: Compare adjacent elements.
- **Swaps**: Swap elements when out of order.

## Growth Table

| N Elements | Steps (Comparisons + Swaps) | \(N^2\) |
|------------|-----------------------------|--------|
| 5          | 20                          | 25     |
| 10         | 90                          | 100    |
| 20         | 380                         | 400    |
| 40         | 1560                        | 1600   |
| 80         | 6320                        | 6400   |

## Conclusion

Bubble Sort is **O(N²)**: slow for large datasets.

Compared to **O(N)** algorithms, it becomes increasingly inefficient as **N** grows.

---

# Quadratic Problem: Duplicate Detection
## Naive O(N²) Approach

```js
function hasDuplicateValue(array) {
  for(let i = 0; i < array.length; i++) {
    for(let j = 0; j < array.length; j++) {
      if(i !== j && array[i] === array[j]) {
        return true;
      }
    }
  }
  return false;
}
```

- Uses nested loops to compare each value with every other.
- Worst-case: All unique → N² comparisons.
- Time complexity: O(N²)

## Step Counter Test

```js
function hasDuplicateValue(array) {
  let steps = 0;
  for(let i = 0; i < array.length; i++) {
    for(let j = 0; j < array.length; j++) {
      steps++;
      if(i !== j && array[i] === array[j]) {
        return true;
      }
    }
  }
  console.log(steps);
  return false;
}
```

# Optimized Linear Solution: O(N)
## Efficient Approach Using Auxiliary Storage

```js
function hasDuplicateValue(array) {
  let existingNumbers = [];
  for(let i = 0; i < array.length; i++) {
    if(existingNumbers[array[i]] === 1) {
      return true;
    } else {
      existingNumbers[array[i]] = 1;
    }
  }
  return false;
}
```

## How It Works
- Uses an array (existingNumbers) to track seen values.
- On each iteration, checks if the number has already been seen.
- Only one loop → Time complexity: O(N)
- Tradeoff: Uses more memory than the nested loop version.

## Step Counter Test

```js
function hasDuplicateValue(array) {
  let steps = 0;
  let existingNumbers = [];
  for(let i = 0; i < array.length; i++) {
    steps++;
    if(existingNumbers[array[i]] === 1) {
      return true;
    } else {
      existingNumbers[array[i]] = 1;
    }
  }
  console.log(steps);
  return false;
}
```

# Final Takeaways

- Big O lets you measure and compare algorithm efficiency.
- Always consider optimizing O(N²) algorithms to faster forms like O(N).
