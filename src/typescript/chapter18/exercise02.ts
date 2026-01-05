/**
 * Exercise 2: DFS Traversal
 *
 * Implement depth-first search on a graph.
 */

import { Graph } from "../helpers/data-structures/graph";

console.log("=== DFS Traversal ===\n");

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

console.log("DFS Iterative from A:", graph.dfsIterative("A").join(" → "));
console.log("DFS Recursive from A:", graph.dfsRecursive("A").join(" → "));
console.log("\n✓ DFS explores as deep as possible first (uses stack)");
