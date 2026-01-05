/**
 * Exercise 4: Find First Index of Character
 *
 * Use recursion to write a function that accepts a string and returns
 * the first index that contains the character "x". Return -1 if not found.
 */

function findFirstIndexOf(
  str: string,
  char: string,
  index: number = 0
): number {
  if (index >= str.length) {
    return -1;
  }
  if (str[index] === char) {
    return index;
  }
  return findFirstIndexOf(str, char, index + 1);
}

console.log("=== Find First Index of Character ===\n");

const testCases = [
  { str: "abcdefghijklmnopqrstuvwxyz", char: "x" },
  { str: "hello world", char: "o" },
  { str: "xxxx", char: "x" },
  { str: "no match here", char: "z" },
  { str: "", char: "a" },
  { str: "example", char: "e" },
];

for (const { str, char } of testCases) {
  const result = findFirstIndexOf(str, char);
  console.log(`String: "${str}"`);
  console.log(`  Find: '${char}' → Index: ${result}\n`);
}
