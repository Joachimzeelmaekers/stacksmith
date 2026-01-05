/**
 * Exercise 1: Group Anagrams
 *
 * Given an array of strings, group anagrams together.
 */

function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const str of strs) {
    const sorted = str.split("").sort().join("");

    if (!groups.has(sorted)) {
      groups.set(sorted, []);
    }
    groups.get(sorted)!.push(str);
  }

  return Array.from(groups.values());
}

// Optimal: Using character count instead of sorting
function groupAnagramsOptimal(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const str of strs) {
    const count = new Array(26).fill(0);
    for (const char of str) {
      count[char.charCodeAt(0) - 97]++;
    }
    const key = count.join("#");

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(str);
  }

  return Array.from(groups.values());
}

console.log("=== Group Anagrams ===\n");

const input = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(`Input: [${input.map(s => `"${s}"`).join(", ")}]\n`);

const result = groupAnagrams(input);
console.log("Output:");
for (const group of result) {
  console.log(`  [${group.map(s => `"${s}"`).join(", ")}]`);
}

console.log("\nTime Complexity:");
console.log("  Sorting method: O(N × K log K) where K is max string length");
console.log("  Count method:   O(N × K) - no sorting needed ✓");

