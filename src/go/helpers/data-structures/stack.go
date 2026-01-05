package datastructures

type Stack[T any] struct {
	Items []T
}

func (stack *Stack[T]) Push(value T) {
	stack.Items = append(stack.Items, value)
}

func (stack *Stack[T]) Pop() (T, bool) {
	var zeroValue T

	if len(stack.Items) == 0 {
		return zeroValue, false
	}

	lastIndex := len(stack.Items) - 1
	value := stack.Items[lastIndex]
	stack.Items = stack.Items[:lastIndex]

	return value, true
}

func (stack *Stack[T]) Peek() (T, bool) {
	var zeroValue T

	if len(stack.Items) == 0 {
		return zeroValue, false
	}

	return stack.Items[len(stack.Items)-1], true
}

func (stack *Stack[T]) IsEmpty() bool {
	return len(stack.Items) == 0
}
