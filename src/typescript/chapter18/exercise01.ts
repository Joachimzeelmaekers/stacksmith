/**
 * Exercise 1: BFS Traversal
 *
 * Implement breadth-first search on a graph.
 */

import { Graph } from "../helpers/data-structures/graph";

console.log("=== BFS Traversal ===\n");

const graph = new Graph<string>();
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("B", "E");
graph.addEdge("C", "F");
graph.addEdge("D", "E");
graph.addEdge("E", "F");

console.log("Graph structure:");
console.log("    A");
console.log("   / \\");
console.log("  B   C");
console.log(" /|   |");
console.log("D-E---F\n");

console.log("BFS starting from A:", graph.bfs("A").join(" → "));
console.log("\n✓ BFS explores level by level (uses queue)");
