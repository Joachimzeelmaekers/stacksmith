package main

import (
	"fmt"
	"time"
)

func intersectionSlow(arr1, arr2 []int) []int {
	result := []int{}
	seen := make(map[int]bool)
	for _, a := range arr1 {
		for _, b := range arr2 {
			if a == b && !seen[a] {
				result = append(result, a)
				seen[a] = true
			}
		}
	}
	return result
}

func intersectionFast(arr1, arr2 []int) []int {
	set1 := make(map[int]struct{})
	for _, a := range arr1 {
		set1[a] = struct{}{}
	}

	result := make(map[int]struct{})
	for _, b := range arr2 {
		if _, exists := set1[b]; exists {
			result[b] = struct{}{}
		}
	}

	out := make([]int, 0, len(result))
	for k := range result {
		out = append(out, k)
	}
	return out
}

func main() {
	fmt.Println("=== Array Intersection ===")
	fmt.Println()

	fmt.Println("Testing correctness:")
	arr1 := []int{1, 2, 3, 4, 5}
	arr2 := []int{4, 5, 6, 7, 8}
	fmt.Printf("  arr1: %v\n", arr1)
	fmt.Printf("  arr2: %v\n", arr2)
	fmt.Printf("  slow: %v\n", intersectionSlow(arr1, arr2))
	fmt.Printf("  fast: %v\n", intersectionFast(arr1, arr2))

	fmt.Println()
	fmt.Println("Performance comparison:")
	fmt.Println("Size       O(N×M)        O(N+M)")
	fmt.Println("────────────────────────────────────────")

	for _, size := range []int{500, 1000, 2000, 3000} {
		a1 := make([]int, size)
		a2 := make([]int, size)
		for i := 0; i < size; i++ {
			a1[i] = i
			a2[i] = i + size/2
		}

		start := time.Now()
		intersectionSlow(a1, a2)
		slow := time.Since(start)

		start = time.Now()
		intersectionFast(a1, a2)
		fast := time.Since(start)

		fmt.Printf("%6d   %12v   %12v\n", size, slow, fast)
	}

	fmt.Println()
	fmt.Println("✓ Hash set enables O(N + M) intersection")
}

