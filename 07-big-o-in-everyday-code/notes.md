# Big O in Everyday Code (Condensed Notes)

Big O tells us **how runtime grows as input grows**, not exact steps. Ignore constants and focus on dominant factors.

---

## Common Runtime Categories

- **O(1)**: Constant time. Work doesn’t scale with input size.
  *Example*: index access in arrays, fetching first/middle/last element.

- **O(N)**: Linear time. Each element is touched once.
  *Examples*: filtering evens, summing numbers, checking palindrome with two pointers.

- **O(N²)**: Quadratic time. Nested loops over the same dataset.
  *Examples*: building all 2-character combinations, generating pairwise products.
  ⚠️ Even triangular loops (like `j = i+1`) are still O(N²).

- **O(N·M)**: Cross-dataset products. Complexity depends on both arrays.
  *Example*: multiplying every number in array A with every number in array B.

- **O(N³), O(N⁴)…**: Higher-order polynomials from multiple nested loops.
  *Example*: all 3-character strings from an array of characters.

- **O(2^N), O(26^N)**: Exponential growth. Each extra input doubles (or worse) the work.
  *Example*: brute-force password generation.
  ⚠️ Impractical beyond very small N.

---

## Key Rules of Thumb

- **Sequential vs nested loops:**
  - Two loops in sequence → O(N)
  - Two loops nested → O(N²)

- **Ignore constants:**
  - N + N → O(N)
  - 5N → O(N)

- **Worst case matters most:**
  - Searching could stop early, but we assume it may have to check everything.

- **Different datasets require different variables:**
  - Use O(N·M), not O(N), if inputs are independent.

- **Patterns:**
  - *Single pass* → O(N)
  - *All pairs* → O(N²)
  - *All triples* → O(N³)
  - *All subsets/strings of length N* → exponential.

---

## Visual Memory Aids

- **Linear vs quadratic**: N vs N² = touching every element vs touching every *pair*.
- **Exponential**: Each +1 input doubles the work. Compare to O(log N), where doubling input only adds one step.
- **Constants vanish**: 3N + 3 → O(N). N/2 → O(N).

---

## One-Liner Examples

- Find average of evens: **O(N)**
- Generate 2-letter words: **O(N²)**
- Sample array ends + middle: **O(1)**
- Cross multiply arrays: **O(N·M)**
- Palindrome check: **O(N)**
- Brute-force passwords: **O(26^N)**

## Code examples

### Mean Average of Even Numbers — **O(N)**

Process each element once; constant work per element (check-even + add + count). Setup and final division are constants.

```js
function averageOfEvenNumbers(arr) {
  let sum = 0, cnt = 0;
  for (const n of arr) {
    if ((n & 1) === 0) { // n % 2 === 0
      sum += n;
      cnt += 1;
    }
  }
  return sum / cnt;
}
```

```go

func AverageOfEvenNumbers(arr []int) float64 {
    var sum float64
    cnt := 0
    for _, n := range arr {
        if n%2 == 0 {
            sum += float64(n)
            cnt++
        }
    }
    return sum / float64(cnt)
}
```

### Word Builder (All 2-char combos) — O(N²)

Two nested loops over the same N

```js
function wordBuilder2(array) {
  const out = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i !== j) out.push(array[i] + array[j]);
    }
  }
  return out;
}
```

```go
func WordBuilder2(a []string) []string {
    out := make([]string, 0, len(a)*(len(a)-1))
    for i := 0; i < len(a); i++ {
        for j := 0; j < len(a); j++ {
            if i != j {
                out = append(out, a[i]+a[j])
            }
        }
    }
    return out
}
```

### Triples: three nested loops → O(N³)

```js
function wordBuilder3(array) {
  const out = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      for (let k = 0; k < array.length; k++) {
        if (i !== j && j !== k && i !== k) {
          out.push(array[i] + array[j] + array[k]);
        }
      }
    }
  }
  return out;
}
```

```go
func WordBuilder3(a []string) []string {
    out := []string{}
    for i := 0; i < len(a); i++ {
        for j := 0; j < len(a); j++ {
            for k := 0; k < len(a); k++ {
                if i != j && j != k && i != k {
                    out = append(out, a[i]+a[j]+a[k])
                }
            }
        }
    }
    return out
}
```

### Array Sample (first, middle, last) — O(1)

#### Constant-time index reads regardless of N

```js
function sample(array) {
  const first = array[0];
  const middle = array[Math.floor(array.length / 2)];
  const last = array[array.length - 1];
  return [first, middle, last];
}
```

```go
func Sample[T any](a []T) (T, T, T) {
    first := a[0]
    middle := a[len(a)/2]
    last := a[len(a)-1]
    return first, middle, last
}
```

