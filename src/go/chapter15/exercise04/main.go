package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
	"math"
)

// BuildBalancedBSTFromSorted builds a height-balanced BST from a sorted slice.
// Time: O(n)   Space: O(log n) recursion stack
func BuildBalancedBSTFromSorted(sortedValues []int) *datastructures.TreeNode {
	if len(sortedValues) == 0 {
		return nil
	}

	middleIndex := len(sortedValues) / 2
	rootNode := &datastructures.TreeNode{Value: sortedValues[middleIndex]}

	rootNode.Left = BuildBalancedBSTFromSorted(sortedValues[:middleIndex])
	rootNode.Right = BuildBalancedBSTFromSorted(sortedValues[middleIndex+1:])

	return rootNode
}

// Height returns the number of nodes on the longest path from this node to a leaf.
// Empty tree height is 0.
func Height(rootNode *datastructures.TreeNode) int {
	if rootNode == nil {
		return 0
	}

	leftHeight := Height(rootNode.Left)
	rightHeight := Height(rootNode.Right)

	if leftHeight > rightHeight {
		return leftHeight + 1
	}

	return rightHeight + 1
}

func main() {
	fmt.Println("=== Build Balanced BST from Sorted Array ===")
	fmt.Println()

	sortedArray := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15}
	fmt.Printf("Sorted array: %v\n\n", sortedArray)

	root := BuildBalancedBSTFromSorted(sortedArray)

	fmt.Println("Balanced BST structure:")
	datastructures.PrintTree(root)

	fmt.Println()
	fmt.Printf("Tree height: %d\n", Height(root))
	fmt.Printf("Optimal height for %d nodes: %.0f\n", len(sortedArray), math.Ceil(math.Log2(float64(len(sortedArray)+1))))
}
