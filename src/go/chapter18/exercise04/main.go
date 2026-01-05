package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
	"strings"
)

func main() {
	fmt.Println("=== Shortest Path (BFS) ===")
	fmt.Println()

	graph := datastructures.NewGraph()
	graph.AddEdge("A", "B")
	graph.AddEdge("A", "C")
	graph.AddEdge("B", "D")
	graph.AddEdge("B", "E")
	graph.AddEdge("C", "F")
	graph.AddEdge("D", "G")
	graph.AddEdge("E", "G")
	graph.AddEdge("F", "G")

	fmt.Println("Graph:")
	fmt.Println("    A")
	fmt.Println("   / \\")
	fmt.Println("  B   C")
	fmt.Println(" /|   |")
	fmt.Println("D E   F")
	fmt.Println(" \\|  /")
	fmt.Println("   G")
	fmt.Println()

	paths := []struct{ start, end string }{
		{"A", "G"},
		{"B", "F"},
		{"D", "C"},
	}

	for _, p := range paths {
		path := graph.ShortestPath(p.start, p.end)
		if path != nil {
			fmt.Printf("%s → %s: %s (length: %d)\n", p.start, p.end, strings.Join(path, " → "), len(path)-1)
		} else {
			fmt.Printf("%s → %s: No path found\n", p.start, p.end)
		}
	}

	fmt.Println()
	fmt.Println("✓ BFS finds shortest path in unweighted graphs")
}
