/**
 * Exercise 1: Count Characters in Array of Strings
 *
 * Use recursion to write a function that accepts an array of strings
 * and returns the total number of characters across all the strings.
 */

function countCharacters(strings: string[]): number {
  if (strings.length === 0) {
    return 0;
  }
  return strings[0].length + countCharacters(strings.slice(1));
}

console.log("=== Count Characters in Array of Strings ===\n");

const testCases = [
  ["ab", "c", "def", "ghij"],
  ["hello", "world"],
  ["a", "b", "c"],
  [],
  ["supercalifragilisticexpialidocious"],
];

for (const test of testCases) {
  const result = countCharacters(test);
  console.log(`[${test.map((s) => `"${s}"`).join(", ")}]`);
  console.log(`  → Total characters: ${result}\n`);
}
