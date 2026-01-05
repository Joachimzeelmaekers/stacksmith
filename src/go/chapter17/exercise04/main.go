package main

import (
	"fmt"
	"strings"
)

type TrieNode struct {
	children    map[rune]*TrieNode
	isEndOfWord bool
}

func NewTrieNode() *TrieNode {
	return &TrieNode{children: make(map[rune]*TrieNode)}
}

type SpellChecker struct {
	root *TrieNode
}

func NewSpellChecker() *SpellChecker {
	return &SpellChecker{root: NewTrieNode()}
}

func (s *SpellChecker) AddWord(word string) {
	node := s.root
	for _, char := range strings.ToLower(word) {
		if _, ok := node.children[char]; !ok {
			node.children[char] = NewTrieNode()
		}
		node = node.children[char]
	}
	node.isEndOfWord = true
}

func (s *SpellChecker) LoadDictionary(words []string) {
	for _, word := range words {
		s.AddWord(word)
	}
}

func (s *SpellChecker) IsCorrect(word string) bool {
	node := s.root
	for _, char := range strings.ToLower(word) {
		if _, ok := node.children[char]; !ok {
			return false
		}
		node = node.children[char]
	}
	return node.isEndOfWord
}

func (s *SpellChecker) findNode(prefix string) *TrieNode {
	node := s.root
	for _, char := range prefix {
		if _, ok := node.children[char]; !ok {
			return nil
		}
		node = node.children[char]
	}
	return node
}

func (s *SpellChecker) Suggest(word string, maxSuggestions int) []string {
	var suggestions []string
	lowerWord := strings.ToLower(word)

	for i := len(lowerWord); i >= 1; i-- {
		prefix := lowerWord[:i]
		node := s.findNode(prefix)
		if node != nil {
			s.collectWords(node, prefix, &suggestions, maxSuggestions)
			if len(suggestions) >= maxSuggestions {
				break
			}
		}
	}

	if len(suggestions) > maxSuggestions {
		return suggestions[:maxSuggestions]
	}
	return suggestions
}

func (s *SpellChecker) collectWords(node *TrieNode, prefix string, results *[]string, max int) {
	if len(*results) >= max {
		return
	}
	if node.isEndOfWord {
		*results = append(*results, prefix)
	}
	for char, child := range node.children {
		if len(*results) >= max {
			return
		}
		s.collectWords(child, prefix+string(char), results, max)
	}
}

func main() {
	fmt.Println("=== Spell Checker ===")
	fmt.Println()

	checker := NewSpellChecker()
	checker.LoadDictionary([]string{
		"hello", "help", "helper", "helping", "world", "word", "work",
		"working", "worker", "apple", "application", "apply", "applied",
	})

	fmt.Println("Dictionary loaded.")
	fmt.Println()

	testWords := []string{"hello", "helo", "working", "workingg", "appli"}

	fmt.Println("Checking words:")
	for _, word := range testWords {
		isCorrect := checker.IsCorrect(word)
		status := "✓"
		if !isCorrect {
			status = "✗"
		}
		fmt.Printf("  %s \"%s\"\n", status, word)

		if !isCorrect {
			suggestions := checker.Suggest(word, 5)
			fmt.Printf("    Suggestions: [%s]\n", strings.Join(suggestions, ", "))
		}
	}
}
