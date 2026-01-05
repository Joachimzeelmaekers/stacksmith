package main

import "fmt"

func countChar(str string, char rune) int {
	runes := []rune(str)
	if len(runes) == 0 {
		return 0
	}

	count := 0
	if runes[0] == char {
		count = 1
	}

	return count + countChar(string(runes[1:]), char)
}

func main() {
	fmt.Println("=== Count Character Occurrences ===")
	fmt.Println()

	testCases := []struct {
		str  string
		char rune
	}{
		{"mississippi", 's'},
		{"hello world", 'l'},
		{"aaaaaa", 'a'},
		{"abcdef", 'z'},
		{"", 'x'},
	}

	for _, tc := range testCases {
		result := countChar(tc.str, tc.char)
		fmt.Printf("String: \"%s\"\n", tc.str)
		fmt.Printf("  Count '%c': %d\n\n", tc.char, result)
	}
}

