package main

import (
	"fmt"
	"strings"
)

type ListNode[T any] struct {
	Value T
	Next  *ListNode[T]
}

type LinkedListWithTail[T any] struct {
	Head   *ListNode[T]
	Tail   *ListNode[T]
	length int
}

func (l *LinkedListWithTail[T]) Append(value T) {
	node := &ListNode[T]{Value: value}
	if l.Tail == nil {
		l.Head = node
		l.Tail = node
	} else {
		l.Tail.Next = node
		l.Tail = node
	}
	l.length++
}

func (l *LinkedListWithTail[T]) GetLast() (T, bool) {
	var zero T
	if l.Tail == nil {
		return zero, false
	}
	return l.Tail.Value, true
}

func (l *LinkedListWithTail[T]) GetFirst() (T, bool) {
	var zero T
	if l.Head == nil {
		return zero, false
	}
	return l.Head.Value, true
}

func (l *LinkedListWithTail[T]) Size() int {
	return l.length
}

func (l *LinkedListWithTail[T]) String() string {
	var values []string
	current := l.Head
	for current != nil {
		values = append(values, fmt.Sprintf("%v", current.Value))
		current = current.Next
	}
	return fmt.Sprintf("[%s]", strings.Join(values, " → "))
}

func main() {
	fmt.Println("=== Linked List with Tail Pointer ===")
	fmt.Println()

	list := &LinkedListWithTail[int]{}

	fmt.Println("Adding elements:")
	for _, n := range []int{10, 20, 30, 40, 50} {
		list.Append(n)
		last, _ := list.GetLast()
		fmt.Printf("  Appended %d → Last: %d (O(1))\n", n, last)
	}

	first, _ := list.GetFirst()
	last, _ := list.GetLast()

	fmt.Println()
	fmt.Printf("Final list: %s\n", list.String())
	fmt.Printf("First element: %d (O(1))\n", first)
	fmt.Printf("Last element: %d (O(1))\n", last)
	fmt.Printf("Size: %d\n", list.Size())
}

