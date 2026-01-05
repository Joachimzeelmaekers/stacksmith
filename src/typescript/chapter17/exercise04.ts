import { TrieNode } from "../helpers/data-structures/trie-node";

/**
 * Exercise 4: Spell Checker
 *
 * Implement a spell checker using a trie.
 */
class SpellChecker {
  private root = new TrieNode();

  addWord(word: string): void {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  loadDictionary(words: string[]): void {
    words.forEach((word) => this.addWord(word));
  }

  isCorrect(word: string): boolean {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  suggest(word: string, maxSuggestions = 5): string[] {
    const suggestions: string[] = [];
    const lowerWord = word.toLowerCase();

    for (let i = lowerWord.length; i >= 1; i--) {
      const prefix = lowerWord.slice(0, i);
      const node = this.findNode(prefix);
      if (node) {
        this.collectWords(node, prefix, suggestions, maxSuggestions);
        if (suggestions.length >= maxSuggestions) break;
      }
    }

    return suggestions.slice(0, maxSuggestions);
  }

  private findNode(prefix: string): TrieNode | null {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return null;
      node = node.children.get(char)!;
    }
    return node;
  }

  private collectWords(
    node: TrieNode,
    prefix: string,
    results: string[],
    max: number
  ): void {
    if (results.length >= max) return;
    if (node.isEndOfWord) results.push(prefix);

    for (const [char, child] of node.children) {
      if (results.length >= max) return;
      this.collectWords(child, prefix + char, results, max);
    }
  }
}

console.log("=== Spell Checker ===\n");

const checker = new SpellChecker();
checker.loadDictionary([
  "hello",
  "help",
  "helper",
  "helping",
  "world",
  "word",
  "work",
  "working",
  "worker",
  "apple",
  "application",
  "apply",
  "applied",
]);

console.log("Dictionary loaded.\n");

const testWords = ["hello", "helo", "working", "workingg", "appli"];

console.log("Checking words:");
for (const word of testWords) {
  const isCorrect = checker.isCorrect(word);
  const status = isCorrect ? "✓" : "✗";
  console.log(`  ${status} "${word}"`);

  if (!isCorrect) {
    const suggestions = checker.suggest(word);
    console.log(`    Suggestions: [${suggestions.join(", ")}]`);
  }
}
