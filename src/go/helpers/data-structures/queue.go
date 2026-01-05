package datastructures

type Queue[T any] struct {
	Messages []T
}

func (queue *Queue[T]) Enqueue(message T) {
	queue.Messages = append(queue.Messages, message)
}

func (queue *Queue[T]) IsEmpty() bool {
	return len(queue.Messages) == 0
}

func (queue *Queue[T]) Dequeue() (T, bool) {
	var zero T
	if len(queue.Messages) == 0 {
		return zero, false
	}
	element := queue.Messages[0]
	queue.Messages = queue.Messages[1:]
	return element, true
}

func (queue *Queue[T]) Read() (T, bool) {
	var zero T
	if len(queue.Messages) == 0 {
		return zero, false
	}
	return queue.Messages[0], true
}
