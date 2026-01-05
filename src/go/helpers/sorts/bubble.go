package sorts

func BubbleSort(arr []int) ([]int, int, int) {
	result := make([]int, len(arr))
	copy(result, arr)
	comparisons := 0
	swaps := 0
	sorted := false

	for !sorted {
		sorted = true
		for i := 0; i < len(result)-1; i++ {
			comparisons++
			if result[i] > result[i+1] {
				result[i], result[i+1] = result[i+1], result[i]
				swaps++
				sorted = false
			}
		}
	}

	return result, comparisons, swaps
}
