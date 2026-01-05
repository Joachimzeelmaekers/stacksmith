/**
 * Exercise 1: Trie Autocomplete
 *
 * Implement a trie with autocomplete functionality.
 */

import { Trie } from "../helpers/data-structures/trie";

console.log("=== Trie Autocomplete ===\n");

const trie = new Trie();
const words = [
  "ace",
  "act",
  "bad",
  "bake",
  "bat",
  "batter",
  "cab",
  "cat",
  "catnap",
  "catnip",
];

console.log("Inserting words:", words.join(", "));
words.forEach((word) => trie.insert(word));

console.log("\nAutocomplete results:");
const prefixes = ["ca", "bat", "b", "ace"];
for (const prefix of prefixes) {
  const results = trie.autocomplete(prefix);
  console.log(`  "${prefix}" → [${results.join(", ")}]`);
}
