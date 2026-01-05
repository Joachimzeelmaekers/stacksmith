package main

import (
	"fmt"
	"strings"
)

type DoublyListNode[T any] struct {
	Value T
	Next  *DoublyListNode[T]
	Prev  *DoublyListNode[T]
}

type DoublyLinkedList[T any] struct {
	Head *DoublyListNode[T]
	Tail *DoublyListNode[T]
}

func (l *DoublyLinkedList[T]) Append(value T) {
	node := &DoublyListNode[T]{Value: value}
	if l.Tail == nil {
		l.Head = node
		l.Tail = node
		return
	}
	node.Prev = l.Tail
	l.Tail.Next = node
	l.Tail = node
}

func (l *DoublyLinkedList[T]) PrintForward() {
	var values []string
	current := l.Head
	for current != nil {
		values = append(values, fmt.Sprintf("%v", current.Value))
		current = current.Next
	}
	fmt.Printf("  Forward:  [%s]\n", strings.Join(values, " → "))
}

func (l *DoublyLinkedList[T]) PrintReverse() {
	var values []string
	current := l.Tail
	for current != nil {
		values = append(values, fmt.Sprintf("%v", current.Value))
		current = current.Prev
	}
	fmt.Printf("  Reverse:  [%s]\n", strings.Join(values, " → "))
}

func main() {
	fmt.Println("=== Doubly Linked List - Print in Reverse ===")
	fmt.Println()

	list := &DoublyLinkedList[int]{}
	for _, n := range []int{1, 2, 3, 4, 5} {
		list.Append(n)
	}

	fmt.Println("Doubly linked list:")
	list.PrintForward()
	list.PrintReverse()
}

