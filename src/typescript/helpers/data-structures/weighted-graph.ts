import { PriorityQueue } from "./priority-queue";

export class WeightedGraph {
  private adjacencyList = new Map<string, { node: string; weight: number }[]>();

  addVertex(vertex: string): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(v1: string, v2: string, weight: number): void {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjacencyList.get(v1)!.push({ node: v2, weight });
    this.adjacencyList.get(v2)!.push({ node: v1, weight });
  }

  dijkstra(
    start: string,
    end: string
  ): { path: string[]; distance: number } | null {
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const pq = new PriorityQueue<string>();

    for (const vertex of this.adjacencyList.keys()) {
      distances.set(vertex, vertex === start ? 0 : Infinity);
      previous.set(vertex, null);
    }

    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
      const current = pq.dequeue()!;

      if (current === end) {
        const path: string[] = [];
        let node: string | null = end;
        while (node) {
          path.unshift(node);
          node = previous.get(node) ?? null;
        }
        return { path, distance: distances.get(end)! };
      }

      for (const neighbor of this.adjacencyList.get(current) || []) {
        const distance = distances.get(current)! + neighbor.weight;

        if (distance < distances.get(neighbor.node)!) {
          distances.set(neighbor.node, distance);
          previous.set(neighbor.node, current);
          pq.enqueue(neighbor.node, distance);
        }
      }
    }

    return null;
  }
}
