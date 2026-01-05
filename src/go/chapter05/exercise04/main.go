package main

import (
	"fmt"
	"time"
)

func sumMultiplesLinear(n int) int {
	sum := 0
	for i := 1; i < n; i++ {
		if i%3 == 0 || i%5 == 0 {
			sum += i
		}
	}
	return sum
}

func sumMultiplesConstant(n int) int {
	sumDivisibleBy := func(k, max int) int {
		p := (max - 1) / k
		return k * (p * (p + 1)) / 2
	}

	return sumDivisibleBy(3, n) + sumDivisibleBy(5, n) - sumDivisibleBy(15, n)
}

func main() {
	fmt.Println("=== Sum of Multiples - O(N) vs O(1) ===")
	fmt.Println()

	fmt.Println("Find sum of all multiples of 3 or 5 below N")
	fmt.Println()

	fmt.Println("Testing correctness:")
	for _, n := range []int{10, 100, 1000} {
		linear := sumMultiplesLinear(n)
		constant := sumMultiplesConstant(n)
		fmt.Printf("  N=%d: linear=%d, constant=%d, match=%t\n", n, linear, constant, linear == constant)
	}

	fmt.Println()
	fmt.Println("Performance comparison:")
	fmt.Println("N              O(N)         O(1)")
	fmt.Println("────────────────────────────────────────")

	for _, n := range []int{1000000, 10000000, 100000000} {
		start := time.Now()
		sumMultiplesLinear(n)
		linear := time.Since(start)

		start = time.Now()
		sumMultiplesConstant(n)
		constant := time.Since(start)

		fmt.Printf("%12d   %10v   %10v\n", n, linear, constant)
	}

	fmt.Println()
	fmt.Println("✓ Mathematical formulas can reduce O(N) to O(1)!")
}

