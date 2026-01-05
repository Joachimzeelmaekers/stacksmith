export class MaxHeap {
  private heap: number[] = [];

  insert(value: number): void {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  extractMax(): number | undefined {
    if (this.heap.length === 0) {
      return undefined;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const maxValue = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.siftDown(0);
    return maxValue;
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  getData(): number[] {
    return [...this.heap];
  }

  private siftUp(childIndex: number): void {
    while (childIndex > 0) {
      const parentIndex = Math.floor((childIndex - 1) / 2);

      if (this.heap[childIndex] <= this.heap[parentIndex]) break;

      [this.heap[childIndex], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[childIndex],
      ];

      childIndex = parentIndex;
    }
  }

  private siftDown(parentIndex: number): void {
    while (true) {
      const leftChildIndex = 2 * parentIndex + 1;
      const rightChildIndex = 2 * parentIndex + 2;

      let largestIndex = parentIndex;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] > this.heap[largestIndex]
      ) {
        largestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] > this.heap[largestIndex]
      ) {
        largestIndex = rightChildIndex;
      }

      if (largestIndex === parentIndex) {
        break;
      }

      [this.heap[parentIndex], this.heap[largestIndex]] = [
        this.heap[largestIndex],
        this.heap[parentIndex],
      ];

      parentIndex = largestIndex;
    }
  }
}
