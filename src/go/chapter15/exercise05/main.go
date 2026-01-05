package main

import (
	"fmt"
	"math"
)

type TreeNode struct {
	Value int
	Left  *TreeNode
	Right *TreeNode
}

func isValidBST(node *TreeNode, min, max float64) bool {
	if node == nil {
		return true
	}

	value := float64(node.Value)
	if value <= min || value >= max {
		return false
	}

	return isValidBST(node.Left, min, value) && isValidBST(node.Right, value, max)
}

func main() {
	fmt.Println("=== BST Validity Check ===")
	fmt.Println()

	validBST := &TreeNode{Value: 50}
	validBST.Left = &TreeNode{Value: 25}
	validBST.Right = &TreeNode{Value: 75}
	validBST.Left.Left = &TreeNode{Value: 10}
	validBST.Left.Right = &TreeNode{Value: 33}

	fmt.Println("Tree 1:")
	fmt.Println("       50")
	fmt.Println("      /  \\")
	fmt.Println("    25    75")
	fmt.Println("   /  \\")
	fmt.Println("  10  33")
	fmt.Printf("Valid BST: %t\n\n", isValidBST(validBST, math.Inf(-1), math.Inf(1)))

	invalidBST := &TreeNode{Value: 50}
	invalidBST.Left = &TreeNode{Value: 25}
	invalidBST.Right = &TreeNode{Value: 75}
	invalidBST.Left.Left = &TreeNode{Value: 10}
	invalidBST.Left.Right = &TreeNode{Value: 60}

	fmt.Println("Tree 2:")
	fmt.Println("       50")
	fmt.Println("      /  \\")
	fmt.Println("    25    75")
	fmt.Println("   /  \\")
	fmt.Println("  10  60  ← Invalid! 60 > 50 but in left subtree")
	fmt.Printf("Valid BST: %t\n", isValidBST(invalidBST, math.Inf(-1), math.Inf(1)))
}

