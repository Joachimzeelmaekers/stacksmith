package helpers

import (
	"fmt"
	"strings"
)

func IntSliceToString(arr []int) string {
	strs := make([]string, len(arr))
	for i, v := range arr {
		strs[i] = fmt.Sprintf("%d", v)
	}
	return "[" + strings.Join(strs, ", ") + "]"
}
