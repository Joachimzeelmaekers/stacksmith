package main

import (
	"dsa/helpers"
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== BST Traversals ===")
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

	fmt.Printf("Preorder (root, left, right):  %s\n", helpers.IntSliceToString(bst.PreorderTraversal()))
	fmt.Printf("Inorder (left, root, right):   %s\n", helpers.IntSliceToString(bst.InorderTraversal()))
	fmt.Printf("Postorder (left, right, root): %s\n", helpers.IntSliceToString(bst.PostorderTraversal()))
}
