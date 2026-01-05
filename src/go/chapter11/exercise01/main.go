package main

import (
	"encoding/json"
	"fmt"
)

func countFiles(tree []interface{}) int {
	count := 0

	for _, item := range tree {
		switch v := item.(type) {
		case string:
			count++
		case map[string]interface{}:
			for _, contents := range v {
				if arr, ok := contents.([]interface{}); ok {
					count += countFiles(arr)
				}
			}
		}
	}

	return count
}

func main() {
	fmt.Println("=== Count Files in Directory Tree ===")
	fmt.Println()

	directoryTree := []interface{}{
		"file1.txt",
		map[string]interface{}{
			"images": []interface{}{
				"photo1.jpg",
				"photo2.jpg",
				map[string]interface{}{
					"thumbnails": []interface{}{"thumb1.jpg"},
				},
			},
		},
		"file2.txt",
		map[string]interface{}{
			"docs": []interface{}{
				"readme.md",
				map[string]interface{}{
					"nested": []interface{}{"deep.txt", "deeper.txt"},
				},
			},
		},
	}

	jsonBytes, _ := json.MarshalIndent(directoryTree, "", "  ")
	fmt.Println("Directory structure:")
	fmt.Println(string(jsonBytes))
	fmt.Printf("\n→ Total files: %d\n", countFiles(directoryTree))
}

