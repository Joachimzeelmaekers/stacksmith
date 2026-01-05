package main

import (
	datastructures "dsa/helpers/data-structures"
	"fmt"
)

func main() {
	fmt.Println("=== Print All Elements ===")
	fmt.Println()

	list := &datastructures.LinkedList[int]{}
	for _, n := range []int{1, 2, 3, 4, 5} {
		list.Append(n)
	}

	fmt.Println("Linked list contents:")
	list.PrintAll()

	stringList := &datastructures.LinkedList[string]{}
	for _, s := range []string{"Alice", "Bob", "Charlie"} {
		stringList.Append(s)
	}

	fmt.Println()
	fmt.Println("String linked list:")
	stringList.PrintAll()
}
