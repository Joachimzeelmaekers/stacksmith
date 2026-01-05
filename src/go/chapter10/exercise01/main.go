package main

import "fmt"

func countCharacters(strings []string) int {
	if len(strings) == 0 {
		return 0
	}
	return len(strings[0]) + countCharacters(strings[1:])
}

func main() {
	fmt.Println("=== Count Characters in Array of Strings ===")
	fmt.Println()

	testCases := [][]string{
		{"ab", "c", "def", "ghij"},
		{"hello", "world"},
		{"a", "b", "c"},
		{},
		{"supercalifragilisticexpialidocious"},
	}

	for _, test := range testCases {
		result := countCharacters(test)
		fmt.Printf("%v\n", test)
		fmt.Printf("  → Total characters: %d\n\n", result)
	}
}

