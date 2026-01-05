/**
 * Exercise 4: Count Character Occurrences
 *
 * Use recursion to write a function that counts the number of times
 * a specific character appears in a string.
 */

function countChar(str: string, char: string): number {
  if (str.length === 0) {
    return 0;
  }
  const count = str[0] === char ? 1 : 0;
  return count + countChar(str.slice(1), char);
}

console.log("=== Count Character Occurrences ===\n");

const testCases = [
  { str: "mississippi", char: "s" },
  { str: "hello world", char: "l" },
  { str: "aaaaaa", char: "a" },
  { str: "abcdef", char: "z" },
  { str: "", char: "x" },
];

for (const { str, char } of testCases) {
  const result = countChar(str, char);
  console.log(`String: "${str}"`);
  console.log(`  Count '${char}': ${result}\n`);
}
