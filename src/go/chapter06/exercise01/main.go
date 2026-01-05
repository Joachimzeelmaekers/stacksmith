package main

import (
	"dsa/helpers"
	"dsa/helpers/sorts"
	"fmt"
)

func main() {
	fmt.Println("=== Insertion Sort ===")
	fmt.Println()

	scenarios := []struct {
		name string
		arr  []int
	}{
		{"Worst case (reverse)", []int{5, 4, 3, 2, 1}},
		{"Best case (sorted)", []int{1, 2, 3, 4, 5}},
		{"Nearly sorted", []int{1, 2, 4, 3, 5}},
		{"Random", []int{3, 1, 4, 1, 5, 9, 2, 6}},
	}

	for _, s := range scenarios {
		fmt.Printf("%s:\n", s.name)
		fmt.Printf("  Input:  %s\n", helpers.IntSliceToString(s.arr))
		sorted, comparisons, shifts := sorts.InsertionSort(s.arr)
		fmt.Printf("  Output: %s\n", helpers.IntSliceToString(sorted))
		fmt.Printf("  Comparisons: %d, Shifts: %d\n\n", comparisons, shifts)
	}

	fmt.Println("Time Complexity:")
	fmt.Println("  Worst case: O(N²) - reverse sorted")
	fmt.Println("  Best case:  O(N) - already sorted ← Key advantage!")
	fmt.Println("  Average:    O(N²)")
}
