/**
 * Exercise 3: Trie Traversal
 *
 * Implement a method to traverse and print all words in a trie.
 */

import { Trie } from "../helpers/data-structures/trie";

console.log("=== Trie Traversal ===\n");

const trie = new Trie();
const words = [
  "zebra",
  "apple",
  "zoo",
  "app",
  "application",
  "apply",
  "banana",
];

console.log("Inserting words:", words.join(", "));
words.forEach((word) => trie.insert(word));

console.log("\nTraversing trie (alphabetical order):");
trie.traverse((word) => {
  console.log(`  ${word}`);
});
