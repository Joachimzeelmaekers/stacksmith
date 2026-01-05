package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
	"strings"
)

func main() {
	fmt.Println("=== Trie Traversal ===")
	fmt.Println()

	trie := datastructures.NewTrie()
	words := []string{"zebra", "apple", "zoo", "app", "application", "apply", "banana"}

	fmt.Println("Inserting words:", strings.Join(words, ", "))
	for _, word := range words {
		trie.Insert(word)
	}

	fmt.Println()
	fmt.Println("Traversing trie (alphabetical order):")
	trie.Traverse(func(word string) {
		fmt.Printf("  %s\n", word)
	})
}
