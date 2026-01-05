package datastructures

type Graph struct {
	adjacencyList map[string][]string
}

func NewGraph() *Graph {
	return &Graph{
		adjacencyList: make(map[string][]string),
	}
}

func (graph *Graph) AddVertex(vertex string) {
	_, exists := graph.adjacencyList[vertex]
	if !exists {
		graph.adjacencyList[vertex] = []string{}
	}
}

func (graph *Graph) AddEdge(firstVertex string, secondVertex string) {
	graph.AddVertex(firstVertex)
	graph.AddVertex(secondVertex)

	graph.adjacencyList[firstVertex] = append(graph.adjacencyList[firstVertex], secondVertex)
	graph.adjacencyList[secondVertex] = append(graph.adjacencyList[secondVertex], firstVertex)
}

func (graph *Graph) BFS(startVertex string) []string {
	_, exists := graph.adjacencyList[startVertex]
	if !exists {
		return []string{}
	}

	visited := make(map[string]bool)
	result := make([]string, 0)

	queue := make([]string, 0)
	queue = append(queue, startVertex)
	visited[startVertex] = true

	queueIndex := 0
	for queueIndex < len(queue) {
		currentVertex := queue[queueIndex]
		queueIndex++

		result = append(result, currentVertex)

		for _, neighbor := range graph.adjacencyList[currentVertex] {
			if !visited[neighbor] {
				visited[neighbor] = true
				queue = append(queue, neighbor)
			}
		}
	}

	return result
}

func (graph *Graph) DFSIterative(startVertex string) []string {
	_, exists := graph.adjacencyList[startVertex]
	if !exists {
		return []string{}
	}

	visited := make(map[string]bool)
	result := make([]string, 0)

	stack := make([]string, 0)
	stack = append(stack, startVertex)

	for len(stack) > 0 {
		lastIndex := len(stack) - 1
		currentVertex := stack[lastIndex]
		stack = stack[:lastIndex]

		if visited[currentVertex] {
			continue
		}

		visited[currentVertex] = true
		result = append(result, currentVertex)

		for _, neighbor := range graph.adjacencyList[currentVertex] {
			if !visited[neighbor] {
				stack = append(stack, neighbor)
			}
		}
	}

	return result
}

func (graph *Graph) DFSRecursive(startVertex string) []string {
	_, exists := graph.adjacencyList[startVertex]
	if !exists {
		return []string{}
	}

	visited := make(map[string]bool)
	result := make([]string, 0)

	graph.dfsRecursive(startVertex, visited, &result)

	return result
}

func (graph *Graph) dfsRecursive(
	currentVertex string,
	visited map[string]bool,
	result *[]string,
) {
	visited[currentVertex] = true
	*result = append(*result, currentVertex)

	for _, neighbor := range graph.adjacencyList[currentVertex] {
		if !visited[neighbor] {
			graph.dfsRecursive(neighbor, visited, result)
		}
	}
}

func (graph *Graph) HasPath(startVertex string, endVertex string) bool {
	if startVertex == endVertex {
		return true
	}

	_, startExists := graph.adjacencyList[startVertex]
	_, endExists := graph.adjacencyList[endVertex]
	if !startExists || !endExists {
		return false
	}

	visited := make(map[string]bool)
	queue := make([]string, 0)
	queue = append(queue, startVertex)
	visited[startVertex] = true

	queueIndex := 0
	for queueIndex < len(queue) {
		currentVertex := queue[queueIndex]
		queueIndex++

		for _, neighbor := range graph.adjacencyList[currentVertex] {
			if neighbor == endVertex {
				return true
			}

			if !visited[neighbor] {
				visited[neighbor] = true
				queue = append(queue, neighbor)
			}
		}
	}

	return false
}

func (graph *Graph) FindPath(startVertex string, endVertex string) []string {
	// Returns any path (not necessarily shortest). Implemented with BFS.
	// For shortest path use ShortestPath.
	if startVertex == endVertex {
		return []string{startVertex}
	}

	_, startExists := graph.adjacencyList[startVertex]
	_, endExists := graph.adjacencyList[endVertex]
	if !startExists || !endExists {
		return nil
	}

	visited := make(map[string]bool)
	parent := make(map[string]string)

	queue := make([]string, 0)
	queue = append(queue, startVertex)
	visited[startVertex] = true

	queueIndex := 0
	for queueIndex < len(queue) {
		currentVertex := queue[queueIndex]
		queueIndex++

		for _, neighbor := range graph.adjacencyList[currentVertex] {
			if visited[neighbor] {
				continue
			}

			visited[neighbor] = true
			parent[neighbor] = currentVertex

			if neighbor == endVertex {
				return reconstructPath(parent, startVertex, endVertex)
			}

			queue = append(queue, neighbor)
		}
	}

	return nil
}

func (graph *Graph) ShortestPath(startVertex string, endVertex string) []string {
	// BFS on an unweighted graph yields the shortest path in number of edges.
	if startVertex == endVertex {
		return []string{startVertex}
	}

	_, startExists := graph.adjacencyList[startVertex]
	_, endExists := graph.adjacencyList[endVertex]
	if !startExists || !endExists {
		return nil
	}

	visited := make(map[string]bool)
	parent := make(map[string]string)

	queue := make([]string, 0)
	queue = append(queue, startVertex)
	visited[startVertex] = true

	queueIndex := 0
	for queueIndex < len(queue) {
		currentVertex := queue[queueIndex]
		queueIndex++

		for _, neighbor := range graph.adjacencyList[currentVertex] {
			if visited[neighbor] {
				continue
			}

			visited[neighbor] = true
			parent[neighbor] = currentVertex

			if neighbor == endVertex {
				return reconstructPath(parent, startVertex, endVertex)
			}

			queue = append(queue, neighbor)
		}
	}

	return nil
}

func reconstructPath(parent map[string]string, startVertex string, endVertex string) []string {
	path := make([]string, 0)

	currentVertex := endVertex
	path = append(path, currentVertex)

	for currentVertex != startVertex {
		nextVertex, exists := parent[currentVertex]
		if !exists {
			return nil
		}

		currentVertex = nextVertex
		path = append(path, currentVertex)
	}

	reverseStringsInPlace(path)
	return path
}

func reverseStringsInPlace(values []string) {
	leftIndex := 0
	rightIndex := len(values) - 1

	for leftIndex < rightIndex {
		values[leftIndex], values[rightIndex] = values[rightIndex], values[leftIndex]
		leftIndex++
		rightIndex--
	}
}
