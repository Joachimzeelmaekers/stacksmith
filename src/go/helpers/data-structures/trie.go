package datastructures

import "sort"

type TrieNode struct {
	children    map[rune]*TrieNode
	isEndOfWord bool
}

type Trie struct {
	root *TrieNode
}

func NewTrie() *Trie {
	return &Trie{
		root: NewTrieNode(),
	}
}

func NewTrieNode() *TrieNode {
	return &TrieNode{
		children: make(map[rune]*TrieNode),
	}
}

func (trie *Trie) Insert(word string) {
	currentNode := trie.root

	for _, character := range word {
		nextNode, exists := currentNode.children[character]
		if !exists {
			nextNode = NewTrieNode()
			currentNode.children[character] = nextNode
		}

		currentNode = nextNode
	}

	currentNode.isEndOfWord = true
}

func (trie *Trie) Autocomplete(prefix string) []string {
	prefixNode := trie.findNode(prefix)
	if prefixNode == nil {
		return []string{}
	}

	results := make([]string, 0)

	prefixRunes := []rune(prefix)
	trie.collectWords(prefixNode, prefixRunes, &results, false)

	return results
}

func (trie *Trie) CountWords() int {
	return trie.countWordsRecursive(trie.root)
}

func (trie *Trie) GetAllWords() []string {
	words := make([]string, 0)
	trie.collectWords(trie.root, []rune{}, &words, true)
	return words
}

func (trie *Trie) Traverse(visit func(word string)) {
	trie.traverseRecursive(trie.root, []rune{}, visit)
}

func (trie *Trie) findNode(prefix string) *TrieNode {
	currentNode := trie.root

	for _, character := range prefix {
		nextNode, exists := currentNode.children[character]
		if !exists {
			return nil
		}

		currentNode = nextNode
	}

	return currentNode
}

func (trie *Trie) countWordsRecursive(currentNode *TrieNode) int {
	if currentNode == nil {
		return 0
	}

	count := 0
	if currentNode.isEndOfWord {
		count = 1
	}

	for _, childNode := range currentNode.children {
		count += trie.countWordsRecursive(childNode)
	}

	return count
}

func (trie *Trie) collectWords(
	currentNode *TrieNode,
	prefixRunes []rune,
	results *[]string,
	sortChildren bool,
) {
	if currentNode == nil {
		return
	}

	if currentNode.isEndOfWord {
		*results = append(*results, string(prefixRunes))
	}

	childKeys := trie.childKeys(currentNode, sortChildren)

	for _, character := range childKeys {
		childNode := currentNode.children[character]

		prefixRunes = append(prefixRunes, character)
		trie.collectWords(childNode, prefixRunes, results, sortChildren)
		prefixRunes = prefixRunes[:len(prefixRunes)-1]
	}
}

func (trie *Trie) traverseRecursive(
	currentNode *TrieNode,
	prefixRunes []rune,
	visit func(word string),
) {
	if currentNode == nil {
		return
	}

	if currentNode.isEndOfWord {
		visit(string(prefixRunes))
	}

	childKeys := trie.childKeys(currentNode, true)

	for _, character := range childKeys {
		childNode := currentNode.children[character]

		prefixRunes = append(prefixRunes, character)
		trie.traverseRecursive(childNode, prefixRunes, visit)
		prefixRunes = prefixRunes[:len(prefixRunes)-1]
	}
}

func (trie *Trie) childKeys(currentNode *TrieNode, sortKeys bool) []rune {
	keys := make([]rune, 0, len(currentNode.children))

	for character := range currentNode.children {
		keys = append(keys, character)
	}

	if sortKeys {
		sort.Slice(keys, func(firstIndex, secondIndex int) bool {
			return keys[firstIndex] < keys[secondIndex]
		})
	}

	return keys
}
