# Crafting Elegant Code with Stacks and Queues

Stacks and queues are constrained versions of arrays. By enforcing rules on how data can be added and removed, they become elegant tools for handling **temporary data** in well-structured ways. They are especially useful when the order of processing matters.

---

## Stacks (LIFO)

A **stack** follows the **Last In, First Out (LIFO)** principle.

- Only the **last element** (the “top”) can be read.
- Data can be inserted only at the end (push).
- Data can be removed only from the end (pop).

Think of a stack of dishes: you add and remove from the top only.

### Operations

1. **Push**: Add element to the top → **O(1)**
2. **Pop**: Remove element from the top → **O(1)**
3. **Peek/Read**: Return top element without removing → **O(1)**

### Use Cases

- Undo/redo in applications.
- Backtracking (e.g., navigating browser history).
- Function call stacks in programming languages.

---

## Queues (FIFO)

A **queue** follows the **First In, First Out (FIFO)** principle.

- Insert at the **back** (enqueue).
- Remove from the **front** (dequeue).
- Always process elements in the order they were added.

Think of people standing in line: the first person in is served first.

### Operations

1. **Enqueue**: Add element at the back → **O(1)**
2. **Dequeue**: Remove element from the front → **O(1)** (with linked list)
3. **Peek/Read**: Look at the element at the front → **O(1)**

### Use Cases

- Print job scheduling.
- Task queues in operating systems.
- Handling asynchronous requests (e.g., incoming network packets).

---

## Abstract Data Types

Stacks and queues are often described as **abstract data types** because they define *what operations* can be done without specifying *how* they’re implemented.

- Can be implemented with arrays or linked lists.
- Efficiency depends on the underlying structure, but the abstract model remains the same.

---

## Wrapping Up

Stacks and queues handle **temporary, ordered data** elegantly.

- Stacks enforce **LIFO**, making them useful for backtracking and nested tasks.
- Queues enforce **FIFO**, ideal for scheduling and ordered processing.

They may seem restrictive compared to arrays, but these constraints provide clarity and efficiency in solving real-world problems.
