package datastructures

import (
	"fmt"
	"strings"
)

type ListNode[T comparable] struct {
	Value T
	Next  *ListNode[T]
}

type LinkedList[T comparable] struct {
	Head *ListNode[T]
}

func (list *LinkedList[T]) Append(value T) {
	newNode := &ListNode[T]{Value: value}

	if list.Head == nil {
		list.Head = newNode
		return
	}

	currentNode := list.Head
	for currentNode.Next != nil {
		currentNode = currentNode.Next
	}

	currentNode.Next = newNode
}

func (list *LinkedList[T]) Delete(value T) bool {
	if list.Head == nil {
		return false
	}

	if list.Head.Value == value {
		list.Head = list.Head.Next
		return true
	}

	currentNode := list.Head
	for currentNode.Next != nil {
		if currentNode.Next.Value == value {
			currentNode.Next = currentNode.Next.Next
			return true
		}

		currentNode = currentNode.Next
	}

	return false
}

func (list *LinkedList[T]) Reverse() {
	var previousNode *ListNode[T]
	currentNode := list.Head

	for currentNode != nil {
		nextNode := currentNode.Next
		currentNode.Next = previousNode
		previousNode = currentNode
		currentNode = nextNode
	}

	list.Head = previousNode
}

func (list *LinkedList[T]) String() string {
	values := make([]string, 0)

	currentNode := list.Head
	for currentNode != nil {
		values = append(values, fmt.Sprintf("%v", currentNode.Value))
		currentNode = currentNode.Next
	}

	return fmt.Sprintf("[%s]", strings.Join(values, " → "))
}

func (list *LinkedList[T]) PrintAll() {
	fmt.Printf("  %s\n", list.String())
}
