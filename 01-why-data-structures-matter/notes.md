# Why Data Structures Matter

The first chapter of the book where both the array and the set will be discussed.

## Data Structures

Very basic explanation on how data is organized and how every data structure almost always gets broken down into a bunch of numbers and strings.

## The Array: The Foundational Data Structure

In this chapter we covered the 4 basic operations:

1. **Read**: Reading refers to looking something up at a particular spot within the data structure. For the array structure this means that we will be reading a specific index in that array.

2. **Search**: Searching refers to looking for a specific value within the data structure. We don't know if it's in the data structure, and we also don't know at which index this might be.

3. **Insert**: Inserting refers to adding a new value to our data structure.

4. **Delete**: Deleting refers to removing an item from our data structure.

## Measuring Speed

When we talk about measuring speed, we don't want to use time as a metric of measuring speed, as this fluctuates based on the system that you run the operations on. Instead of using time, we want to count the number of computational steps an operation takes.

### Simple representation of a computer's memory

Computer memory can be seen as a large collection of cells. Every cell has a numeric value assigned to it eg:

|      |      |      |      |      |
| ---- | ---- | ---- | ---- | ---- |
| 1000 | 1001 | 1002 | 1003 | 1004 |
| 1005 | 1006 | 1007 | 1008 | 1009 |
| 1010 | 1011 | 1012 | 1013 | 1014 |

When we for example have an array of length 3, we can assign each element of the array to a cell.

eg: ["cats", "dogs", "horses"]

"cats" will have memory cell 1000, "dogs" will have memory cell 1001 and "horses" will have memory cell 1002.

The computer memory has no notion of the value assigned to the memory cell. In the case of an array, it also makes a note where the array begins. This is important to know when we go into each operation.

### Reading

When we want to read the 2nd index of the array `["cats", "dogs", "horses"]` the computer will take the following thought process:

1. Go to the beginning of the array with memory address 1000.
2. Index 2 will be exactly 2 slots past index 0.
3. By logical extension, index 2 would be located at memory address 1002 (1000 + 2).

I split the thought process up into multiple parts, but the computer can do this in 1 go, which means that it only takes 1 computational step to read an exact index from an array.

### Searching (Linear)

With searching, we will have a maximum of N steps to find an element in an array. Let's clarify this with an example.

`["cats", "dogs", "horses"]`

When we want to search for "horses", the computer will start at the beginning of the array, and verify if that value is "horses".

As you can see, it can take the same number of steps as the size of the array to find the element that we're looking for. That's we say N steps because N can be any number.

### Insertion

When inserting into an array, the key is where the element needs to be inserted at. If we want to add an element at the end of an array, this is 1 step, however 1 caveat is that this increases the size of the array, so some reallocations might need to happen.

When we insert an item in the middle of an array, we need to shift every item that comes after the location where we want to insert into, 1 place to make room for that new item.

When we insert the item at the start of the array, we have to shift every element by 1 place to make room for the new element.

So this means we can say that it can take N+1 steps for an insertion into an array.

### Deletion

When we delete an item, we end up with an empty slot in an array. Technically the deletion at a certain index only takes 1 step, yet because we need to shift all the elements to the left, this takes up additional steps.

If we take this into account, it means that we can say that the maximum number of steps it can take to delete an item is N steps.

## Sets: How a single rule can affect efficiency

A set is an array where no duplicates are allowed. This means that although we get a way to validate duplications, the operations can take way more steps than a normal array.

### Reading

Exactly the same as an array.

### Searching

Also the same as an array: N steps.

### Insertion

Here is where the difference is made. The insertion always requires a search first, before we can insert a new element because we need to make sure that the new element does not exist yet.

That means that we have 2N + 1 steps for the insertion

### Deletion

Saml as the array: N step.
