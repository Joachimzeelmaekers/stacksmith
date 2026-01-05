# Stacksmith

There’s a common myth in the JavaScript/TypeScript world: _"Computers are fast, and I’m just moving JSON around. Big O notation is for the low-level guys writing databases in C or Go."_

I built this repository to learn Data Structures and Algorithms (DSA), and added every exercise in Go and Typescript.

What I found was that while Go is faster at the raw execution level, a bad algorithm cripples _both_ languages equally. An O(N²) function kills your React app's responsiveness just as effectively as it kills a Go service.

**Stacksmith** is a workbench for learning this by yourself. It contains 20 chapters of exercises, benchmarks, and notes (based on A Common-Sense Guide to Data Structures and Algorithms, Second Edition: Level Up Your Core Programming Skills by Jay Wengrow) that lets you race algorithms against each other. In a way, you get to see the results, before deciding to learn the boring stuff!

## The Evidence

Does it really matter?

When I put **Linear Search** against **Binary Search** (Chapter 2):

- **1 million elements**
- **Linear Search:** 1,000,000 steps
- **Binary Search:** ~20 steps

Whether running in V8 (Node/Chrome) or compiled Go, the _ratio_ of improvement is massive. The algorithm matters more than the language to a certain degree. For many this is obvious, but for some it is not.

There are plenty of reasons to disregard this, and if you wish to do so, this repository is not for you and I don't blame you. But for people who want to learn by doing, without having to dive into the theory first, this is the place to be!

## Quick Start

This repo comes with a CLI to run exercises and benchmarks (to compare "performance" of and in each language) instantly.

```bash
yarn install
yarn start
```

Use the interactive menu to:

1.  **Run Exercises:** Test your solutions against test cases.
2.  **Run Benchmarks:** See the O(N) vs O(log N) difference with your own eyes.
3.  **KB Assistant:** Paste your own code snippets to get Big O analysis.

## The Knowledge Base Assistant

The CLI includes a "KB (knowledge base) Assistant" mode. This is an AI-powered tool (using RAG) that lets you paste a code snippet and get optimization feedback grounded specifically in the concepts and exercises of this repository.

To use it:

1. Create a `.env` file (copy `env.template`) with your LLM API key.
2. Run `yarn start`
3. Select `3) KB Assistant`
4. Paste your code snippet (e.g., a slow function from your actual work project)
5. The assistant will analyze it using the principles from the book (Big O, Space Complexity, etc.)

## A Note on Code Quality

This repository is an educational workbench. The code examples here—especially the ones implementing raw data structures like Linked Lists or Hash Tables in JavaScript—are optimized for **algorithmic clarity**, not production readiness. I am however looking at going over all the code again to clean things up at some point in the future (but we all know what happens with things we leave behind... Tech Debt!)

In a real TypeScript project, you wouldn't implement your own Hash Table. In a real Go project, you probably wouldn't write a Bubble Sort. But for simplicity (and maintenance) sake, we avoid using packages as much as possible.

**Don't copy-paste this code into production.** Use them to understand _why_ the algorithms matter, and apply the learnings to your own code! That's how you learn and grow in life.

A lot of the benchmarking, structure and logging has been written using Cursor. This allowed me to focus on the content without having to think about trivial stuff (eg: how to print out the benchmarks perfectly aligned)

## Project Structure

- **`src/typescript`**: Implementations in TypeScript.
- **`src/go`**: Implementations in Go (1.22+).
- **`01-...` to `20-...`**: Chapter notes and exercise descriptions.

## Prerequisites

To run Stacksmith locally, you’ll need a few basic tools installed. Nothing exotic.

### Required

Node.js (v20 or newer recommended)
Used to run the CLI, the TypeScript implementations, and the benchmarks.
👉 https://nodejs.org

Go (v1.22 or newer)
Required to compile and run the Go implementations.
👉 https://go.dev/dl

### Optional but Recommended

The project uses Yarn for dependency management. If you don’t have it yet:

`npm install -g yarn`

A basic familiarity with JavaScript or TypeScript
You don’t need to be a Go expert. The Go code is there to compare behavior and performance, not to test your Go knowledge. We're all here to learn.

