package main

import (
	"fmt"
	"time"
)

// Naive recursive Fibonacci - O(2^N)
func fibNaive(n int) int {
	if n <= 1 {
		return n
	}
	return fibNaive(n-1) + fibNaive(n-2)
}

// Memoized Fibonacci - O(N)
func fibMemo(n int, memo map[int]int) int {
	if n <= 1 {
		return n
	}
	if val, exists := memo[n]; exists {
		return val
	}

	result := fibMemo(n-1, memo) + fibMemo(n-2, memo)
	memo[n] = result
	return result
}

// Bottom-up DP Fibonacci - O(N)
func fibDP(n int) int {
	if n <= 1 {
		return n
	}

	prev2 := 0
	prev1 := 1

	for i := 2; i <= n; i++ {
		current := prev1 + prev2
		prev2 = prev1
		prev1 = current
	}

	return prev1
}

type BenchmarkResult struct {
	n       int
	naiveNs int64
	memoNs  int64
	dpNs    int64
}

func benchmarkFib(n int, includeNaive bool) BenchmarkResult {
	var naiveNs int64 = -1

	// Only benchmark naive for small N (it's exponential!)
	if includeNaive && n <= 35 {
		start := time.Now()
		fibNaive(n)
		naiveNs = time.Since(start).Nanoseconds()
	}

	// Benchmark memoized (run 1000 times for accuracy)
	start := time.Now()
	for i := 0; i < 1000; i++ {
		fibMemo(n, make(map[int]int))
	}
	memoNs := time.Since(start).Nanoseconds() / 1000

	// Benchmark bottom-up DP (run 1000 times for accuracy)
	start = time.Now()
	for i := 0; i < 1000; i++ {
		fibDP(n)
	}
	dpNs := time.Since(start).Nanoseconds() / 1000

	return BenchmarkResult{
		n:       n,
		naiveNs: naiveNs,
		memoNs:  memoNs,
		dpNs:    dpNs,
	}
}

func formatDuration(ns int64) string {
	if ns < 0 {
		return "TOO SLOW"
	}
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
	fmt.Println("\n┌──────┬──────────────┬──────────────┬──────────────┐")
	fmt.Println("│  N   │ Naive O(2^N) │  Memo O(N)   │   DP O(N)    │")
	fmt.Println("├──────┼──────────────┼──────────────┼──────────────┤")

	for _, r := range results {
		fmt.Printf("│ %4d │ %12s │ %12s │ %12s │\n",
			r.n,
			formatDuration(r.naiveNs),
			formatDuration(r.memoNs),
			formatDuration(r.dpNs))
	}

	fmt.Println("└──────┴──────────────┴──────────────┴──────────────┘")
}

func main() {
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("Chapter 12: Dynamic Programming Benchmark (Go)")
	fmt.Println("════════════════════════════════════════════════════════════")
	fmt.Println("\nThis benchmark shows the dramatic difference between naive")
	fmt.Println("recursion O(2^N) and dynamic programming O(N).\n")

	fmt.Println("Computing Fibonacci numbers...\n")

	results := make([]BenchmarkResult, 0)

	// Small N with naive recursion
	for _, n := range []int{10, 20, 25, 30, 35} {
		fmt.Printf("  Benchmarking fib(%2d) with naive...", n)
		result := benchmarkFib(n, true)
		results = append(results, result)
		fmt.Println(" done")
	}

	// Larger N without naive (would take forever)
	fmt.Println("\n  Skipping naive for large N (would take hours/days)...\n")
	for _, n := range []int{40, 50, 100, 1000} {
		fmt.Printf("  Benchmarking fib(%4d) with memo/DP...", n)
		result := benchmarkFib(n, false)
		results = append(results, result)
		fmt.Println(" done")
	}

	printResults(results)

	fmt.Println("\nKey Observations:")
	fmt.Println("   • Naive recursion: O(2^N) - doubles with each +1 to N")
	fmt.Println("   • fib(35) naive ≈ 2^35 = 34 billion operations!")
	fmt.Println("   • Memoization: O(N) - each value computed only once")
	fmt.Println("   • Bottom-up DP: O(N) time, O(1) space - most efficient")
	fmt.Println("   • fib(1000) is instant with DP, impossible with naive\n")
}


