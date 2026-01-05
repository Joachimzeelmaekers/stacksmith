# Chapter 14 – Linked Lists

## Context and Goals

Linked lists provide dynamic, flexible memory structures where elements are linked by pointers instead of being stored contiguously in memory. They trade off **fast random access** for **efficient insertions and deletions**. This chapter focuses on understanding how linked lists operate, when to use them, and how they differ from arrays in both performance and design.

---

## Core Concepts and Reasoning

### 1. Structure

Each node in a linked list holds:

* **Value** – The stored data
* **Pointer (Next)** – A reference to the next node

A linked list’s power lies in **dynamic memory allocation** — nodes are created as needed, not pre-allocated.

Types of linked lists:

* **Singly Linked List** – Nodes point only to the next element.
* **Doubly Linked List** – Each node has references to both next and previous nodes.
* **Circular Linked List** – The last node points back to the head.

### 2. Performance Trade-offs

| Operation               | Array | Linked List            |
| ----------------------- | ----- | ---------------------- |
| Read by Index           | O(1)  | O(N)                   |
| Insert/Delete at Head   | O(N)  | O(1)                   |
| Insert/Delete at Middle | O(N)  | O(N)                   |
| Append at Tail          | O(1)* | O(1) with tail pointer |

(*Average case if there’s preallocated capacity)

Linked lists shine when frequent insertions or deletions occur but random access is rare.

---

## Examples

### Example 1: Singly Linked List

#### TypeScript

```typescript
class Node {
  constructor(public value: number, public next: Node | null = null) {}
}

class LinkedList {
  head: Node | null = null;

  prepend(value: number): void {
    this.head = new Node(value, this.head);
  }

  find(value: number): Node | null {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  delete(value: number): void {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (current.next) current.next = current.next.next;
  }
}
```

#### Go

```go
type Node struct {
  Value int
  Next  *Node
}

type LinkedList struct {
  Head *Node
}

func (l *LinkedList) Prepend(v int) {
  l.Head = &Node{Value: v, Next: l.Head}
}

func (l *LinkedList) Find(v int) *Node {
  for n := l.Head; n != nil; n = n.Next {
    if n.Value == v {
      return n
    }
  }
  return nil
}

func (l *LinkedList) Delete(v int) {
  if l.Head == nil {
    return
  }
  if l.Head.Value == v {
    l.Head = l.Head.Next
    return
  }
  for n := l.Head; n.Next != nil; n = n.Next {
    if n.Next.Value == v {
      n.Next = n.Next.Next
      return
    }
  }
}
```

### Example 2: Reversing a Linked List

Reversing requires reassigning the `next` pointers one by one.

#### TypeScript

```typescript
function reverse(head: Node | null): Node | null {
  let prev: Node | null = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}
```

#### Go

```go
func Reverse(head *Node) *Node {
  var prev *Node
  curr := head
  for curr != nil {
    next := curr.Next
    curr.Next = prev
    prev = curr
    curr = next
  }
  return prev
}
```

---

## Performance and Design Insights

* Linked lists use **O(N)** space for nodes, plus pointer overhead.
* Insertions and deletions are **O(1)** if the node is known, but **O(N)** if you must search first.
* Cache locality is poor compared to arrays since nodes are scattered in memory.
* Doubly linked lists enable backward traversal but require extra space.

### When to Use

* When frequent insertions/deletions are required.
* When data size fluctuates dynamically.
* Avoid when random access or tight memory locality is critical.

---

## Key Takeaways

* Linked lists prioritize flexibility over direct indexing.
* Head/tail operations are efficient; searching is not.
* Understanding pointer manipulation is essential to avoid memory leaks or broken links.
* Use built-in list abstractions when available to minimize implementation risk.
