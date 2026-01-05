package main

import (
	"fmt"
	"time"
)

func isSortedPessimistic(arr []int) bool {
	sorted := true
	for i := 0; i < len(arr)-1; i++ {
		if arr[i] > arr[i+1] {
			sorted = false
		}
	}
	return sorted
}

func isSortedOptimistic(arr []int) bool {
	for i := 0; i < len(arr)-1; i++ {
		if arr[i] > arr[i+1] {
			return false
		}
	}
	return true
}

func main() {
	fmt.Println("=== Optimistic vs Pessimistic Scenarios ===")
	fmt.Println()

	sorted := make([]int, 10000)
	for i := range sorted {
		sorted[i] = i
	}

	unsortedEarly := make([]int, 10000)
	unsortedEarly[0] = 10
	unsortedEarly[1] = 1
	for i := 2; i < 10000; i++ {
		unsortedEarly[i] = i
	}

	unsortedLate := make([]int, 10000)
	for i := 0; i < 9998; i++ {
		unsortedLate[i] = i
	}
	unsortedLate[9998] = 10
	unsortedLate[9999] = 1

	scenarios := []struct {
		name string
		arr  []int
	}{
		{"Sorted array", sorted},
		{"Unsorted at start", unsortedEarly},
		{"Unsorted at end", unsortedLate},
	}

	fmt.Println("Checking 10,000 element arrays:")
	fmt.Println()

	fmt.Println("Scenario              Pessimistic    Optimistic")
	fmt.Println("──────────────────────────────────────────────────")

	for _, s := range scenarios {
		start := time.Now()
		for i := 0; i < 100; i++ {
			isSortedPessimistic(s.arr)
		}
		pess := time.Since(start) / 100

		start = time.Now()
		for i := 0; i < 100; i++ {
			isSortedOptimistic(s.arr)
		}
		opt := time.Since(start) / 100

		fmt.Printf("%-20s  %10v   %10v\n", s.name, pess, opt)
	}

	fmt.Println()
	fmt.Println("✓ Early returns optimize for the common case")
}

