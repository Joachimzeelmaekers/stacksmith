package main

import "fmt"

func reverseString(str string) string {
	runes := []rune(str)
	if len(runes) <= 1 {
		return str
	}
	return reverseString(string(runes[1:])) + string(runes[0])
}

func main() {
	fmt.Println("=== String Reversal ===")
	fmt.Println()

	testCases := []string{
		"hello",
		"abcdefghij",
		"a",
		"",
		"racecar",
		"Golang",
	}

	for _, test := range testCases {
		result := reverseString(test)
		fmt.Printf("\"%s\"\n", test)
		fmt.Printf("  → \"%s\"\n\n", result)
	}
}

