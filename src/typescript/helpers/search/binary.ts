import { SearchResult } from "./types";

export function binarySearch(
  arr: number[],
  target: number,
  { loggingEnabled = false } = {}
): SearchResult {
  let steps = 0;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    steps++;
    const mid = Math.floor((left + right) / 2);

    if (loggingEnabled) {
      console.log(
        `Step ${steps}: Check arr[${mid}] = ${arr[mid]} (range: ${left}-${right})`
      );
    }

    if (arr[mid] === target) {
      return { index: mid, steps };
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return { index: -1, steps };
}
