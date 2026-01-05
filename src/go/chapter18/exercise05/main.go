package main

import (
	"container/heap"
	"fmt"
	"math"
	"strings"
)

type Edge struct {
	To     string
	Weight int
}

type WeightedGraph struct {
	adjacencyList map[string][]Edge
}

func NewWeightedGraph() *WeightedGraph {
	return &WeightedGraph{
		adjacencyList: make(map[string][]Edge),
	}
}

func (graph *WeightedGraph) AddVertex(vertex string) {
	_, exists := graph.adjacencyList[vertex]
	if !exists {
		graph.adjacencyList[vertex] = []Edge{}
	}
}

func (graph *WeightedGraph) AddEdge(firstVertex string, secondVertex string, weight int) {
	graph.AddVertex(firstVertex)
	graph.AddVertex(secondVertex)

	graph.adjacencyList[firstVertex] = append(
		graph.adjacencyList[firstVertex],
		Edge{To: secondVertex, Weight: weight},
	)

	graph.adjacencyList[secondVertex] = append(
		graph.adjacencyList[secondVertex],
		Edge{To: firstVertex, Weight: weight},
	)
}

type dijkstraQueueItem struct {
	vertex   string
	priority int
	index    int
}

type dijkstraPriorityQueue []*dijkstraQueueItem

func (queue dijkstraPriorityQueue) Len() int {
	return len(queue)
}

func (queue dijkstraPriorityQueue) Less(firstIndex int, secondIndex int) bool {
	return queue[firstIndex].priority < queue[secondIndex].priority
}

func (queue dijkstraPriorityQueue) Swap(firstIndex int, secondIndex int) {
	queue[firstIndex], queue[secondIndex] = queue[secondIndex], queue[firstIndex]
	queue[firstIndex].index = firstIndex
	queue[secondIndex].index = secondIndex
}

func (queue *dijkstraPriorityQueue) Push(value any) {
	item := value.(*dijkstraQueueItem)
	item.index = len(*queue)
	*queue = append(*queue, item)
}

func (queue *dijkstraPriorityQueue) Pop() any {
	previousQueue := *queue
	lastIndex := len(previousQueue) - 1

	item := previousQueue[lastIndex]
	previousQueue[lastIndex] = nil
	item.index = -1

	*queue = previousQueue[:lastIndex]
	return item
}

type DijkstraResult struct {
	Path     []string
	Distance int
}

func (graph *WeightedGraph) DijkstraShortestPath(startVertex string, endVertex string) *DijkstraResult {
	_, startExists := graph.adjacencyList[startVertex]
	_, endExists := graph.adjacencyList[endVertex]

	if !startExists || !endExists {
		return nil
	}

	distances := make(map[string]int, len(graph.adjacencyList))
	previous := make(map[string]string, len(graph.adjacencyList))

	for vertex := range graph.adjacencyList {
		if vertex == startVertex {
			distances[vertex] = 0
		} else {
			distances[vertex] = math.MaxInt32
		}
	}

	priorityQueue := &dijkstraPriorityQueue{}
	heap.Init(priorityQueue)
	heap.Push(priorityQueue, &dijkstraQueueItem{
		vertex:   startVertex,
		priority: 0,
	})

	for priorityQueue.Len() > 0 {
		queueItem := heap.Pop(priorityQueue).(*dijkstraQueueItem)
		currentVertex := queueItem.vertex

		if currentVertex == endVertex {
			path := reconstructPath(previous, startVertex, endVertex)
			return &DijkstraResult{
				Path:     path,
				Distance: distances[endVertex],
			}
		}

		currentDistance := distances[currentVertex]
		if currentDistance == math.MaxInt32 {
			continue
		}

		for _, edge := range graph.adjacencyList[currentVertex] {
			nextVertex := edge.To
			candidateDistance := currentDistance + edge.Weight

			if candidateDistance < distances[nextVertex] {
				distances[nextVertex] = candidateDistance
				previous[nextVertex] = currentVertex

				heap.Push(priorityQueue, &dijkstraQueueItem{
					vertex:   nextVertex,
					priority: candidateDistance,
				})
			}
		}
	}

	return nil
}

func reconstructPath(previous map[string]string, startVertex string, endVertex string) []string {
	reversedPath := make([]string, 0)

	currentVertex := endVertex
	for currentVertex != "" {
		reversedPath = append(reversedPath, currentVertex)

		if currentVertex == startVertex {
			break
		}

		nextVertex := previous[currentVertex]
		currentVertex = nextVertex
	}

	reverseStringsInPlace(reversedPath)
	return reversedPath
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

func main() {
	fmt.Println("=== Dijkstra's Algorithm ===")
	fmt.Println()

	graph := NewWeightedGraph()
	graph.AddEdge("A", "B", 4)
	graph.AddEdge("A", "C", 2)
	graph.AddEdge("B", "E", 3)
	graph.AddEdge("C", "D", 2)
	graph.AddEdge("C", "F", 4)
	graph.AddEdge("D", "E", 3)
	graph.AddEdge("D", "F", 1)
	graph.AddEdge("E", "F", 1)

	fmt.Println("Weighted Graph:")
	fmt.Println("    A")
	fmt.Println("   /4\\2")
	fmt.Println("  B   C")
	fmt.Println("  |3  |2\\4")
	fmt.Println("  E-3-D--F")
	fmt.Println("   \\1 |1/")
	fmt.Println("    \\_|/")
	fmt.Println()

	paths := []struct{ start, end string }{
		{"A", "E"},
		{"A", "F"},
		{"B", "F"},
	}

	for _, p := range paths {
		result := graph.DijkstraShortestPath(p.start, p.end)
		if result != nil {
			fmt.Printf("%s → %s: %s (distance: %d)\n", p.start, p.end, strings.Join(result.Path, " → "), result.Distance)
		} else {
			fmt.Printf("%s → %s: No path found\n", p.start, p.end)
		}
	}

	fmt.Println()
	fmt.Println("✓ Dijkstra's: O((V + E) log V) with priority queue")
}
