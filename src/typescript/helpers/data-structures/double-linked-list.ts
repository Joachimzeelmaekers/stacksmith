class DoublyListNode<T> {
  value: T;
  next: DoublyListNode<T> | null = null;
  prev: DoublyListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class DoublyLinkedList<T> {
  head: DoublyListNode<T> | null = null;
  tail: DoublyListNode<T> | null = null;

  append(value: T): void {
    const node = new DoublyListNode(value);
    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  printForward(): void {
    const values: T[] = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(`  Forward:  [${values.join(" → ")}]`);
  }

  printReverse(): void {
    const values: T[] = [];
    let current = this.tail;
    while (current) {
      values.push(current.value);
      current = current.prev;
    }
    console.log(`  Reverse:  [${values.join(" → ")}]`);
  }
}
