/**
 * Exercise 2: Trie Word Count
 *
 * Implement a method to count all words in a trie.
 */

import { Trie } from "../helpers/data-structures/trie";

console.log("=== Trie Word Count ===\n");

const trie = new Trie();
const wordSets = [
  ["apple", "app", "application"],
  ["banana", "band", "bandana"],
  ["car", "card", "care", "careful", "carefully"],
];

for (const words of wordSets) {
  words.forEach((w) => trie.insert(w));
  console.log(`Added: [${words.join(", ")}]`);
  console.log(`  Total words in trie: ${trie.countWords()}`);
  console.log(`  All words: [${trie.getAllWords().join(", ")}]\n`);
}
