package main

import (
	"fmt"
	"time"
)

type BenchmarkResult struct {
	size    int
	arrayNs int64
	hashNs  int64
	speedup float64
}

func benchmarkLookup(size int, iterations int) BenchmarkResult {
	// Create array and hash map with same data
	arr := make([]int, size)
	hashMap := make(map[int]int)

	for i := 0; i < size; i++ {
		arr[i] = i
		hashMap[i] = i
	}

	// Target to search for (worst case for array - last element)
	target := size - 1

	// Benchmark array lookup (linear search)
	start := time.Now()
	for i := 0; i < iterations; i++ {
		for _, v := range arr {
			if v == target {
				break
			}
		}
	}
	arrayNs := time.Since(start).Nanoseconds()

	// Benchmark hash map lookup
	start = time.Now()
	for i := 0; i < iterations; i++ {
		_ = hashMap[target]
	}
	hashNs := time.Since(start).Nanoseconds()

	return BenchmarkResult{
		size:    size,
		arrayNs: arrayNs,
		hashNs:  hashNs,
		speedup: float64(arrayNs) / float64(hashNs),
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
	fmt.Println("│    Size    │  Array O(N)  │  Hash O(1)   │   Speedup    │")
	fmt.Println("├────────────┼──────────────┼──────────────┼──────────────┤")

	for _, r := range results {
		fmt.Printf("│ %10s │ %12s │ %12s │ %10.1fx  │\n",
			formatNumber(r.size),
			formatDuration(r.arrayNs),
			formatDuration(r.hashNs),
			r.speedup)
	}

	fmt.Println("└────────────┴──────────────┴──────────────┴──────────────┘")
}

func main() {
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("Chapter 8: Array vs Hash Table Lookup Benchmark (Go)")
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("\nThis benchmark demonstrates why hash tables have O(1) lookup")
	fmt.Println("compared to arrays which require O(N) linear search.\n")

	fmt.Println("Running 1000 lookups at each size...\n")

	sizes := []int{100, 1000, 10000, 100000, 1000000}
	results := make([]BenchmarkResult, 0)

	for _, size := range sizes {
		fmt.Printf("  Benchmarking size %10s...", formatNumber(size))
		result := benchmarkLookup(size, 1000)
		results = append(results, result)
		fmt.Printf(" done (%.1fx faster)\n", result.speedup)
	}

	printResults(results)

	fmt.Println("\nKey Observations:")
	fmt.Println("   • Array lookup time grows linearly with size (O(N))")
	fmt.Println("   • Hash table lookup stays constant regardless of size (O(1))")
	fmt.Println("   • The speedup increases as data size grows")
	fmt.Println("   • At 1M elements, hash lookup can be 1000x+ faster!\n")
}


