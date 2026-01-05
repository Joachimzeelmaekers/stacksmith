package main

import "fmt"

func isLeapYear(year int) bool {
	if year%100 == 0 {
		return year%400 == 0
	}
	return year%4 == 0
}

func main() {
	fmt.Println("=== Leap Year - Time Complexity ===")
	fmt.Println()

	fmt.Println("Function:")
	fmt.Println("  func isLeapYear(year int) bool {")
	fmt.Println("    return (year % 100 == 0) ? (year % 400 == 0) : (year % 4 == 0)")
	fmt.Println("  }")
	fmt.Println()

	fmt.Println("Analysis:")
	fmt.Println("  - Only performs arithmetic operations")
	fmt.Println("  - No loops or recursion")
	fmt.Println("  - Always takes the same number of steps")
	fmt.Println("  - Does NOT depend on input size")
	fmt.Println()

	fmt.Println("✓ Time Complexity: O(1) - Constant time")
	fmt.Println()

	fmt.Println("Testing the function:")
	years := []int{2000, 2020, 2021, 2024, 1900, 2100}
	for _, year := range years {
		result := "Not a leap year"
		if isLeapYear(year) {
			result = "Leap year"
		}
		fmt.Printf("  %d: %s\n", year, result)
	}
}

