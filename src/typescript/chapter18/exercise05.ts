/**
 * Exercise 5: Dijkstra's Algorithm
 *
 * Implement Dijkstra's algorithm for finding shortest paths in a weighted graph.
 */

import { WeightedGraph } from "../helpers/data-structures/weighted-graph";

console.log("=== Dijkstra's Algorithm ===\n");

const graph = new WeightedGraph();
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

console.log("Weighted Graph:");
console.log("    A");
console.log("   /4\\2");
console.log("  B   C");
console.log("  |3  |2\\4");
console.log("  E-3-D--F");
console.log("   \\1 |1/");
console.log("    \\_|/\n");

const paths = [
  { start: "A", end: "E" },
  { start: "A", end: "F" },
  { start: "B", end: "F" },
];

for (const { start, end } of paths) {
  const result = graph.dijkstra(start, end);
  if (result) {
    console.log(
      `${start} → ${end}: ${result.path.join(" → ")} (distance: ${
        result.distance
      })`
    );
  } else {
    console.log(`${start} → ${end}: No path found`);
  }
}

console.log("\n✓ Dijkstra's: O((V + E) log V) with priority queue");
