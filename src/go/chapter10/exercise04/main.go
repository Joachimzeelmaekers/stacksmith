package main

import "fmt"

func findFirstIndexOf(str string, char rune, index int) int {
	runes := []rune(str)
	if index >= len(runes) {
		return -1
	}
	if runes[index] == char {
		return index
	}
	return findFirstIndexOf(str, char, index+1)
}

func main() {
	fmt.Println("=== Find First Index of Character ===")
	fmt.Println()

	testCases := []struct {
		str  string
		char rune
	}{
		{"abcdefghijklmnopqrstuvwxyz", 'x'},
		{"hello world", 'o'},
		{"xxxx", 'x'},
		{"no match here", 'z'},
		{"", 'a'},
		{"example", 'e'},
	}

	for _, tc := range testCases {
		result := findFirstIndexOf(tc.str, tc.char, 0)
		fmt.Printf("String: \"%s\"\n", tc.str)
		fmt.Printf("  Find: '%c' → Index: %d\n\n", tc.char, result)
	}
}

