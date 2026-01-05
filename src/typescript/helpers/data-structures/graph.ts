export class Graph<T> {
  private neighborsByVertex = new Map<T, T[]>();

  addVertex(vertex: T): void {
    if (!this.neighborsByVertex.has(vertex)) {
      this.neighborsByVertex.set(vertex, []);
    }
  }

  addEdge(a: T, b: T): void {
    this.addVertex(a);
    this.addVertex(b);
    this.neighborsByVertex.get(a)!.push(b);
    this.neighborsByVertex.get(b)!.push(a);
  }

  bfs(start: T): T[] {
    if (!this.neighborsByVertex.has(start)) return [];

    const visited = new Set<T>([start]);
    const order: T[] = [];

    const queue: T[] = [start];
    let headIndex = 0;

    while (headIndex < queue.length) {
      const current = queue[headIndex++];
      order.push(current);

      for (const neighbor of this.neighbors(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return order;
  }

  dfsIterative(start: T): T[] {
    if (!this.neighborsByVertex.has(start)) return [];

    const visited = new Set<T>();
    const order: T[] = [];
    const stack: T[] = [start];

    while (stack.length > 0) {
      const current = stack.pop()!;

      if (visited.has(current)) continue;
      visited.add(current);
      order.push(current);

      for (const neighbor of this.neighbors(current)) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }

    return order;
  }

  dfsRecursive(start: T): T[] {
    if (!this.neighborsByVertex.has(start)) return [];

    const visited = new Set<T>();
    const order: T[] = [];

    const visit = (current: T): void => {
      visited.add(current);
      order.push(current);

      for (const neighbor of this.neighbors(current)) {
        if (!visited.has(neighbor)) {
          visit(neighbor);
        }
      }
    };

    visit(start);
    return order;
  }

  hasPath(start: T, end: T): boolean {
    return this.findPath(start, end) !== null;
  }

  /**
   * Finds a path using BFS.
   * In an unweighted graph, BFS also gives the shortest path (fewest edges).
   */
  findPath(start: T, end: T): T[] | null {
    return this.shortestPath(start, end);
  }

  /**
   * Shortest path in an unweighted graph (BFS).
   */
  shortestPath(start: T, end: T): T[] | null {
    if (start === end)
      return this.neighborsByVertex.has(start) ? [start] : null;
    if (!this.neighborsByVertex.has(start) || !this.neighborsByVertex.has(end))
      return null;

    const visited = new Set<T>([start]);
    const parentByVertex = new Map<T, T>();

    const queue: T[] = [start];
    let headIndex = 0;

    while (headIndex < queue.length) {
      const current = queue[headIndex++];

      for (const neighbor of this.neighbors(current)) {
        if (visited.has(neighbor)) continue;

        visited.add(neighbor);
        parentByVertex.set(neighbor, current);

        if (neighbor === end) {
          return this.reconstructPath(parentByVertex, start, end);
        }

        queue.push(neighbor);
      }
    }

    return null;
  }

  private neighbors(vertex: T): T[] {
    return this.neighborsByVertex.get(vertex) ?? [];
  }

  private reconstructPath(parentByVertex: Map<T, T>, start: T, end: T): T[] {
    const path: T[] = [end];
    let current = end;

    while (current !== start) {
      const parent = parentByVertex.get(current);
      if (parent === undefined) return null as any; // should not happen if used correctly
      current = parent;
      path.unshift(current);
    }

    return path;
  }
}
