package datastructures

import (
	"fmt"
	"strings"
)

type MaxHeap struct {
	values []int
}

func (heap *MaxHeap) Insert(value int) {
	heap.values = append(heap.values, value)
	heap.heapifyUp(len(heap.values) - 1)
}

func (heap *MaxHeap) Peek() (int, bool) {
	if len(heap.values) == 0 {
		return 0, false
	}

	return heap.values[0], true
}

func (heap *MaxHeap) ExtractMax() (int, bool) {
	if len(heap.values) == 0 {
		return 0, false
	}

	if len(heap.values) == 1 {
		maxValue := heap.values[0]
		heap.values = heap.values[:0]
		return maxValue, true
	}

	maxValue := heap.values[0]
	lastIndex := len(heap.values) - 1

	heap.values[0] = heap.values[lastIndex]
	heap.values = heap.values[:lastIndex]

	heap.heapifyDown(0)

	return maxValue, true
}

func (heap *MaxHeap) Size() int {
	return len(heap.values)
}

func (heap *MaxHeap) IsEmpty() bool {
	return len(heap.values) == 0
}

func (heap *MaxHeap) String() string {
	parts := make([]string, len(heap.values))

	for index, value := range heap.values {
		parts[index] = fmt.Sprintf("%d", value)
	}

	return "[" + strings.Join(parts, ", ") + "]"
}

func (heap *MaxHeap) heapifyUp(startIndex int) {
	currentIndex := startIndex

	for currentIndex > 0 {
		parentIndex := heap.parentIndex(currentIndex)

		if heap.values[currentIndex] <= heap.values[parentIndex] {
			break
		}

		heap.swap(currentIndex, parentIndex)
		currentIndex = parentIndex
	}
}

func (heap *MaxHeap) heapifyDown(startIndex int) {
	currentIndex := startIndex
	length := len(heap.values)

	for {
		leftChildIndex := heap.leftChildIndex(currentIndex)
		rightChildIndex := heap.rightChildIndex(currentIndex)

		largestIndex := currentIndex

		if leftChildIndex < length {
			if heap.values[leftChildIndex] > heap.values[largestIndex] {
				largestIndex = leftChildIndex
			}
		}

		if rightChildIndex < length {
			if heap.values[rightChildIndex] > heap.values[largestIndex] {
				largestIndex = rightChildIndex
			}
		}

		if largestIndex == currentIndex {
			break
		}

		heap.swap(currentIndex, largestIndex)
		currentIndex = largestIndex
	}
}

func (heap *MaxHeap) parentIndex(childIndex int) int {
	return (childIndex - 1) / 2
}

func (heap *MaxHeap) leftChildIndex(parentIndex int) int {
	return 2*parentIndex + 1
}

func (heap *MaxHeap) rightChildIndex(parentIndex int) int {
	return 2*parentIndex + 2
}

func (heap *MaxHeap) swap(firstIndex int, secondIndex int) {
	heap.values[firstIndex], heap.values[secondIndex] = heap.values[secondIndex], heap.values[firstIndex]
}
