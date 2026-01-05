# Blazing Fast Lookup with Hash Tables

Hash tables are introduced as a way to achieve near-instant lookups, inserts, and deletions, leveraging hash functions to map keys to specific memory slots.

---

## Hash Tables

A hash table is essentially an array paired with a *hash function*. The hash function takes in a key (often a string) and converts it into an index where the corresponding value will be stored.

Unlike arrays (which rely on numeric indices), hash tables allow us to use *keys* (like words, usernames, or IDs) for direct access.

---

## Hashing with Hash Functions

The **hash function** determines the index for storing or retrieving a value. A good hash function spreads values evenly across the available slots.

Example:

- Key `"cat"` → hash function → index `5`
- Key `"dog"` → hash function → index `12`

This way, you don’t need to search through the entire array — just compute the index directly.

---

## Lookup Efficiency

Looking up a key in a hash table is a **constant time O(1)** operation *in the average case*.

- Compute hash of the key.
- Jump straight to the index.
- Retrieve the value.

No need for linear search as in arrays or sets.

---

## Dealing with Collisions

Collisions occur when two keys hash to the same index.

### Common strategies

1. **Chaining**
   Each index holds a linked list of entries. If multiple keys collide, they’re chained together at that index.

2. **Open addressing**
   If a collision happens, probe forward in the array until an empty slot is found.

Both strategies keep lookup efficient, but poor hash functions or too many collisions can degrade performance.

---

## Insert and Delete

- **Insert**: Compute hash → place value at computed index. **O(1)** average case.
- **Delete**: Find slot via hash → remove entry. **O(1)** average case.

Collisions can make these slightly slower, but with a well-designed table and low load factor, performance stays near constant.

---

## Load Factor & Resizing

The **load factor** is the ratio of entries to array slots.

- Higher load factor → more collisions → slower performance.
- When load factor exceeds a threshold (often 0.7), the table is resized (usually doubled in size), and all entries are rehashed into the new table.

Resizing is expensive (**O(N)**), but it happens rarely enough that average insert time is still considered **O(1)**.

---

## Practical Uses

- Dictionaries / maps (word → definition).
- Caches (user ID → profile data).
- Deduplication (tracking if something has been seen before).

Hash tables underpin many high-level language structures like Python dictionaries, JavaScript objects, and Java HashMaps.

---

## Takeaway

Hash tables give us the ability to perform **lookups, inserts, and deletions in O(1)** average case, making them one of the most powerful data structures. Their efficiency relies on a good hash function, low load factor, and effective collision handling.
