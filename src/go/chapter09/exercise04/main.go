package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func reverseString(str string) string {
	stack := &datastructures.Stack[rune]{}

	for _, char := range str {
		stack.Push(char)
	}

	reversed := make([]rune, 0, len(str))
	for !stack.IsEmpty() {
		char, _ := stack.Pop()
		reversed = append(reversed, char)
	}

	return string(reversed)
}

func main() {
	fmt.Println("=== Reverse String Using Stack ===")
	fmt.Println()

	testCases := []string{"abcde", "hello", "Golang", "A man a plan a canal Panama"}

	for _, test := range testCases {
		result := reverseString(test)
		fmt.Printf("\"%s\"\n", test)
		fmt.Printf("  → \"%s\"\n\n", result)
	}

	fmt.Println("✓ String reversal complete using LIFO stack property")
}
