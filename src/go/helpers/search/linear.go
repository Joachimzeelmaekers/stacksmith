package search

import "fmt"

func LinearSearch(values []int, target int, enableLogging bool) (int, int) {
	steps := 0
	for i, value := range values {
		steps++
		if enableLogging {
			fmt.Printf("  Step %d: Check arr[%d] = %d\n", steps, i, value)
		}

		if value == target {
			return i, steps
		}
	}
	return -1, steps
}
