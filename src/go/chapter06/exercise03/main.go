package main

import (
	"dsa/helpers/sorts"
	"fmt"
	"time"
)

func main() {
	fmt.Println("=== Sorting Algorithm Selection ===")
	fmt.Println()

	nearlySorted := make([]int, 1000)
	for i := range nearlySorted {
		nearlySorted[i] = i
	}
	nearlySorted[100], nearlySorted[101] = nearlySorted[101], nearlySorted[100]
	nearlySorted[500], nearlySorted[501] = nearlySorted[501], nearlySorted[500]

	random := make([]int, 1000)
	for i := range random {
		random[i] = i * 7 % 1000
	}

	fmt.Println("Nearly sorted data (1000 elements, 2 swaps):")
	arr1 := make([]int, len(nearlySorted))
	copy(arr1, nearlySorted)
	start := time.Now()
	sorts.InsertionSort(arr1)
	fmt.Printf("  Insertion sort: %v\n", time.Since(start))

	copy(arr1, nearlySorted)
	start = time.Now()
	sorts.SelectionSort(arr1)
	fmt.Printf("  Selection sort: %v\n", time.Since(start))

	fmt.Println()
	fmt.Println("Random data (1000 elements):")
	arr2 := make([]int, len(random))
	copy(arr2, random)
	start = time.Now()
	sorts.InsertionSort(arr2)
	fmt.Printf("  Insertion sort: %v\n", time.Since(start))

	copy(arr2, random)
	start = time.Now()
	sorts.SelectionSort(arr2)
	fmt.Printf("  Selection sort: %v\n", time.Since(start))

	fmt.Println()
	fmt.Println("✓ Insertion sort wins for nearly-sorted data")
	fmt.Println("  Selection sort is more consistent but never fast")
}
