package main

import (
	"fmt"
	"sort"
)

func partition(arr []int, left, right int) int {
	pivotIndex := right
	pivot := arr[pivotIndex]
	i := left

	for j := left; j < right; j++ {
		if arr[j] < pivot {
			arr[i], arr[j] = arr[j], arr[i]
			i++
		}
	}

	arr[i], arr[pivotIndex] = arr[pivotIndex], arr[i]
	return i
}

func quickselect(arr []int, k int) int {
	kIndex := k - 1
	left := 0
	right := len(arr) - 1

	for {
		pivotIndex := partition(arr, left, right)

		if pivotIndex == kIndex {
			return arr[pivotIndex]
		} else if pivotIndex < kIndex {
			left = pivotIndex + 1
		} else {
			right = pivotIndex - 1
		}
	}
}

func getSuffix(n int) string {
	if n >= 11 && n <= 13 {
		return "th"
	}
	switch n % 10 {
	case 1:
		return "st"
	case 2:
		return "nd"
	case 3:
		return "rd"
	default:
		return "th"
	}
}

func main() {
	fmt.Println("=== Quickselect - Find Kth Smallest ===")
	fmt.Println()

	arr := []int{8, 5, 2, 9, 7, 6, 3}
	fmt.Printf("Array: %v\n\n", arr)

	sorted := make([]int, len(arr))
	copy(sorted, arr)
	sort.Ints(sorted)
	fmt.Printf("Sorted would be: %v\n\n", sorted)

	for k := 1; k <= len(arr); k++ {
		arrCopy := make([]int, len(arr))
		copy(arrCopy, arr)
		result := quickselect(arrCopy, k)
		fmt.Printf("  %d%s smallest: %d\n", k, getSuffix(k), result)
	}
}

