# Chapter Summary: Optimizing for Optimistic Scenarios

## Worst Case Isn’t Everything
- Big O usually reflects **worst-case performance**, but it's crucial to also consider **average** and **best-case** scenarios.
- Optimizing for realistic cases often yields better practical performance.

## Insertion Sort

### How It Works
1. Temporarily remove the current value.
2. Shift all larger values to the right.
3. Insert the removed value in the correct spot.
4. Repeat until the end of the array is reached.

### Python Implementation

```python
def insertion_sort(array):
    for index in range(1, len(array)):
        temp_value = array[index]
        position = index - 1
        while position >= 0:
            if array[position] > temp_value:
                array[position + 1] = array[position]
                position = position - 1
            else:
                break
        array[position + 1] = temp_value
    return array
```

## Insertion Sort Efficiency
### Step Types
- Comparisons: Each value compared to those on its left.
- Shifts: Larger values shifted one cell right.
- Removals and Insertions: One per pass-through.

### Worst Case (Descending Order)
- Comparisons and shifts: ~N²/2 each → N² total
- Removals and insertions: N - 1 each
- Total steps: N² + 2N - 2
- Big O: O(N²) (highest order dominates)

### Big O Rule Reminder
- Ignore constants and lower-order terms:
- O(N² + N) → O(N²)
- O(N⁴ + N³ + N² + N) → O(N⁴)

## Best, Average, and Worst Case Performance

| Scenario        | Comparisons | Shifts | Total Steps | Big O |
| --------------- | ----------- | ------ | ----------- | ----- |
| Best (sorted)   | N - 1       | 0      | \~N         | O(N)  |
| Average         | \~N²/4      | \~N²/4 | \~N²/2      | O(N²) |
| Worst (reverse) | \~N²/2      | \~N²/2 | \~N²        | O(N²) |

- Insertion Sort can end early during a pass if the item is in the right place.
- More efficient in practice than Selection Sort for nearly sorted data.

## Comparison: Selection Sort vs Insertion Sort

| Sort Type      | Best Case | Average Case | Worst Case | Notes                               |
| -------------- | --------- | ------------ | ---------- | ----------------------------------- |
| Selection Sort | O(N²)     | O(N²)        | O(N²)      | No early exits, always compares all |
| Insertion Sort | O(N)      | O(N²)        | O(N²)      | Ends early if values already sorted |

## Practical Example: Array Intersection
### Naive Approach (O(N²))

```js
function intersection(firstArray, secondArray){
  let result = [];
  for (let i = 0; i < firstArray.length; i++) {
    for (let j = 0; j < secondArray.length; j++) {
      if (firstArray[i] == secondArray[j]) {
        result.push(firstArray[i]);
      }
    }
  }
  return result;
}
```
- Compares each element of the first array with every element of the second.
- Time complexity: O(N²) in all cases.

### Optimized with Early Exit

```js
function intersection(firstArray, secondArray){
  let result = [];
  for (let i = 0; i < firstArray.length; i++) {
    for (let j = 0; j < secondArray.length; j++) {
      if (firstArray[i] == secondArray[j]) {
        result.push(firstArray[i]);
        break;
      }
    }
  }
  return result;
}
```
- Adds `break` to avoid unnecessary comparisons.
- Worst case: still O(N²)
- Best case (arrays are identical): O(N)
- Average case: performance improves over naive version.


## Final Takeaways
- Worst-case analysis is important but not sufficient.
- Understand and optimize for average-case, which occurs most often.
- Even if Big O classification remains the same, real-world performance can differ greatly.
- Smart exits (like break) and early termination can significantly boost performance.
