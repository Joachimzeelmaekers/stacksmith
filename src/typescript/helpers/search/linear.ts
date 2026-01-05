import { SearchResult } from "./types";

export function linearSearch(
  arr: number[],
  target: number,
  { loggingEnabled = false } = {}
): SearchResult {
  let steps = 0;

  for (let i = 0; i < arr.length; i++) {
    steps++;

    if (loggingEnabled) {
      console.log(`Step ${steps}: Check arr[${i}] = ${arr[i]}`);
    }

    if (arr[i] === target) {
      return { index: i, steps };
    }
  }

  return { index: -1, steps };
}
