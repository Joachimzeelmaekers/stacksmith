package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Call Center Simulation ===")
	fmt.Println()

	callQueue := &datastructures.Queue[string]{}

	fmt.Println("Incoming calls being placed on hold:")
	callQueue.Enqueue("Alice")
	fmt.Println("  → Alice placed on hold")
	callQueue.Enqueue("Bob")
	fmt.Println("  → Bob placed on hold")
	callQueue.Enqueue("Charlie")
	fmt.Println("  → Charlie placed on hold")

	fmt.Println()
	fmt.Println("Representatives becoming available:")

	for !callQueue.IsEmpty() {
		caller, _ := callQueue.Dequeue()
		fmt.Printf("  → %s connected to representative\n", caller)
	}

	fmt.Println()
	fmt.Println("✓ All callers served in order they arrived (FIFO)")
}
