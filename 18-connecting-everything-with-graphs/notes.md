# Chapter 18 – Connecting Everything with Graphs

## Context and Goals

Graphs represent relationships between entities. They are versatile structures used in social networks, routing, dependency resolution, and more. This chapter explains how to represent, traverse, and analyze graphs efficiently using both breadth-first and depth-first approaches.

---

## Core Concepts and Reasoning

### 1. Structure

A **graph** consists of:

* **Vertices (nodes)** – Represent entities.
* **Edges** – Represent connections between nodes.

Graphs can be:

* **Directed** (edges have direction) or **undirected**.
* **Weighted** (edges have costs) or **unweighted**.
* **Dense** (many edges) or **sparse** (few edges).

Common representations:

* **Adjacency list** (efficient for sparse graphs).
* **Adjacency matrix** (efficient for dense graphs).

### 2. Traversal Techniques

Two fundamental graph traversal algorithms form the foundation for many others:

* **Breadth-First Search (BFS):** Explores neighbors level by level.
* **Depth-First Search (DFS):** Explores as far as possible along one path before backtracking.

---

## Examples

### Example 1: BFS (Shortest Path in Unweighted Graph)

#### TypeScript

```typescript
function bfs(start: number, graph: number[][]): number[] {
  const visited = new Set<number>();
  const queue: number[] = [start];
  const order: number[] = [];
  visited.add(start);

  while (queue.length > 0) {
    const vertex = queue.shift()!;
    order.push(vertex);

    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}
```

#### Go

```go
func BFS(start int, graph map[int][]int) []int {
  visited := make(map[int]bool)
  queue := []int{start}
  order := []int{}
  visited[start] = true

  for len(queue) > 0 {
    v := queue[0]
    queue = queue[1:]
    order = append(order, v)
    for _, n := range graph[v] {
      if !visited[n] {
        visited[n] = true
        queue = append(queue, n)
      }
    }
  }
  return order
}
```

### Example 2: DFS (Exploring Connected Components)

#### TypeScript

```typescript
function dfs(node: number, graph: number[][], visited = new Set<number>()): number[] {
  visited.add(node);
  const result = [node];
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(neighbor, graph, visited));
    }
  }
  return result;
}
```

#### Go

```go
func DFS(node int, graph map[int][]int, visited map[int]bool, result *[]int) {
  visited[node] = true
  *result = append(*result, node)
  for _, n := range graph[node] {
    if !visited[n] {
      DFS(n, graph, visited, result)
    }
  }
}
```

---

### Example 3: Weighted Graphs and Dijkstra’s Algorithm

When edges have weights (costs), BFS alone is insufficient. **Dijkstra’s algorithm** finds the shortest path in a weighted graph with non-negative weights.

#### TypeScript

```typescript
interface Edge { to: string; weight: number; }
interface Graph { [key: string]: Edge[]; }

function dijkstra(graph: Graph, start: string): Record<string, number> {
  const distances: Record<string, number> = {};
  const visited = new Set<string>();
  for (const v in graph) distances[v] = Infinity;
  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    const current = Object.keys(distances)
      .filter(v => !visited.has(v))
      .reduce((a, b) => distances[a] < distances[b] ? a : b);

    visited.add(current);
    for (const edge of graph[current]) {
      const newDist = distances[current] + edge.weight;
      if (newDist < distances[edge.to]) distances[edge.to] = newDist;
    }
  }
  return distances;
}
```

#### Go

```go
type Edge struct {
  To     string
  Weight int
}

type Graph map[string][]Edge

func Dijkstra(g Graph, start string) map[string]int {
  dist := map[string]int{}
  visited := map[string]bool{}
  for v := range g {
    dist[v] = int(^uint(0) >> 1) // Infinity
  }
  dist[start] = 0

  for len(visited) < len(g) {
    var current string
    minDist := int(^uint(0) >> 1)
    for v, d := range dist {
      if !visited[v] && d < minDist {
        minDist = d
        current = v
      }
    }

    visited[current] = true
    for _, e := range g[current] {
      newDist := dist[current] + e.Weight
      if newDist < dist[e.To] {
        dist[e.To] = newDist
      }
    }
  }
  return dist
}
```

---

## Performance and Design Insights

* **BFS** runs in O(V + E) and guarantees the shortest path in unweighted graphs.
* **DFS** also runs in O(V + E) but explores depth-first, ideal for cycle detection and component discovery.
* **Dijkstra’s Algorithm** runs in O((V + E) log V) with a priority queue.
* Choose adjacency lists for sparse graphs and adjacency matrices for dense ones.
* Graph algorithms often generalize to trees (a special case of graphs without cycles).

### When to Use

* BFS → Shortest unweighted paths, level order traversal.
* DFS → Path existence, cycle detection, component analysis.
* Dijkstra → Weighted shortest paths.

---

## Key Takeaways

* Graphs unify relationships and connectivity across domains.
* BFS and DFS form the building blocks for advanced algorithms.
* Weighted graphs introduce optimization problems like shortest path and minimum spanning tree.
* Understanding traversal patterns leads to scalable, efficient graph-based systems.
