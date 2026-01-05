type BubbleSortResult = {
  sorted: number[];
  comparisons: number;
  swaps: number;
};

export function bubbleSort(arr: number[]): BubbleSortResult {
  const result = [...arr];
  let comparisons = 0;
  let swaps = 0;
  let sorted = false;

  while (!sorted) {
    sorted = true;

    for (let i = 0; i < result.length - 1; i++) {
      comparisons++;

      if (result[i] > result[i + 1]) {
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
        swaps++;
        sorted = false;
      }
    }
  }

  return {
    sorted: result,
    comparisons,
    swaps,
  };
}
