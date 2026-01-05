package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Delete Node from Linked List ===")
	fmt.Println()

	list := &datastructures.LinkedList[int]{}
	for _, n := range []int{1, 2, 3, 4, 5} {
		list.Append(n)
	}

	fmt.Println("Original:", list.String())

	fmt.Println()
	fmt.Println("Deleting 3:")
	list.Delete(3)
	fmt.Println("  Result:", list.String())

	fmt.Println()
	fmt.Println("Deleting 1 (head):")
	list.Delete(1)
	fmt.Println("  Result:", list.String())

	fmt.Println()
	fmt.Println("Deleting 5 (tail):")
	list.Delete(5)
	fmt.Println("  Result:", list.String())

	fmt.Println()
	fmt.Println("Deleting 99 (not found):")
	found := list.Delete(99)
	fmt.Printf("  Found: %t, Result: %s\n", found, list.String())
}
