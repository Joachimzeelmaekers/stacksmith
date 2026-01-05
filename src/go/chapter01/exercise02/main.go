package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("=== Array vs Set Operations ===")
	fmt.Println()

	size := 1000
	arr := make([]int, size)
	set := make(map[int]struct{})
	for i := 0; i < size; i++ {
		arr[i] = i
		set[i] = struct{}{}
	}

	fmt.Printf("Data size: %d elements\n\n", size)

	searchValue := 999

	fmt.Println("Search Operation:")
	fmt.Println("────────────────────────────────────────")

	arraySteps := 0
	for _, val := range arr {
		arraySteps++
		if val == searchValue {
			break
		}
	}
	fmt.Printf("  Array: %d steps (linear search)\n", arraySteps)
	fmt.Println("  Set:   1 step (hash lookup)")

	fmt.Println()
	fmt.Println("Actual Performance Test:")
	fmt.Println("────────────────────────────────────────")

	largeSize := 1000000
	largeArr := make([]int, largeSize)
	largeSet := make(map[int]struct{})
	for i := 0; i < largeSize; i++ {
		largeArr[i] = i
		largeSet[i] = struct{}{}
	}
	target := 999999

	start := time.Now()
	for _, v := range largeArr {
		if v == target {
			break
		}
	}
	arrTime := time.Since(start)

	start = time.Now()
	_ = largeSet[target]
	setTime := time.Since(start)

	fmt.Printf("  Array search: %v\n", arrTime)
	fmt.Printf("  Set lookup:   %v\n", setTime)
}

