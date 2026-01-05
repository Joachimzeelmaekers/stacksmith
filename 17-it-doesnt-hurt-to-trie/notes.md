# Chapter 17 – Tries

## Context and Goals

A **trie** (pronounced *try*), or prefix tree, is a tree-based data structure that stores strings efficiently by sharing common prefixes. Tries are used in applications like autocomplete, spell checking, and prefix matching. This chapter explains how tries work, how to implement them, and when they outperform other lookup structures like hash tables.

---

## Core Concepts and Reasoning

### 1. Structure

Each node in a trie represents a **character** in a string. Paths from the root to a terminal node represent stored words.

* Each node maintains a **map of children** keyed by characters.
* A flag (e.g., `isEndOfWord`) indicates whether a complete word ends at that node.

### 2. Properties

* Common prefixes are stored only once — saving memory for similar strings.
* Search time depends on **word length (L)**, not on total words (N): O(L).
* Tries trade higher space usage for faster prefix-based lookups.

---

## Examples

### Example 1: Trie Implementation

#### TypeScript

```typescript
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  end = false;
}

class Trie {
  root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.end = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.end;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }
}
```

#### Go

```go
type TrieNode struct {
  Children map[rune]*TrieNode
  End      bool
}

type Trie struct {
  Root *TrieNode
}

func NewTrie() *Trie {
  return &Trie{Root: &TrieNode{Children: make(map[rune]*TrieNode)}}
}

func (t *Trie) Insert(word string) {
  node := t.Root
  for _, ch := range word {
    if node.Children[ch] == nil {
      node.Children[ch] = &TrieNode{Children: make(map[rune]*TrieNode)}
    }
    node = node.Children[ch]
  }
  node.End = true
}

func (t *Trie) Search(word string) bool {
  node := t.Root
  for _, ch := range word {
    if node.Children[ch] == nil {
      return false
    }
    node = node.Children[ch]
  }
  return node.End
}

func (t *Trie) StartsWith(prefix string) bool {
  node := t.Root
  for _, ch := range prefix {
    if node.Children[ch] == nil {
      return false
    }
    node = node.Children[ch]
  }
  return true
}
```

---

### Example 2: Autocomplete

Autocomplete involves traversing the trie to the prefix node and then collecting all words beneath it.

#### TypeScript

```typescript
function collectWords(node: TrieNode, prefix: string, result: string[]): void {
  if (node.end) result.push(prefix);
  for (const [char, child] of node.children) {
    collectWords(child, prefix + char, result);
  }
}

function autocomplete(trie: Trie, prefix: string): string[] {
  let node = trie.root;
  for (const char of prefix) {
    if (!node.children.has(char)) return [];
    node = node.children.get(char)!;
  }
  const result: string[] = [];
  collectWords(node, prefix, result);
  return result;
}
```

#### Go

```go
func collectWords(node *TrieNode, prefix string, result *[]string) {
  if node.End {
    *result = append(*result, prefix)
  }
  for ch, child := range node.Children {
    collectWords(child, prefix+string(ch), result)
  }
}

func Autocomplete(t *Trie, prefix string) []string {
  node := t.Root
  for _, ch := range prefix {
    if node.Children[ch] == nil {
      return nil
    }
    node = node.Children[ch]
  }
  var result []string
  collectWords(node, prefix, &result)
  return result
}
```

---

## Performance and Design Insights

* **Search, insert, and prefix lookup** are O(L), where L is the length of the word.
* Space complexity is O(ALPHABET_SIZE × L) for all stored words.
* Excellent for operations like autocomplete, prefix counting, and dictionary validation.
* Poor cache locality due to pointer-heavy structure.
* Compressed tries (radix trees) or DAWGs (Directed Acyclic Word Graphs) can mitigate memory issues.

### When to Use

* When searching for prefixes or building predictive text systems.
* When storing many strings with overlapping prefixes.
* Avoid for small datasets where hash lookups are simpler.

---

## Key Takeaways

* Tries store strings efficiently by exploiting shared prefixes.
* Lookup time depends on **word length**, not dataset size.
* Autocomplete and spell-check systems are natural trie applications.
* Variants like **compressed tries** and **DAWGs** optimize space for large dictionaries.
