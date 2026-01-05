package sorts

func InsertionSort(arr []int) ([]int, int, int) {
	result := make([]int, len(arr))
	copy(result, arr)
	comparisons := 0
	shifts := 0

	for i := 1; i < len(result); i++ {
		temp := result[i]
		j := i - 1

		for j >= 0 {
			comparisons++
			if result[j] > temp {
				result[j+1] = result[j]
				shifts++
				j--
			} else {
				break
			}
		}
		result[j+1] = temp
	}

	return result, comparisons, shifts
}
