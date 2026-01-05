package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Reverse Linked List ===")
	fmt.Println()

	list := &datastructures.LinkedList[int]{}
	for _, n := range []int{1, 2, 3, 4, 5} {
		list.Append(n)
	}

	fmt.Println("Original:", list.String())
	list.Reverse()
	fmt.Println("Reversed:", list.String())

	fmt.Println()
	fmt.Println("✓ In-place reversal: O(n) time, O(1) space")
}
