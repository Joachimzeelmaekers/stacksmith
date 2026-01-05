/**
 * Exercise 4: Shortest Path (Unweighted Graph)
 *
 * Find the shortest path between two vertices in an unweighted graph.
 */

import { Graph } from "../helpers/data-structures/graph";

console.log("=== Shortest Path (BFS) ===\n");

const graph = new Graph<string>();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("B", "E");
graph.addEdge("C", "F");
graph.addEdge("D", "G");
graph.addEdge("E", "G");
graph.addEdge("F", "G");

console.log("Graph:");
console.log("    A");
console.log("   / \\");
console.log("  B   C");
console.log(" /|   |");
console.log("D E   F");
console.log(" \\|  /");
console.log("   G\n");

const paths = [
  { start: "A", end: "G" },
  { start: "B", end: "F" },
  { start: "D", end: "C" },
];

for (const { start, end } of paths) {
  const path = graph.shortestPath(start, end);
  if (path) {
    console.log(
      `${start} → ${end}: ${path.join(" → ")} (length: ${path.length - 1})`
    );
  } else {
    console.log(`${start} → ${end}: No path found`);
  }
}

console.log("\n✓ BFS finds shortest path in unweighted graphs");
