package main

import (
	"dsa/helpers"
	"fmt"
)

func heapSort(arr []int) []int {
	n := len(arr)

	for i := n/2 - 1; i >= 0; i-- {
		heapify(arr, n, i)
	}

	for i := n - 1; i > 0; i-- {
		arr[0], arr[i] = arr[i], arr[0]
		heapify(arr, i, 0)
	}

	return arr
}

func heapify(arr []int, heapSize, rootIndex int) {
	largest := rootIndex
	left := 2*rootIndex + 1
	right := 2*rootIndex + 2

	if left < heapSize && arr[left] > arr[largest] {
		largest = left
	}

	if right < heapSize && arr[right] > arr[largest] {
		largest = right
	}

	if largest != rootIndex {
		arr[rootIndex], arr[largest] = arr[largest], arr[rootIndex]
		heapify(arr, heapSize, largest)
	}
}

func main() {
	fmt.Println("=== Heap Sort ===")
	fmt.Println()

	testCases := [][]int{
		{64, 34, 25, 12, 22, 11, 90},
		{5, 4, 3, 2, 1},
		{1, 2, 3, 4, 5},
		{3, 1, 4, 1, 5, 9, 2, 6},
	}

	for _, test := range testCases {
		original := make([]int, len(test))
		copy(original, test)

		sorted := heapSort(test)
		fmt.Printf("Original: %s\n", helpers.IntSliceToString(original))
		fmt.Printf("  Sorted: %s\n\n", helpers.IntSliceToString(sorted))
	}

	fmt.Println("✓ Heap Sort: O(n log n) time, O(1) space (in-place)")
}
