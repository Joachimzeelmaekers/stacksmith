export class PriorityQueue<T> {
  private items: Array<{ value: T; priority: number }> = [];

  enqueue(value: T, priority: number): void {
    this.items.push({ value, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.value;
  }

  peek(): T | undefined {
    return this.items[0]?.value;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  toString(): string {
    return `[${this.items.map((x) => `${x.value}:${x.priority}`).join(", ")}]`;
  }
}
