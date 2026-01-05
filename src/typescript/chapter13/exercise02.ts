/**
 * Exercise 2: Quickselect - Find Kth Smallest
 *
 * Implement quickselect to find the kth smallest element in an unsorted array.
 * This runs in O(n) average time.
 */

function partition(arr: number[], left: number, right: number): number {
  const pivotIndex = right;
  const pivot = arr[pivotIndex];
  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
  return i;
}

function quickselect(arr: number[], k: number): number {
  const kIndex = k - 1;
  let left = 0;
  let right = arr.length - 1;

  while (true) {
    const pivotIndex = partition(arr, left, right);

    if (pivotIndex === kIndex) {
      return arr[pivotIndex];
    } else if (pivotIndex < kIndex) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }
}

console.log("=== Quickselect - Find Kth Smallest ===\n");

const arr = [8, 5, 2, 9, 7, 6, 3];
console.log(`Array: [${arr.join(", ")}]\n`);
console.log(
  `Sorted would be: [${[...arr].sort((a, b) => a - b).join(", ")}]\n`
);

for (let k = 1; k <= arr.length; k++) {
  const result = quickselect([...arr], k);
  console.log(`  ${k}${getSuffix(k)} smallest: ${result}`);
}

function getSuffix(n: number): string {
  if (n >= 11 && n <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
