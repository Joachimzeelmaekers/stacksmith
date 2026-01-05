import { TrieNode } from "./trie-node";

type TraverseOptions = {
  sorted?: boolean; // if true, visit words in lexicographic order
};

export class Trie {
  root = new TrieNode();

  insert(word: string): void {
    let currentNode = this.root;

    for (const character of word) {
      if (!currentNode.children.has(character)) {
        currentNode.children.set(character, new TrieNode());
      }
      currentNode = currentNode.children.get(character)!;
    }

    currentNode.isEndOfWord = true;
  }

  search(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  autocomplete(prefix: string, options: TraverseOptions = {}): string[] {
    const startNode = this.findNode(prefix);
    if (startNode === null) {
      return [];
    }

    const words: string[] = [];
    this.collectWords(startNode, prefix, words, options);
    return words;
  }

  getAllWords(options: TraverseOptions = {}): string[] {
    const words: string[] = [];
    this.collectWords(this.root, "", words, options);
    return words;
  }

  countWords(): number {
    return this.countWordsFrom(this.root);
  }

  traverse(
    callback: (word: string) => void,
    options: TraverseOptions = {}
  ): void {
    this.traverseFrom(this.root, "", callback, options);
  }

  private findNode(prefix: string): TrieNode | null {
    let currentNode = this.root;

    for (const character of prefix) {
      const nextNode = currentNode.children.get(character);
      if (!nextNode) return null;
      currentNode = nextNode;
    }

    return currentNode;
  }

  private collectWords(
    node: TrieNode,
    prefix: string,
    words: string[],
    options: TraverseOptions
  ): void {
    this.traverseFrom(node, prefix, (word) => words.push(word), options);
  }

  private traverseFrom(
    node: TrieNode,
    prefix: string,
    visit: (word: string) => void,
    options: TraverseOptions
  ): void {
    if (node.isEndOfWord) {
      visit(prefix);
    }

    const childEntries = options.sorted
      ? [...node.children.entries()].sort(([a], [b]) => a.localeCompare(b))
      : node.children.entries();

    for (const [character, childNode] of childEntries) {
      this.traverseFrom(childNode, prefix + character, visit, options);
    }
  }

  private countWordsFrom(node: TrieNode): number {
    let count = node.isEndOfWord ? 1 : 0;

    for (const childNode of node.children.values()) {
      count += this.countWordsFrom(childNode);
    }

    return count;
  }
}
