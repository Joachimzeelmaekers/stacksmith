package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
	"strings"
)

func main() {
	fmt.Println("=== Trie Autocomplete ===")
	fmt.Println()

	trie := datastructures.NewTrie()
	words := []string{"ace", "act", "bad", "bake", "bat", "batter", "cab", "cat", "catnap", "catnip"}

	fmt.Println("Inserting words:", strings.Join(words, ", "))
	for _, word := range words {
		trie.Insert(word)
	}

	fmt.Println()
	fmt.Println("Autocomplete results:")
	prefixes := []string{"ca", "bat", "b", "ace"}
	for _, prefix := range prefixes {
		results := trie.Autocomplete(prefix)
		fmt.Printf("  \"%s\" → [%s]\n", prefix, strings.Join(results, ", "))
	}
}