### Average Celsius Reading — O(N)

#### Two sequential loops over N (convert then sum) → N + N → drop constants

```js
function averageCelsius(fahrenheitReadings) {
  const c = [];
  for (const f of fahrenheitReadings) c.push((f - 32) / 1.8);
  let sum = 0;
  for (const x of c) sum += x;
  return sum / c.length;
}
```

```go
func AverageCelsius(f []float64) float64 {
    c := make([]float64, 0, len(f))
    for _, v := range f {
        c = append(c, (v-32)/1.8)
    }
    sum := 0.0
    for _, x := range c {
        sum += x
    }
    return sum / float64(len(c))
}
```

### Clothing Labels — O(N)

#### Outer loop over N items; inner loop is a fixed 1..5 → 5N → drop constant

```js
function markInventory(items) {
  const out = [];
  for (const item of items) {
    for (let size = 1; size <= 5; size++) {
      out.push(`${item} Size: ${size}`);
    }
  }
  return out;
}
```

```go
func MarkInventory(items []string) []string {
    out := make([]string, 0, len(items)*5)
    for _, item := range items {
        for size := 1; size <= 5; size++ {
            out = append(out, item+" Size: "+fmt.Sprint(size))
        }
    }
    return out
}
```

### Count the Ones (array of arrays) — O(N)

#### Nested loops traverse different dimensions; total work equals total number count

```js
function countOnes(matrix) {
  let count = 0;
  for (const row of matrix) {
    for (const n of row) if (n === 1) count++;
  }
  return count;
}
```

```go
func CountOnes(matrix [][]int) int {
    count := 0
    for _, row := range matrix {
        for _, n := range row {
            if n == 1 { count++ }
        }
    }
    return count
}
```

### Palindrome Checker — O(N)

#### Two pointers meet in the middle (≈ N/2 comparisons) → drop constant

```js
function isPalindrome(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return false;
    i++; j--;
  }
  return true;
}
```

```go
func IsPalindrome(s string) bool {
    i, j := 0, len(s)-1
    for i < j {
        if s[i] != s[j] { return false }
        i++; j--
    }
    return true
}
```

### Get All the Products (one array) — O(N²)

#### Inner loop starts at i+1:(𝑁−1)+(𝑁−2)+…+1=𝑁2/2(N−1)+(N−2)+…+1=N2/2 → O(N²)

```js
function twoNumberProductsOneArray(arr) {
  const out = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      out.push(arr[i] * arr[j]);
    }
  }
  return out;
}
```

```go
func TwoNumberProductsOneArray(a []int) []int {
    out := []int{}
    for i := 0; i < len(a)-1; i++ {
        for j := i + 1; j < len(a); j++ {
            out = append(out, a[i]*a[j])
        }
    }
    return out
}
```

### Multiple Datasets (cross-product of two arrays) — O(N·M)

#### Two distinct datasets multiply: range is between O(N) (if M=1) and O(N²) (if M=N)

```js
function twoNumberProducts(arr1, arr2) {
  const out = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      out.push(arr1[i] * arr2[j]);
    }
  }
  return out;
}
```

```go
func TwoNumberProducts(a, b []int) []int {
    out := make([]int, 0, len(a)*len(b))
    for _, x := range a {
        for _, y := range b {
            out = append(out, x*y)
        }
    }
    return out
}
```

### Password Cracker (all strings of length N over a–z) — O(26^N)

#### Each +1 in N multiplies work by 26 → exponential

```js
function allLowercasePasswords(n) {
  const out = [];
  const buf = Array(n);
  function dfs(pos) {
    if (pos === n) { out.push(buf.join("")); return; }
    for (let c = 97; c <= 122; c++) { // 'a'..'z'
      buf[pos] = String.fromCharCode(c);
      dfs(pos + 1);
    }
  }
  dfs(0);
  return out;
}
```

```go
func AllLowercasePasswords(n int) []string {
    out := []string{}
    buf := make([]byte, n)
    var dfs func(int)
    dfs = func(pos int) {
        if pos == n {
            out = append(out, string(append([]byte{}, buf...)))
            return
        }
        for c := byte('a'); c <= byte('z'); c++ {
            buf[pos] = c
            dfs(pos + 1
        }
    }
    dfs(0)
    return out
}
```

## Key Patterns to Recognize

- Worst case, ignore constants.
- Sequential loops add (e.g., N + N → O(N)).
- Nested loops multiply (e.g., N × N → O(N²)).
- Triangular inner loops (j = i+1) still → O(N²).
- Distinct datasets → O(N·M).
- Exponential (e.g., O(26^N)) explodes fast; each extra element doubles or worse.
