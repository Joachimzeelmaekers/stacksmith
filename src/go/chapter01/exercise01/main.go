package main

import "fmt"

func main() {
	fmt.Println("=== Array Operations Step Count (100 elements) ===")
	fmt.Println()

	arr := make([]int, 100)
	for i := range arr {
		arr[i] = i + 1
	}

	fmt.Println("Operation                              Steps")
	fmt.Println("──────────────────────────────────────────────────")

	fmt.Println("Reading at specific index              1")
	fmt.Printf("  → arr[50] = %d (direct access)\n\n", arr[50])

	fmt.Println("Searching (value not in array)         100")
	fmt.Println("  → Must check every element")
	fmt.Println()

	fmt.Println("Insertion at beginning                 101")
	fmt.Println("  → 1 insert + 100 shifts")
	fmt.Println()

	fmt.Println("Insertion at end                       1")
	fmt.Println("  → Just append")
	fmt.Println()

	fmt.Println("Deletion at beginning                  100")
	fmt.Println("  → 1 delete + 99 shifts")
	fmt.Println()

	fmt.Println("Deletion at end                        1")
	fmt.Println("  → Just remove last")
	fmt.Println()

	fmt.Println("──────────────────────────────────────────────────")
	fmt.Println("Summary: Arrays excel at random access O(1)")
	fmt.Println("         but insertion/deletion at start is O(n)")
}

