package datastructures

import (
	"fmt"
	"strings"
)

type TreeNode struct {
	Value int
	Left  *TreeNode
	Right *TreeNode
}

type BinarySearchTree struct {
	Root *TreeNode
}

func (tree *BinarySearchTree) Insert(value int) {
	if tree.Root == nil {
		tree.Root = &TreeNode{Value: value}
		return
	}

	tree.insertIntoSubtree(tree.Root, value)
}

func (tree *BinarySearchTree) insertIntoSubtree(currentNode *TreeNode, value int) {
	if value < currentNode.Value {
		if currentNode.Left == nil {
			currentNode.Left = &TreeNode{Value: value}
			return
		}

		tree.insertIntoSubtree(currentNode.Left, value)
		return
	}

	if currentNode.Right == nil {
		currentNode.Right = &TreeNode{Value: value}
		return
	}

	tree.insertIntoSubtree(currentNode.Right, value)
}

func (tree *BinarySearchTree) FindGreatest() (int, bool) {
	if tree.Root == nil {
		return 0, false
	}

	currentNode := tree.Root
	for currentNode.Right != nil {
		currentNode = currentNode.Right
	}

	return currentNode.Value, true
}

func (tree *BinarySearchTree) PreorderTraversal() []int {
	values := make([]int, 0)
	preorderWalk(tree.Root, &values)
	return values
}

func (tree *BinarySearchTree) InorderTraversal() []int {
	values := make([]int, 0)
	inorderWalk(tree.Root, &values)
	return values
}

func (tree *BinarySearchTree) PostorderTraversal() []int {
	values := make([]int, 0)
	postorderWalk(tree.Root, &values)
	return values
}

func preorderWalk(currentNode *TreeNode, values *[]int) {
	if currentNode == nil {
		return
	}

	*values = append(*values, currentNode.Value)
	preorderWalk(currentNode.Left, values)
	preorderWalk(currentNode.Right, values)
}

func inorderWalk(currentNode *TreeNode, values *[]int) {
	if currentNode == nil {
		return
	}

	inorderWalk(currentNode.Left, values)
	*values = append(*values, currentNode.Value)
	inorderWalk(currentNode.Right, values)
}

func postorderWalk(currentNode *TreeNode, values *[]int) {
	if currentNode == nil {
		return
	}

	postorderWalk(currentNode.Left, values)
	postorderWalk(currentNode.Right, values)
	*values = append(*values, currentNode.Value)
}

// PrintTree prints a sideways tree (right branch at top).
// Useful for demos/CLI output.
func PrintTree(rootNode *TreeNode) {
	printTreeRecursive(rootNode, "", false)
}

func printTreeRecursive(currentNode *TreeNode, prefix string, isLeftChild bool) {
	if currentNode == nil {
		return
	}

	if currentNode.Right != nil {
		nextPrefix := prefix
		if isLeftChild {
			nextPrefix += "│   "
		} else {
			nextPrefix += "    "
		}

		printTreeRecursive(currentNode.Right, nextPrefix, false)
	}

	connector := "└── "
	if !isLeftChild {
		connector = "┌── "
	}

	fmt.Printf("%s%s%d\n", prefix, connector, currentNode.Value)

	if currentNode.Left != nil {
		nextPrefix := prefix
		if isLeftChild {
			nextPrefix += "    "
		} else {
			nextPrefix += "│   "
		}

		printTreeRecursive(currentNode.Left, nextPrefix, true)
	}
}

// Optional: String rendering as inorder list for quick printing.
func (tree *BinarySearchTree) String() string {
	values := tree.InorderTraversal()
	parts := make([]string, 0, len(values))

	for _, value := range values {
		parts = append(parts, fmt.Sprintf("%d", value))
	}

	return fmt.Sprintf("[%s]", strings.Join(parts, ", "))
}
