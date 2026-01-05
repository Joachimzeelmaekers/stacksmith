package main

import (
	"fmt"
	"sort"
	"strings"
)

func groupAnagrams(strs []string) [][]string {
	groups := make(map[string][]string)

	for _, str := range strs {
		runes := []rune(str)
		sort.Slice(runes, func(i, j int) bool { return runes[i] < runes[j] })
		key := string(runes)

		groups[key] = append(groups[key], str)
	}

	result := make([][]string, 0, len(groups))
	for _, group := range groups {
		result = append(result, group)
	}

	return result
}

func main() {
	fmt.Println("=== Group Anagrams ===")
	fmt.Println()

	input := []string{"eat", "tea", "tan", "ate", "nat", "bat"}
	fmt.Printf("Input: [%s]\n\n", strings.Join(input, ", "))

	result := groupAnagrams(input)
	fmt.Println("Output:")
	for _, group := range result {
		fmt.Printf("  [%s]\n", strings.Join(group, ", "))
	}

	fmt.Println()
	fmt.Println("Time Complexity:")
	fmt.Println("  Sorting method: O(N × K log K) where K is max string length")
	fmt.Println("  Count method:   O(N × K) - no sorting needed ✓")
}

