# Exercise 1: Stack or Queue for Call Center

If you were writing software for a call center that places callers on hold and then assigns them to "the next available representative," would you use a stack or a queue?

## Answer

**Queue** - You would use a queue because callers should be served in the order they called (First In, First Out - FIFO). The first caller to be placed on hold should be the first to speak with a representative.

**Key Insight:** Queues are ideal for scenarios where fairness and order of arrival matter.

## Run the Solution

- **TypeScript:** `npx tsx src/typescript/chapter09/exercise01.ts`
- **Go:** `go run src/go/chapter09/exercise01/main.go`
