/**
 * Exercise 1: Count Files in Directory Tree
 *
 * Use recursion to write a function that accepts an array representing
 * a directory structure and returns the count of all files in the tree.
 */

type FileSystemItem = string | { [key: string]: FileSystemItem[] };

function countFiles(tree: FileSystemItem[]): number {
  let count = 0;

  for (const item of tree) {
    if (typeof item === "string") {
      count++;
    } else {
      for (const dir of Object.values(item)) {
        count += countFiles(dir);
      }
    }
  }

  return count;
}

console.log("=== Count Files in Directory Tree ===\n");

const directoryTree: FileSystemItem[] = [
  "file1.txt",
  {
    images: ["photo1.jpg", "photo2.jpg", { thumbnails: ["thumb1.jpg"] }],
  },
  "file2.txt",
  {
    docs: ["readme.md", { nested: ["deep.txt", "deeper.txt"] }],
  },
];

console.log("Directory structure:");
console.log(JSON.stringify(directoryTree, null, 2));
console.log(`\n→ Total files: ${countFiles(directoryTree)}`);
