package main

import (
	"dsa/helpers/sorts"
	"fmt"
	"math/rand"
	"sort"
	"time"
)

type BenchmarkResult struct {
	size      int
	bubbleNs  int64
	quickNs   int64
	builtinNs int64
	speedup   float64
}

func benchmarkSort(size int) BenchmarkResult {
	// Create random array
	arr := make([]int, size)
	for i := range arr {
		arr[i] = rand.Intn(size)
	}

	// Benchmark bubble sort
	arr1 := make([]int, len(arr))
	copy(arr1, arr)
	start := time.Now()
	sorts.BubbleSort(arr1)
	bubbleNs := time.Since(start).Nanoseconds()

	// Benchmark quicksort
	arr2 := make([]int, len(arr))
	copy(arr2, arr)
	start = time.Now()
	sorts.QuickSort(arr2)
	quickNs := time.Since(start).Nanoseconds()

	// Benchmark built-in sort
	arr3 := make([]int, len(arr))
	copy(arr3, arr)
	start = time.Now()
	sort.Ints(arr3)
	builtinNs := time.Since(start).Nanoseconds()

	return BenchmarkResult{
		size:      size,
		bubbleNs:  bubbleNs,
		quickNs:   quickNs,
		builtinNs: builtinNs,
		speedup:   float64(bubbleNs) / float64(quickNs),
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
	fmt.Println("\n┌──────────┬──────────────┬──────────────┬──────────────┬──────────┐")
	fmt.Println("│   Size   │ Bubble O(N²) │Quick O(NlogN)│   Built-in   │ Speedup  │")
	fmt.Println("├──────────┼──────────────┼──────────────┼──────────────┼──────────┤")

	for _, r := range results {
		fmt.Printf("│ %8s │ %12s │ %12s │ %12s │ %6.1fx  │\n",
			formatNumber(r.size),
			formatDuration(r.bubbleNs),
			formatDuration(r.quickNs),
			formatDuration(r.builtinNs),
			r.speedup)
	}

	fmt.Println("└──────────┴──────────────┴──────────────┴──────────────┴──────────┘")
}

func main() {
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("Chapter 4: Sorting Algorithm Benchmark (Go)")
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("\nThis benchmark shows why O(N²) algorithms like bubble sort")
	fmt.Println("become impractical for large datasets.\n")

	fmt.Println("Sorting random arrays at each size...\n")

	// Smaller sizes for bubble sort (it's very slow!)
	sizes := []int{100, 500, 1000, 2000, 5000}
	results := make([]BenchmarkResult, 0)

	for _, size := range sizes {
		fmt.Printf("  Benchmarking size %6s...", formatNumber(size))
		result := benchmarkSort(size)
		results = append(results, result)
		fmt.Printf(" done (quicksort %.1fx faster)\n", result.speedup)
	}

	printResults(results)

	fmt.Println("\nKey Observations:")
	fmt.Println("   • Bubble sort: O(N²) - time quadruples when N doubles")
	fmt.Println("   • Quicksort: O(N log N) - much more scalable")
	fmt.Println("   • At 5000 elements, bubble sort is already painfully slow")
	fmt.Println("   • Built-in sort uses optimized O(N log N) algorithms\n")

	fmt.Println("Note: Bubble sort at 10,000+ elements would take minutes!\n")
}
