package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
	"strings"
)

func main() {
	fmt.Println("=== BFS Traversal ===")
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

	result := graph.BFS("A")
	fmt.Println("BFS starting from A:", strings.Join(result, " → "))
	fmt.Println()
	fmt.Println("✓ BFS explores level by level (uses queue)")
}
