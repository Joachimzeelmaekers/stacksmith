package helpers

// We use a nested loop here.
// Time complexity: O(n²)
// Space complexity: O(1)
func HasDuplicateSlow(values []int) bool {
	for i := 0; i < len(values); i++ {
		for j := i + 1; j < len(values); j++ {
			if values[i] == values[j] {
				return true
			}
		}
	}
	return false
}

// We use a hash set here.
// Time complexity: O(n)
// Space complexity: O(n)
func HasDuplicateFast(values []int) bool {
	seen := make(map[int]struct{})
	for _, value := range values {
		if _, exists := seen[value]; exists {
			return true
		}
		seen[value] = struct{}{}
	}
	return false
}
