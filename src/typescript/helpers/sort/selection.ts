export function selectionSort(inputArray: number[]): {
  sorted: number[];
  comparisons: number;
  swaps: number;
} {
  const sortedArray = [...inputArray];
  let comparisonCount = 0;
  let swapCount = 0;

  for (
    let currentIndex = 0;
    currentIndex < sortedArray.length - 1;
    currentIndex++
  ) {
    let minValueIndex = currentIndex;

    for (
      let scanIndex = currentIndex + 1;
      scanIndex < sortedArray.length;
      scanIndex++
    ) {
      comparisonCount++;

      if (sortedArray[scanIndex] < sortedArray[minValueIndex]) {
        minValueIndex = scanIndex;
      }
    }

    if (minValueIndex !== currentIndex) {
      [sortedArray[currentIndex], sortedArray[minValueIndex]] = [
        sortedArray[minValueIndex],
        sortedArray[currentIndex],
      ];
      swapCount++;
    }
  }

  return {
    sorted: sortedArray,
    comparisons: comparisonCount,
    swaps: swapCount,
  };
}
