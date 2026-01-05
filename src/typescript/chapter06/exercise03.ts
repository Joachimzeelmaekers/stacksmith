/**
 * Exercise 3: Sorting Algorithm Selection
 *
 * Choose the right sorting algorithm based on data characteristics.
 */

import { insertionSort } from "../helpers/sort/insertion";
import { selectionSort } from "../helpers/sort/selection";

console.log("=== Sorting Algorithm Selection ===\n");

// Nearly sorted data
const nearlySorted = Array.from({ length: 1000 }, (_, i) => i);
// Swap a few elements
[nearlySorted[100], nearlySorted[101]] = [nearlySorted[101], nearlySorted[100]];
[nearlySorted[500], nearlySorted[501]] = [nearlySorted[501], nearlySorted[500]];

// Random data
const random = Array.from({ length: 1000 }, () =>
  Math.floor(Math.random() * 10000)
);

console.log("Nearly sorted data (1000 elements, 2 swaps):");
let start = performance.now();
insertionSort(nearlySorted);
console.log(`  Insertion sort: ${(performance.now() - start).toFixed(2)}ms`);

start = performance.now();
selectionSort([...nearlySorted]);
console.log(`  Selection sort: ${(performance.now() - start).toFixed(2)}ms`);

console.log("\nRandom data (1000 elements):");
start = performance.now();
insertionSort([...random]);
console.log(`  Insertion sort: ${(performance.now() - start).toFixed(2)}ms`);

start = performance.now();
selectionSort([...random]);
console.log(`  Selection sort: ${(performance.now() - start).toFixed(2)}ms`);

console.log("\n✓ Insertion sort wins for nearly-sorted data");
console.log("  Selection sort is more consistent but never fast");
