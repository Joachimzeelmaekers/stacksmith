package main

import (
	"dsa/helpers/search"
	"fmt"
	"time"
)

type BenchmarkResult struct {
	size     int
	linearNs int64
	binaryNs int64
	speedup  float64
}

func benchmarkSearch(size int, iterations int) BenchmarkResult {
	// Create sorted array
	arr := make([]int, size)
	for i := range arr {
		arr[i] = i
	}

	// Target: last element (worst case for linear)
	target := size - 1

	// Benchmark linear search
	start := time.Now()
	for i := 0; i < iterations; i++ {
		search.LinearSearch(arr, target, false)
	}
	linearNs := time.Since(start).Nanoseconds()

	// Benchmark binary search
	start = time.Now()
	for i := 0; i < iterations; i++ {
		search.BinarySearch(arr, target, false)
	}
	binaryNs := time.Since(start).Nanoseconds()

	return BenchmarkResult{
		size:     size,
		linearNs: linearNs,
		binaryNs: binaryNs,
		speedup:  float64(linearNs) / float64(binaryNs),
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

func printResults(results []BenchmarkResult) {
	fmt.Println("\n┌────────────┬──────────────┬──────────────┬──────────────┐")
	fmt.Println("│    Size    │  Linear O(N) │Binary O(logN)│   Speedup    │")
	fmt.Println("├────────────┼──────────────┼──────────────┼──────────────┤")

	for _, r := range results {
		fmt.Printf("│ %10s │ %12s │ %12s │ %10.1fx  │\n",
			formatNumber(r.size),
			formatDuration(r.linearNs),
			formatDuration(r.binaryNs),
			r.speedup)
	}

	fmt.Println("└────────────┴──────────────┴──────────────┴──────────────┘")
}

func formatNumber(n int) string {
	if n >= 1000000 {
		return fmt.Sprintf("%dM", n/1000000)
	} else if n >= 1000 {
		return fmt.Sprintf("%dK", n/1000)
	}
	return fmt.Sprintf("%d", n)
}

func main() {
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("Chapter 2: Linear vs Binary Search Benchmark (Go)")
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("\nThis benchmark demonstrates why binary search O(log N) is")
	fmt.Println("dramatically faster than linear search O(N) on sorted data.\n")

	fmt.Println("Running 1000 searches at each size...\n")

	sizes := []int{100, 1000, 10000, 100000, 1000000}
	results := make([]BenchmarkResult, 0)

	for _, size := range sizes {
		fmt.Printf("  Benchmarking size %10s...", formatNumber(size))
		result := benchmarkSearch(size, 1000)
		results = append(results, result)
		fmt.Printf(" done (%.1fx faster)\n", result.speedup)
	}

	printResults(results)

	fmt.Println("\nKey Observations:")
	fmt.Println("   • Linear search checks every element: O(N)")
	fmt.Println("   • Binary search halves the search space each step: O(log N)")
	fmt.Println("   • At 1M elements: linear = 1M steps, binary = ~20 steps!")
	fmt.Println("   • Binary search requires sorted data\n")
}