## Exercises & Solutions

| Chapter | Topic                          | Exercises                                                                                 | TypeScript                                           | Go                                                |
| :------ | :----------------------------- | :---------------------------------------------------------------------------------------- | :--------------------------------------------------- | :------------------------------------------------ |
| **01**  | **Why Data Structures Matter** | [Ex 1](./01-why-data-structures-matter/exercises/exercise_1.md)                           | [Solution](./src/typescript/chapter01/exercise01.ts) | [Solution](./src/go/chapter01/exercise01/main.go) |
|         |                                | [Ex 2](./01-why-data-structures-matter/exercises/exercise_2.md)                           | [Solution](./src/typescript/chapter01/exercise02.ts) | [Solution](./src/go/chapter01/exercise02/main.go) |
|         |                                | [Ex 3](./01-why-data-structures-matter/exercises/exercise_3.md)                           | [Solution](./src/typescript/chapter01/exercise03.ts) | [Solution](./src/go/chapter01/exercise03/main.go) |
| **02**  | **Why Algorithms Matter**      | [Ex 1](./02-why-algorithms-matter/exercises/exercise_1.md)                                | [Solution](./src/typescript/chapter02/exercise01.ts) | [Solution](./src/go/chapter02/exercise01/main.go) |
|         |                                | [Ex 2](./02-why-algorithms-matter/exercises/exercise_2.md)                                | [Solution](./src/typescript/chapter02/exercise02.ts) | [Solution](./src/go/chapter02/exercise02/main.go) |
|         |                                | [Ex 3](./02-why-algorithms-matter/exercises/exercise_3.md)                                | [Solution](./src/typescript/chapter02/exercise03.ts) | [Solution](./src/go/chapter02/exercise03/main.go) |
| **03**  | **O Yes Big O Notation**       | [Ex 1](./03-o-yes-big-o-notation/exercises/exercise_1.md)                                 | [Solution](./src/typescript/chapter03/exercise01.ts) | [Solution](./src/go/chapter03/exercise01/main.go) |
|         |                                | [Ex 2](./03-o-yes-big-o-notation/exercises/exercise_2.md)                                 | [Solution](./src/typescript/chapter03/exercise02.ts) | [Solution](./src/go/chapter03/exercise02/main.go) |
|         |                                | [Ex 3](./03-o-yes-big-o-notation/exercises/exercise_3.md)                                 | [Solution](./src/typescript/chapter03/exercise03.ts) | [Solution](./src/go/chapter03/exercise03/main.go) |
|         |                                | [Ex 4](./03-o-yes-big-o-notation/exercises/exercise_4.md)                                 | [Solution](./src/typescript/chapter03/exercise04.ts) | [Solution](./src/go/chapter03/exercise04/main.go) |
|         |                                | [Ex 5](./03-o-yes-big-o-notation/exercises/exercise_5.md)                                 | [Solution](./src/typescript/chapter03/exercise05.ts) | [Solution](./src/go/chapter03/exercise05/main.go) |
| **04**  | **Speeding Up Your Code**      | [Ex 1](./04-speeding-up-your-code-with-big-o/exercises/exercise_1.md)                     | [Solution](./src/typescript/chapter04/exercise01.ts) | [Solution](./src/go/chapter04/exercise01/main.go) |
|         |                                | [Ex 2](./04-speeding-up-your-code-with-big-o/exercises/exercise_2.md)                     | [Solution](./src/typescript/chapter04/exercise02.ts) | [Solution](./src/go/chapter04/exercise02/main.go) |
|         |                                | [Ex 3](./04-speeding-up-your-code-with-big-o/exercises/exercise_3.md)                     | [Solution](./src/typescript/chapter04/exercise03.ts) | [Solution](./src/go/chapter04/exercise03/main.go) |
|         |                                | [Ex 4](./04-speeding-up-your-code-with-big-o/exercises/exercise_4.md)                     | [Solution](./src/typescript/chapter04/exercise04.ts) | [Solution](./src/go/chapter04/exercise04/main.go) |
| **05**  | **Optimizing Code**            | [Ex 1](./05-optimizing-code-with-and-without-big-o/exercises/exercise_1.md)               | [Solution](./src/typescript/chapter05/exercise01.ts) | [Solution](./src/go/chapter05/exercise01/main.go) |
|         |                                | [Ex 2](./05-optimizing-code-with-and-without-big-o/exercises/exercise_2.md)               | [Solution](./src/typescript/chapter05/exercise02.ts) | [Solution](./src/go/chapter05/exercise02/main.go) |
|         |                                | [Ex 3](./05-optimizing-code-with-and-without-big-o/exercises/exercise_3.md)               | [Solution](./src/typescript/chapter05/exercise03.ts) | [Solution](./src/go/chapter05/exercise03/main.go) |
|         |                                | [Ex 4](./05-optimizing-code-with-and-without-big-o/exercises/exercise_4.md)               | [Solution](./src/typescript/chapter05/exercise04.ts) | [Solution](./src/go/chapter05/exercise04/main.go) |
|         |                                | [Ex 5](./05-optimizing-code-with-and-without-big-o/exercises/exercise_5.md)               | [Solution](./src/typescript/chapter05/exercise05.ts) | [Solution](./src/go/chapter05/exercise05/main.go) |
| **06**  | **Optimistic Scenarios**       | [Ex 1](./06-optimizing-for-optimistic-scenarios/exercises/exercise_01.md)                 | [Solution](./src/typescript/chapter06/exercise01.ts) | [Solution](./src/go/chapter06/exercise01/main.go) |
|         |                                | [Ex 2](./06-optimizing-for-optimistic-scenarios/exercises/exercise_02.md)                 | [Solution](./src/typescript/chapter06/exercise02.ts) | [Solution](./src/go/chapter06/exercise02/main.go) |
|         |                                | [Ex 3](./06-optimizing-for-optimistic-scenarios/exercises/exercise_03.md)                 | [Solution](./src/typescript/chapter06/exercise03.ts) | [Solution](./src/go/chapter06/exercise03/main.go) |
|         |                                | [Ex 4](./06-optimizing-for-optimistic-scenarios/exercises/exercise_04.md)                 | [Solution](./src/typescript/chapter06/exercise04.ts) | [Solution](./src/go/chapter06/exercise04/main.go) |
| **07**  | **Big O in Everyday Code**     | [Ex 1](./07-big-o-in-everyday-code/exercises/exercise_01.md)                              | [Solution](./src/typescript/chapter07/exercise01.ts) | [Solution](./src/go/chapter07/exercise01/main.go) |
|         |                                | [Ex 2](./07-big-o-in-everyday-code/exercises/exercise_02.md)                              | [Solution](./src/typescript/chapter07/exercise02.ts) | [Solution](./src/go/chapter07/exercise02/main.go) |
|         |                                | [Ex 3](./07-big-o-in-everyday-code/exercises/exercise_03.md)                              | [Solution](./src/typescript/chapter07/exercise03.ts) | [Solution](./src/go/chapter07/exercise03/main.go) |
|         |                                | [Ex 4](./07-big-o-in-everyday-code/exercises/exercise_04.md)                              | [Solution](./src/typescript/chapter07/exercise04.ts) | [Solution](./src/go/chapter07/exercise04/main.go) |
| **08**  | **Hash Tables**                | [Ex 1](./08-blazing-fast-lookup-with-hash-tables/exercises/exercise_01.md)                | [Solution](./src/typescript/chapter08/exercise01.ts) | [Solution](./src/go/chapter08/exercise01/main.go) |
|         |                                | [Ex 2](./08-blazing-fast-lookup-with-hash-tables/exercises/exercise_02.md)                | [Solution](./src/typescript/chapter08/exercise02.ts) | [Solution](./src/go/chapter08/exercise02/main.go) |
| **09**  | **Stacks & Queues**            | [Ex 1](./09-creating-elegant-code-with-stacks-and-queues/exercises/exercise_01.md)        | [Solution](./src/typescript/chapter09/exercise01.ts) | [Solution](./src/go/chapter09/exercise01/main.go) |
|         |                                | [Ex 2](./09-creating-elegant-code-with-stacks-and-queues/exercises/exercise_02.md)        | [Solution](./src/typescript/chapter09/exercise02.ts) | [Solution](./src/go/chapter09/exercise02/main.go) |
|         |                                | [Ex 3](./09-creating-elegant-code-with-stacks-and-queues/exercises/exercise_03.md)        | [Solution](./src/typescript/chapter09/exercise03.ts) | [Solution](./src/go/chapter09/exercise03/main.go) |
|         |                                | [Ex 4](./09-creating-elegant-code-with-stacks-and-queues/exercises/exercise_04.md)        | [Solution](./src/typescript/chapter09/exercise04.ts) | [Solution](./src/go/chapter09/exercise04/main.go) |
| **10**  | **Recursion**                  | [Ex 1](./10-recursively-recurse-with-recursion/exercises/exercise_01.md)                  | [Solution](./src/typescript/chapter10/exercise01.ts) | [Solution](./src/go/chapter10/exercise01/main.go) |
|         |                                | [Ex 2](./10-recursively-recurse-with-recursion/exercises/exercise_02.md)                  | [Solution](./src/typescript/chapter10/exercise02.ts) | [Solution](./src/go/chapter10/exercise02/main.go) |
|         |                                | [Ex 3](./10-recursively-recurse-with-recursion/exercises/exercise_03.md)                  | [Solution](./src/typescript/chapter10/exercise03.ts) | [Solution](./src/go/chapter10/exercise03/main.go) |
|         |                                | [Ex 4](./10-recursively-recurse-with-recursion/exercises/exercise_04.md)                  | [Solution](./src/typescript/chapter10/exercise04.ts) | [Solution](./src/go/chapter10/exercise04/main.go) |
| **11**  | **Writing Recursive**          | [Ex 1](./11-learning-to-write-in-recursive/exercises/exercise_01.md)                      | [Solution](./src/typescript/chapter11/exercise01.ts) | [Solution](./src/go/chapter11/exercise01/main.go) |
|         |                                | [Ex 2](./11-learning-to-write-in-recursive/exercises/exercise_02.md)                      | [Solution](./src/typescript/chapter11/exercise02.ts) | [Solution](./src/go/chapter11/exercise02/main.go) |
|         |                                | [Ex 3](./11-learning-to-write-in-recursive/exercises/exercise_03.md)                      | [Solution](./src/typescript/chapter11/exercise03.ts) | [Solution](./src/go/chapter11/exercise03/main.go) |
|         |                                | [Ex 4](./11-learning-to-write-in-recursive/exercises/exercise_04.md)                      | [Solution](./src/typescript/chapter11/exercise04.ts) | [Solution](./src/go/chapter11/exercise04/main.go) |
|         |                                | [Ex 5](./11-learning-to-write-in-recursive/exercises/exercise_05.md)                      | [Solution](./src/typescript/chapter11/exercise05.ts) | [Solution](./src/go/chapter11/exercise05/main.go) |
| **12**  | **Dynamic Programming**        | [Ex 1](./12-dynamic-programming/exercises/exercise_01.md)                                 | [Solution](./src/typescript/chapter12/exercise01.ts) | [Solution](./src/go/chapter12/exercise01/main.go) |
|         |                                | [Ex 2](./12-dynamic-programming/exercises/exercise_02.md)                                 | [Solution](./src/typescript/chapter12/exercise02.ts) | [Solution](./src/go/chapter12/exercise02/main.go) |
|         |                                | [Ex 3](./12-dynamic-programming/exercises/exercise_03.md)                                 | [Solution](./src/typescript/chapter12/exercise03.ts) | [Solution](./src/go/chapter12/exercise03/main.go) |
| **13**  | **Recursive Algorithms**       | [Ex 1](./13-recursive-algorithms-for-speed/exercises/exercise_01.md)                      | [Solution](./src/typescript/chapter13/exercise01.ts) | [Solution](./src/go/chapter13/exercise01/main.go) |
|         |                                | [Ex 2](./13-recursive-algorithms-for-speed/exercises/exercise_02.md)                      | [Solution](./src/typescript/chapter13/exercise02.ts) | [Solution](./src/go/chapter13/exercise02/main.go) |
|         |                                | [Ex 3](./13-recursive-algorithms-for-speed/exercises/exercise_03.md)                      | [Solution](./src/typescript/chapter13/exercise03.ts) | [Solution](./src/go/chapter13/exercise03/main.go) |
| **14**  | **Node Based Structures**      | [Ex 1](./14-node-based-data-structures/exercises/exercise_01.md)                          | [Solution](./src/typescript/chapter14/exercise01.ts) | [Solution](./src/go/chapter14/exercise01/main.go) |
|         |                                | [Ex 2](./14-node-based-data-structures/exercises/exercise_02.md)                          | [Solution](./src/typescript/chapter14/exercise02.ts) | [Solution](./src/go/chapter14/exercise02/main.go) |
|         |                                | [Ex 3](./14-node-based-data-structures/exercises/exercise_03.md)                          | [Solution](./src/typescript/chapter14/exercise03.ts) | [Solution](./src/go/chapter14/exercise03/main.go) |
|         |                                | [Ex 4](./14-node-based-data-structures/exercises/exercise_04.md)                          | [Solution](./src/typescript/chapter14/exercise04.ts) | [Solution](./src/go/chapter14/exercise04/main.go) |
|         |                                | [Ex 5](./14-node-based-data-structures/exercises/exercise_05.md)                          | [Solution](./src/typescript/chapter14/exercise05.ts) | [Solution](./src/go/chapter14/exercise05/main.go) |
| **15**  | **Binary Search Trees**        | [Ex 1](./15-speeding-up-all-the-things-with-binary-search-trees/exercises/exercise_01.md) | [Solution](./src/typescript/chapter15/exercise01.ts) | [Solution](./src/go/chapter15/exercise01/main.go) |
|         |                                | [Ex 2](./15-speeding-up-all-the-things-with-binary-search-trees/exercises/exercise_02.md) | [Solution](./src/typescript/chapter15/exercise02.ts) | [Solution](./src/go/chapter15/exercise02/main.go) |
|         |                                | [Ex 3](./15-speeding-up-all-the-things-with-binary-search-trees/exercises/exercise_03.md) | [Solution](./src/typescript/chapter15/exercise03.ts) | [Solution](./src/go/chapter15/exercise03/main.go) |
|         |                                | [Ex 4](./15-speeding-up-all-the-things-with-binary-search-trees/exercises/exercise_04.md) | [Solution](./src/typescript/chapter15/exercise04.ts) | [Solution](./src/go/chapter15/exercise04/main.go) |
|         |                                | [Ex 5](./15-speeding-up-all-the-things-with-binary-search-trees/exercises/exercise_05.md) | [Solution](./src/typescript/chapter15/exercise05.ts) | [Solution](./src/go/chapter15/exercise05/main.go) |
| **16**  | **Heaps**                      | [Ex 1](./16-keeping-your-priorities-straight-with-heaps/exercises/exercise_01.md)         | [Solution](./src/typescript/chapter16/exercise01.ts) | [Solution](./src/go/chapter16/exercise01/main.go) |
|         |                                | [Ex 2](./16-keeping-your-priorities-straight-with-heaps/exercises/exercise_02.md)         | [Solution](./src/typescript/chapter16/exercise02.ts) | [Solution](./src/go/chapter16/exercise02/main.go) |
|         |                                | [Ex 3](./16-keeping-your-priorities-straight-with-heaps/exercises/exercise_03.md)         | [Solution](./src/typescript/chapter16/exercise03.ts) | [Solution](./src/go/chapter16/exercise03/main.go) |
| **17**  | **Tries**                      | [Ex 1](./17-it-doesnt-hurt-to-trie/exercises/exercise_01.md)                              | [Solution](./src/typescript/chapter17/exercise01.ts) | [Solution](./src/go/chapter17/exercise01/main.go) |
|         |                                | [Ex 2](./17-it-doesnt-hurt-to-trie/exercises/exercise_02.md)                              | [Solution](./src/typescript/chapter17/exercise02.ts) | [Solution](./src/go/chapter17/exercise02/main.go) |
|         |                                | [Ex 3](./17-it-doesnt-hurt-to-trie/exercises/exercise_03.md)                              | [Solution](./src/typescript/chapter17/exercise03.ts) | [Solution](./src/go/chapter17/exercise03/main.go) |
|         |                                | [Ex 4](./17-it-doesnt-hurt-to-trie/exercises/exercise_04.md)                              | [Solution](./src/typescript/chapter17/exercise04.ts) | [Solution](./src/go/chapter17/exercise04/main.go) |
| **18**  | **Graphs**                     | [Ex 1](./18-connecting-everything-with-graphs/exercises/exercise_01.md)                   | [Solution](./src/typescript/chapter18/exercise01.ts) | [Solution](./src/go/chapter18/exercise01/main.go) |
|         |                                | [Ex 2](./18-connecting-everything-with-graphs/exercises/exercise_02.md)                   | [Solution](./src/typescript/chapter18/exercise02.ts) | [Solution](./src/go/chapter18/exercise02/main.go) |
|         |                                | [Ex 3](./18-connecting-everything-with-graphs/exercises/exercise_03.md)                   | [Solution](./src/typescript/chapter18/exercise03.ts) | [Solution](./src/go/chapter18/exercise03/main.go) |
|         |                                | [Ex 4](./18-connecting-everything-with-graphs/exercises/exercise_04.md)                   | [Solution](./src/typescript/chapter18/exercise04.ts) | [Solution](./src/go/chapter18/exercise04/main.go) |
|         |                                | [Ex 5](./18-connecting-everything-with-graphs/exercises/exercise_05.md)                   | [Solution](./src/typescript/chapter18/exercise05.ts) | [Solution](./src/go/chapter18/exercise05/main.go) |
| **19**  | **Space Constraints**          | [Ex 1](./19-dealing-with-space-constraints/exercises/exercise_01.md)                      | [Solution](./src/typescript/chapter19/exercise01.ts) | [Solution](./src/go/chapter19/exercise01/main.go) |
|         |                                | [Ex 2](./19-dealing-with-space-constraints/exercises/exercise_02.md)                      | [Solution](./src/typescript/chapter19/exercise02.ts) | [Solution](./src/go/chapter19/exercise02/main.go) |
|         |                                | [Ex 3](./19-dealing-with-space-constraints/exercises/exercise_03.md)                      | [Solution](./src/typescript/chapter19/exercise03.ts) | [Solution](./src/go/chapter19/exercise03/main.go) |
|         |                                | [Ex 4](./19-dealing-with-space-constraints/exercises/exercise_04.md)                      | [Solution](./src/typescript/chapter19/exercise04.ts) | [Solution](./src/go/chapter19/exercise04/main.go) |
| **20**  | **Code Optimization**          | [Ex 1](./20-techniques-for-code-optimization/exercises/exercise_01.md)                    | [Solution](./src/typescript/chapter20/exercise01.ts) | [Solution](./src/go/chapter20/exercise01/main.go) |
|         |                                | [Ex 2](./20-techniques-for-code-optimization/exercises/exercise_02.md)                    | [Solution](./src/typescript/chapter20/exercise02.ts) | [Solution](./src/go/chapter20/exercise02/main.go) |
|         |                                | [Ex 3](./20-techniques-for-code-optimization/exercises/exercise_03.md)                    | [Solution](./src/typescript/chapter20/exercise03.ts) | [Solution](./src/go/chapter20/exercise03/main.go) |
|         |                                | [Ex 4](./20-techniques-for-code-optimization/exercises/exercise_04.md)                    | [Solution](./src/typescript/chapter20/exercise04.ts) | [Solution](./src/go/chapter20/exercise04/main.go) |
|         |                                | [Ex 5](./20-techniques-for-code-optimization/exercises/exercise_05.md)                    | [Solution](./src/typescript/chapter20/exercise05.ts) | [Solution](./src/go/chapter20/exercise05/main.go) |
|         |                                | [Ex 6](./20-techniques-for-code-optimization/exercises/exercise_06.md)                    | [Solution](./src/typescript/chapter20/exercise06.ts) | [Solution](./src/go/chapter20/exercise06/main.go) |

## Disclaimer

This is my personal learning repository, based on "A Common-Sense Guide to Data Structures and Algorithms" by Jay Wengrow. Code and chapter recaps are written for learning purposes.

## License

MIT
