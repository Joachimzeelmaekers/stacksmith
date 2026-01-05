package sorts

func SelectionSort(arr []int) ([]int, int, int) {
	result := make([]int, len(arr))
	copy(result, arr)
	comparisons := 0
	swaps := 0

	for i := 0; i < len(result)-1; i++ {
		minIdx := i
		for j := i + 1; j < len(result); j++ {
			comparisons++
			if result[j] < result[minIdx] {
				minIdx = j
			}
		}
		if minIdx != i {
			result[i], result[minIdx] = result[minIdx], result[i]
			swaps++
		}
	}

	return result, comparisons, swaps
}
