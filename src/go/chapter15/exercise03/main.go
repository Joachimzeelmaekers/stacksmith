package main

import (
	"dsa/helpers"
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Postorder Traversal ===")
	fmt.Println()

	bst := &datastructures.BinarySearchTree{}
	for _, n := range []int{50, 25, 75, 10, 33, 56, 89} {
		bst.Insert(n)
	}

	fmt.Println("BST structure:")
	fmt.Println("       50")
	fmt.Println("      /  \\")
	fmt.Println("    25    75")
	fmt.Println("   /  \\  /  \\")
	fmt.Println("  10  33 56  89")
	fmt.Println()

	fmt.Printf("Postorder traversal: %s\n", helpers.IntSliceToString(bst.PostorderTraversal()))
	fmt.Println()
	fmt.Println("✓ Postorder visits: left subtree → right subtree → root")
	fmt.Println("  Useful for: deleting trees, evaluating expressions")
}
