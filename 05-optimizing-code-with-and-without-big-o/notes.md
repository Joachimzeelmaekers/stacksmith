# Optimizing Code with and Without Big O

## Big O Isn't Everything
- Big O helps categorize algorithm efficiency but doesn't always show which same-category algorithm is faster.
- Two algorithms with the same Big O classification may perform differently in practice.

---

## Selection Sort

### How It Works
1. Find the lowest value in the unsorted portion of the array.
2. Swap it with the first unsorted element.
3. Repeat until array is sorted.

### JavaScript Implementation

```js
function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let lowestNumberIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[lowestNumberIndex]) {
        lowestNumberIndex = j;
      }
    }
    if (lowestNumberIndex != i) {
      let temp = array[i];
      array[i] = array[lowestNumberIndex];
      array[lowestNumberIndex] = temp;
    }
  }
  return array;
}
```

### Step Breakdown
- Comparisons: For N elements → (N - 1) + (N - 2) + ... + 1 = ~N²/2
- Swaps: At most 1 per pass → up to N - 1 swaps
- Time complexity: O(N²)

### Selection Sort vs Bubble Sort

| N Elements | Bubble Sort Steps | Selection Sort Steps |
| ---------- | ----------------- | -------------------- |
| 5          | 20                | 14                   |
| 10         | 90                | 54                   |
| 20         | 380               | 199                  |
| 40         | 1560              | 819                  |
| 80         | 6320              | 3239                 |

- Both are O(N²), but Selection Sort performs fewer operations.
- Bubble Sort swaps far more frequently.

## Ignoring Constants in Big O

- Constants and lower-order terms are ignored in Big O notation. (no arbitrary numbers within categories)
  - O(N² / 2) → O(N²)
  - O(N + 10) → O(N)
  - O(2N), O(100N) → O(N)
- Big O focuses on growth rate, not exact step counts.

## Big O Categories as Growth Classes
- Think of Big O classes like building types:
  - O(N): "house"
  - O(N²): "skyscraper"
- Differences between categories matter more than constants within a category.
- O(N²) always outgrows O(N), even if O(N²) starts with fewer steps.

## Same Big O, Different Speeds
Example: Printing Even Numbers
```python
def print_numbers_version_one(upperLimit):
    number = 2
    while number <= upperLimit:
        if number % 2 == 0:
            print(number)
        number += 1

def print_numbers_version_two(upperLimit):
    number = 2
    while number <= upperLimit:
        print(number)
        number += 2
```

- Version one takes ~N steps; version two takes N / 2 steps.
- Both are O(N) due to dropped constants, but version two is twice as fast.

## Significant Steps
- All operations inside loops (comparisons, printing, incrementing) are counted as steps.
- Example: 2.5N steps → still expressed as O(N)

## Final Takeaways
- Use Big O for comparing growth categories, not absolute speed.
- Within the same Big O class, do step-level analysis to choose the faster algorithm.
- Big O doesn't capture average-case behavior until this chapter
