package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Find Greatest Value in BST ===")
	fmt.Println()

	bst := &datastructures.BinarySearchTree{}
	for _, n := range []int{50, 25, 75, 10, 33, 56, 89, 4, 11, 30, 40, 52, 61, 82, 95} {
		bst.Insert(n)
	}

	fmt.Println("BST created with values: 50, 25, 75, 10, 33, 56, 89, 4, 11, 30, 40, 52, 61, 82, 95")

	greatest, _ := bst.FindGreatest()
	fmt.Printf("\nGreatest value: %d\n", greatest)
	fmt.Println()
	fmt.Println("✓ O(log n) average case - just follow right pointers")
}
