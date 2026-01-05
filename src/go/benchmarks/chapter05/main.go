package main

import (
	"fmt"
	"time"
)

// O(N²) - Nested loops
func hasDuplicateNested(arr []int) bool {
	for i := 0; i < len(arr); i++ {
		for j := i + 1; j < len(arr); j++ {
			if arr[i] == arr[j] {
				return true
			}
		}
	}
	return false
}

// O(N) - Hash set
func hasDuplicateHash(arr []int) bool {
	seen := make(map[int]struct{})
	for _, num := range arr {
		if _, exists := seen[num]; exists {
			return true
		}
		seen[num] = struct{}{}
	}
	return false
}

type BenchmarkResult struct {
	size     int
	nestedNs int64
	hashNs   int64
	speedup  float64
}

func benchmarkDuplicates(size int) BenchmarkResult {
	// Create array with no duplicates (worst case for both)
	arr := make([]int, size)
	for i := range arr {
		arr[i] = i
	}

	// Benchmark nested loops O(N²)
	start := time.Now()
	hasDuplicateNested(arr)
	nestedNs := time.Since(start).Nanoseconds()

	// Benchmark hash set O(N) - run multiple times for accuracy
	start = time.Now()
	for i := 0; i < 100; i++ {
		hasDuplicateHash(arr)
	}
	hashNs := time.Since(start).Nanoseconds() / 100

	return BenchmarkResult{
		size:     size,
		nestedNs: nestedNs,
		hashNs:   hashNs,
		speedup:  float64(nestedNs) / float64(hashNs),
	}
}

func formatDuration(ns int64) string {
	if ns < 1000 {
		return fmt.Sprintf("%dns", ns)
	} else if ns < 1000000 {
		return fmt.Sprintf("%.2fµs", float64(ns)/1000)
	} else if ns < 1000000000 {
		return fmt.Sprintf("%.2fms", float64(ns)/1000000)
	}
	return fmt.Sprintf("%.2fs", float64(ns)/1000000000)
}

func formatNumber(n int) string {
	if n >= 1000000 {
		return fmt.Sprintf("%dM", n/1000000)
	} else if n >= 1000 {
		return fmt.Sprintf("%dK", n/1000)
	}
	return fmt.Sprintf("%d", n)
}

func printResults(results []BenchmarkResult) {
	fmt.Println("\n┌────────────┬──────────────┬──────────────┬──────────────┐")
	fmt.Println("│    Size    │ Nested O(N²) │  Hash O(N)   │   Speedup    │")
	fmt.Println("├────────────┼──────────────┼──────────────┼──────────────┤")

	for _, r := range results {
		fmt.Printf("│ %10s │ %12s │ %12s │ %10.1fx  │\n",
			formatNumber(r.size),
			formatDuration(r.nestedNs),
			formatDuration(r.hashNs),
			r.speedup)
	}

	fmt.Println("└────────────┴──────────────┴──────────────┴──────────────┘")
}

func main() {
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("Chapter 5: Finding Duplicates - O(N^2) vs O(N) (Go)")
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("\nThis benchmark shows how using a hash set can transform")
	fmt.Println("an O(N²) algorithm into O(N) - trading space for time.\n")

	fmt.Println("Checking for duplicates (worst case: no duplicates)...\n")

	sizes := []int{1000, 2000, 5000, 10000, 20000}
	results := make([]BenchmarkResult, 0)

	for _, size := range sizes {
		fmt.Printf("  Benchmarking size %6s...", formatNumber(size))
		result := benchmarkDuplicates(size)
		results = append(results, result)
		fmt.Printf(" done (hash %.1fx faster)\n", result.speedup)
	}

	printResults(results)

	fmt.Println("\nKey Observations:")
	fmt.Println("   • Nested loops: O(N²) - checks every pair")
	fmt.Println("   • Hash set: O(N) - single pass with O(1) lookups")
	fmt.Println("   • Trade-off: hash uses O(N) extra space")
	fmt.Println("   • The speedup grows as data size increases\n")
}


