package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
	"strings"
)

func main() {
	fmt.Println("=== Find Path Between Vertices ===")
	fmt.Println()

	graph := datastructures.NewGraph()
	graph.AddEdge("A", "B")
	graph.AddEdge("B", "C")
	graph.AddEdge("C", "D")
	graph.AddEdge("A", "E")
	graph.AddEdge("E", "F")

	graph.AddVertex("X")
	graph.AddVertex("Y")
	graph.AddEdge("X", "Y")

	fmt.Println("Graph: A-B-C-D, A-E-F, X-Y (disconnected)")
	fmt.Println()

	tests := []struct{ start, end string }{
		{"A", "D"},
		{"A", "F"},
		{"A", "X"},
		{"X", "Y"},
	}

	for _, test := range tests {
		hasPath := graph.HasPath(test.start, test.end)
		path := graph.FindPath(test.start, test.end)

		status := "Path exists"
		if !hasPath {
			status = "No path"
		}
		fmt.Printf("%s → %s: %s\n", test.start, test.end, status)
		if path != nil {
			fmt.Printf("  Path: %s\n", strings.Join(path, " → "))
		}
		fmt.Println()
	}
}
