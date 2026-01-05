package array

func twoSumIndices(nums []int, target int) (int, int, bool) {
	seen := make(map[int]int)

	for i, num := range nums {
		complement := target - num
		if j, ok := seen[complement]; ok {
			return j, i, true
		}
		seen[num] = i
	}

	return 0, 0, false
}

func TwoSum(nums []int, target int) (int, int, bool) {
	return twoSumIndices(nums, target)
}

func TwoSumSlice(nums []int, target int) []int {
	i, j, found := twoSumIndices(nums, target)

	if !found {
		return []int{}
	}

	return []int{i, j}
}
