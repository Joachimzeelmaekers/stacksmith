/**
 * Exercise 3: Find Path Between Vertices
 *
 * Implement a function to find if a path exists between two vertices.
 */

import { Graph } from "../helpers/data-structures/graph";

console.log("=== Find Path Between Vertices ===\n");

const graph = new Graph<string>();
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "D");
graph.addEdge("A", "E");
graph.addEdge("E", "F");

graph.addVertex("X");
graph.addVertex("Y");
graph.addEdge("X", "Y");

console.log("Graph: A-B-C-D, A-E-F, X-Y (disconnected)\n");

const tests = [
  { start: "A", end: "D" },
  { start: "A", end: "F" },
  { start: "A", end: "X" },
  { start: "X", end: "Y" },
];

for (const { start, end } of tests) {
  const hasPath = graph.hasPath(start, end);
  const path = graph.findPath(start, end);
  console.log(`${start} → ${end}: ${hasPath ? "Path exists" : "No path"}`);
  if (path) {
    console.log(`  Path: ${path.join(" → ")}`);
  }
  console.log();
}
