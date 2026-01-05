package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println("=== Big O Growth Comparison ===")
	fmt.Println()

	fmt.Println("N        O(1)     O(log N)    O(N)      O(N log N)    O(N²)")
	fmt.Println("─────────────────────────────────────────────────────────────────")

	sizes := []int{1, 10, 100, 1000, 10000}

	for _, n := range sizes {
		o1 := 1
		oLogN := int(math.Ceil(math.Log2(float64(n))))
		if n == 1 {
			oLogN = 0
		}
		oN := n
		oNLogN := n * oLogN
		oN2 := n * n

		fmt.Printf("%6d   %4d     %6d      %6d    %10d    %10d\n",
			n, o1, oLogN, oN, oNLogN, oN2)
	}

	fmt.Println()
	fmt.Println()
	fmt.Println("Key Takeaways:")
	fmt.Println("  • O(1) - Constant: Always the same")
	fmt.Println("  • O(log N) - Logarithmic: Grows very slowly (binary search)")
	fmt.Println("  • O(N) - Linear: Grows proportionally (simple loops)")
	fmt.Println("  • O(N log N) - Linearithmic: Efficient sorting (mergesort)")
	fmt.Println("  • O(N²) - Quadratic: Avoid for large N (nested loops)")
}

