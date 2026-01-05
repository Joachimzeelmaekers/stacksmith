package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Queue Dequeue Reading Exercise ===")
	fmt.Println()

	queue := &datastructures.Queue[int]{}

	fmt.Println("Enqueueing numbers 1-6:")
	for i := 1; i <= 6; i++ {
		queue.Enqueue(i)
		fmt.Printf("  enqueue(%d) → queue: %v\n", i, queue.Messages)
	}

	fmt.Println()
	fmt.Println("Performing two dequeues:")
	val, _ := queue.Dequeue()
	fmt.Printf("  dequeue() → %d removed\n", val)
	val, _ = queue.Dequeue()
	fmt.Printf("  dequeue() → %d removed\n", val)

	front, _ := queue.Read()
	fmt.Printf("\nReading front of queue: %d\n", front)
	fmt.Println()
	fmt.Println("✓ Answer: 3")
}
