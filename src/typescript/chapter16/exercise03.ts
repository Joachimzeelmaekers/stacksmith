/**
 * Exercise 3: Heap Sort
 *
 * Implement heap sort using a max-heap.
 */

function heapSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr: number[], heapSize: number, rootIndex: number): void {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== rootIndex) {
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    heapify(arr, heapSize, largest);
  }
}

console.log("=== Heap Sort ===\n");

const testCases = [
  [64, 34, 25, 12, 22, 11, 90],
  [5, 4, 3, 2, 1],
  [1, 2, 3, 4, 5],
  [3, 1, 4, 1, 5, 9, 2, 6],
];

for (const test of testCases) {
  const original = [...test];
  const sorted = heapSort([...test]);
  console.log(`Original: [${original.join(", ")}]`);
  console.log(`  Sorted: [${sorted.join(", ")}]\n`);
}

console.log("✓ Heap Sort: O(n log n) time, O(1) space (in-place)");

