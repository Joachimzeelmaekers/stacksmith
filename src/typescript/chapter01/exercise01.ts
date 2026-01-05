/**
 * Exercise 1: Array Operations - Step Counting
 *
 * For an array containing 100 elements, provide the number of steps
 * the following operations would take.
 */

console.log("=== Array Operations Step Count (100 elements) ===\n");

const arr = Array.from({ length: 100 }, (_, i) => i + 1);

console.log("Operation                              Steps");
console.log("─".repeat(50));

console.log("Reading at specific index              1");
console.log("  → arr[50] = ", arr[50], "(direct access)\n");

console.log("Searching (value not in array)         100");
console.log("  → Must check every element\n");

console.log("Insertion at beginning                 101");
console.log("  → 1 insert + 100 shifts\n");

console.log("Insertion at end                       1");
console.log("  → Just append\n");

console.log("Deletion at beginning                  100");
console.log("  → 1 delete + 99 shifts\n");

console.log("Deletion at end                        1");
console.log("  → Just remove last\n");

console.log("─".repeat(50));
console.log("Summary: Arrays excel at random access O(1)");
console.log("         but insertion/deletion at start is O(n)");
