export function insertionSort(inputArray: number[]): {
  sorted: number[];
  comparisons: number;
  shifts: number;
} {
  const sortedArray = [...inputArray];
  let comparisonCount = 0;
  let shiftCount = 0;

  for (
    let currentIndex = 1;
    currentIndex < sortedArray.length;
    currentIndex++
  ) {
    const valueToInsert = sortedArray[currentIndex];
    let insertionIndex = currentIndex - 1;

    while (insertionIndex >= 0) {
      comparisonCount++;

      if (sortedArray[insertionIndex] > valueToInsert) {
        sortedArray[insertionIndex + 1] = sortedArray[insertionIndex];
        shiftCount++;
        insertionIndex--;
      } else {
        break;
      }
    }

    sortedArray[insertionIndex + 1] = valueToInsert;
  }

  return {
    sorted: sortedArray,
    comparisons: comparisonCount,
    shifts: shiftCount,
  };
}
