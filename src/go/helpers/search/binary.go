package search

import "fmt"

func BinarySearch(arr []int, target int, enableLogging bool) (int, int) {
	left := 0
	right := len(arr) - 1
	steps := 0

	for left <= right {
		steps++
		mid := (left + right) / 2

		if enableLogging {
			fmt.Printf("  Step %d: Check arr[%d] = %d (range: %d-%d)\n", steps, mid, arr[mid], left, right)
		}

		if arr[mid] == target {
			return mid, steps
		} else if arr[mid] < target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	return -1, steps
}
