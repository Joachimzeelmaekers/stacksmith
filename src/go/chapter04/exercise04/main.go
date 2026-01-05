package main

import (
	"dsa/helpers/sorts"
	"fmt"
	"math/rand"
	"sort"
	"time"
)

func main() {
	fmt.Println("=== Sorting Algorithm Comparison ===")
	fmt.Println()

	sizes := []int{100, 500, 1000, 2000}

	fmt.Println("Array Size   Bubble Sort   Selection Sort   Built-in Sort")
	fmt.Println("────────────────────────────────────────────────────────────")

	for _, size := range sizes {
		arr := make([]int, size)
		for i := range arr {
			arr[i] = rand.Intn(10000)
		}

		arr1 := make([]int, len(arr))
		copy(arr1, arr)
		start := time.Now()
		sorts.BubbleSort(arr1)
		bubble := time.Since(start)

		arr2 := make([]int, len(arr))
		copy(arr2, arr)
		start = time.Now()
		sorts.SelectionSort(arr2)
		selection := time.Since(start)

		arr3 := make([]int, len(arr))
		copy(arr3, arr)
		start = time.Now()
		sort.Ints(arr3)
		builtin := time.Since(start)

		fmt.Printf("%10d   %10v     %12v   %12v\n", size, bubble, selection, builtin)
	}

	fmt.Println()
	fmt.Println("✓ Built-in sort uses O(N log N) algorithm")
	fmt.Println("  Much faster than O(N²) algorithms for large arrays")
}
