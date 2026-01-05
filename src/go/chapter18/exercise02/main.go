package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
	"strings"
)

func main() {
	fmt.Println("=== DFS Traversal ===")
	fmt.Println()

	graph := datastructures.NewGraph()
	graph.AddEdge("A", "B")
	graph.AddEdge("A", "C")
	graph.AddEdge("B", "D")
	graph.AddEdge("B", "E")
	graph.AddEdge("C", "F")
	graph.AddEdge("D", "E")
	graph.AddEdge("E", "F")

	fmt.Println("Graph structure:")
	fmt.Println("    A")
	fmt.Println("   / \\")
	fmt.Println("  B   C")
	fmt.Println(" /|   |")
	fmt.Println("D-E---F")
	fmt.Println()

	fmt.Println("DFS Iterative from A:", strings.Join(graph.DFSIterative("A"), " → "))
	fmt.Println("DFS Recursive from A:", strings.Join(graph.DFSRecursive("A"), " → "))
	fmt.Println()
	fmt.Println("✓ DFS explores as deep as possible first (uses stack)")
}
