package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
	"strings"
)

func main() {
	fmt.Println("=== Trie Word Count ===")
	fmt.Println()

	trie := datastructures.NewTrie()
	wordSets := [][]string{
		{"apple", "app", "application"},
		{"banana", "band", "bandana"},
		{"car", "card", "care", "careful", "carefully"},
	}

	for _, words := range wordSets {
		for _, w := range words {
			trie.Insert(w)
		}
		fmt.Printf("Added: [%s]\n", strings.Join(words, ", "))
		fmt.Printf("  Total words in trie: %d\n", trie.CountWords())
		fmt.Printf("  All words: [%s]\n\n", strings.Join(trie.GetAllWords(), ", "))
	}
}
