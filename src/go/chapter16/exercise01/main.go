package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Max-Heap Insert ===")
	fmt.Println()

	heap := &datastructures.MaxHeap{}
	values := []int{50, 30, 70, 10, 40, 60, 80}

	fmt.Println("Inserting values into max-heap:")
	for _, value := range values {
		heap.Insert(value)
		fmt.Printf("  Insert %d → Heap: %s\n", value, heap.String())
	}

	max, _ := heap.Peek()
	fmt.Printf("\nMax value (peek): %d\n", max)
	fmt.Println()
	fmt.Println("✓ Insert: O(log n) - heapify up from leaf to root")
}
