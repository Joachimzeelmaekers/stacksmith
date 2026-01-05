class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  private length = 0;

  append(value: T): void {
    const newNode = new ListNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  delete(value: T): boolean {
    if (this.head === null) {
      return false;
    }

    // deleting head
    if (this.head.value === value) {
      this.head = this.head.next;
      if (this.head === null) {
        this.tail = null;
      }
      this.length--;
      return true;
    }

    let currentNode = this.head;
    while (currentNode.next !== null) {
      if (currentNode.next.value === value) {
        // deleting tail
        if (currentNode.next === this.tail) {
          this.tail = currentNode;
        }

        currentNode.next = currentNode.next.next;
        this.length--;
        return true;
      }

      currentNode = currentNode.next;
    }

    return false;
  }

  reverse(): void {
    let previousNode: ListNode<T> | null = null;
    let currentNode = this.head;

    // after reverse, old head becomes tail
    this.tail = this.head;

    while (currentNode !== null) {
      const nextNode = currentNode.next;
      currentNode.next = previousNode;

      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.head = previousNode;
  }

  getFirst(): T | null {
    return this.head?.value ?? null;
  }

  getLast(): T | null {
    return this.tail?.value ?? null;
  }

  size(): number {
    return this.length;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  toArray(): T[] {
    const values: T[] = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return values;
  }

  toString(): string {
    return `[${this.toArray().join(" → ")}]`;
  }
}
