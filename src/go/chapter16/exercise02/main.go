package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Max-Heap Extract ===")
	fmt.Println()

	heap := &datastructures.MaxHeap{}
	for _, v := range []int{50, 30, 70, 10, 40, 60, 80} {
		heap.Insert(v)
	}

	fmt.Printf("Initial heap: %s\n", heap.String())
	fmt.Println()
	fmt.Println("Extracting all values in order:")

	for heap.Size() > 0 {
		max, _ := heap.ExtractMax()
		fmt.Printf("  Extracted %d → Remaining: %s\n", max, heap.String())
	}

	fmt.Println()
	fmt.Println("✓ Extract: O(log n) - heapify down from root")
}
