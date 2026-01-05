package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Stack Pop Reading Exercise ===")
	fmt.Println()

	stack := &datastructures.Stack[int]{}

	fmt.Println("Pushing numbers 1-6 onto the stack:")
	for i := 1; i <= 6; i++ {
		stack.Push(i)
		fmt.Printf("  push(%d) → stack: %v\n", i, stack.Items)
	}

	fmt.Println()
	fmt.Println("Performing two pops:")
	val, _ := stack.Pop()
	fmt.Printf("  pop() → %d removed\n", val)
	val, _ = stack.Pop()
	fmt.Printf("  pop() → %d removed\n", val)

	top, _ := stack.Peek()
	fmt.Printf("\nReading top of stack: %d\n", top)
	fmt.Println()
	fmt.Println("✓ Answer: 4")
}
