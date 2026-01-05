# Chapter 20 – Techniques for Code Optimization

## Context and Goals

Optimization is about **changing the cost model** of a program: picking data structures and algorithms that minimize the dominant work; precomputing and caching results; exploiting problem structure. This chapter provides a concise playbook for improving performance without sacrificing correctness or clarity.

---

## Core Concepts and Reasoning

### 1) Change the Data Structure, Change the Runtime

Most speedups come from replacing linear scans with **indexed access**.

* Arrays → Hash maps/sets for O(1) membership and counting.
* Full sorts → Heaps/selection for top‑K in O(N log K).
* Linked lists ↔ arrays depending on locality versus insertion patterns.

### 2) Precomputation and Caching

* **Memoization**: cache results keyed by inputs. Eliminates recomputation for overlapping subproblems.
* **Materialization**: build auxiliary indexes (maps from key → records) to avoid repeated searches.

### 3) Reduce the Asymptotic, Not Just Constants

* Replace O(N·M) nested searches with O(N + M) by hashing one side.
* Prefer divide‑and‑conquer O(N log N) over quadratic approaches.
* Use early exits and pruning to cut the effective search space.

### 4) Constant Factors and Locality

* Minimize allocations and copying in hot loops.
* Favor tight data layouts (contiguous arrays) for cache efficiency when random access is frequent.
* Batch system calls and I/O.

### 5) Measurement Discipline

* **Measure first** (wall time, allocations, peak memory). Form a hypothesis, change one thing, and re‑measure.
* Use representative inputs; beware microbenchmarks that don’t reflect production.

---

## Examples

### Example 1: Anagram Check (Counting vs Sorting)

Sorting both strings is O(N log N). Counting character frequencies is O(N).

#### TypeScript

```typescript
function areAnagrams(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const count = new Map<string, number>();
  for (const ch of a) count.set(ch, (count.get(ch) ?? 0) + 1);
  for (const ch of b) {
    const v = (count.get(ch) ?? 0) - 1;
    if (v < 0) return false;
    count.set(ch, v);
  }
  return true;
}
```

#### Go

```go
func AreAnagrams(a, b string) bool {
  if len(a) != len(b) { return false }
  cnt := map[rune]int{}
  for _, ch := range a { cnt[ch]++ }
  for _, ch := range b { cnt[ch]--; if cnt[ch] < 0 { return false } }
  return true
}
```

### Example 2: De‑dupe and Membership (Hash Index)

Replace nested loops with a prebuilt set.

#### TypeScript

```typescript
function intersect(a: number[], b: number[]): number[] {
  const s = new Set<number>(a);
  const out: number[] = [];
  for (const x of b) if (s.has(x)) out.push(x);
  return out; // O(a.size + b.length)
}
```

#### Go

```go
func Intersect(a, b []int) []int {
  s := make(map[int]struct{}, len(a))
  for _, x := range a { s[x] = struct{}{} }
  out := make([]int, 0)
  for _, x := range b { if _, ok := s[x]; ok { out = append(out, x) } }
  return out
}
```

### Example 3: Top‑K with a Size‑K Min‑Heap

Sorting N items is O(N log N); maintaining a min‑heap of size K is O(N log K).

#### TypeScript

```typescript
class MinHeap {
  private a: number[] = [];
  private up(i: number){ while (i>0){ const p=(i-1)>>1; if (this.a[p] <= this.a[i]) break; [this.a[p], this.a[i]]=[this.a[i], this.a[p]]; i=p } }
  private down(i: number){ for(;;){ let m=i, l=2*i+1, r=l+1; if(l<this.a.length&&this.a[l]<this.a[m]) m=l; if(r<this.a.length&&this.a[r]<this.a[m]) m=r; if(m===i) break; [this.a[m],this.a[i]]=[this.a[i],this.a[m]]; i=m } }
  push(x:number){ this.a.push(x); this.up(this.a.length-1) }
  pop():number|undefined{ if(!this.a.length) return; const r=this.a[0]; const x=this.a.pop()!; if(this.a.length){ this.a[0]=x; this.down(0) } return r }
  peek(){ return this.a[0] }
  size(){ return this.a.length }
}

function topK(nums: number[], k: number): number[] {
  const h = new MinHeap();
  for (const x of nums) {
    if (h.size() < k) h.push(x);
    else if (x > (h.peek() ?? -Infinity)) { h.pop(); h.push(x); }
  }
  const out: number[] = [];
  while (h.size()) out.push(h.pop()!);
  return out; // K largest elements
}
```

#### Go

```go
type MinHeap struct{ A []int }
func (h *MinHeap) up(i int){ for i>0{ p:=(i-1)/2; if h.A[p]<=h.A[i]{break}; h.A[p],h.A[i]=h.A[i],h.A[p]; i=p } }
func (h *MinHeap) down(i int){ for{ l:=2*i+1; r:=l+1; m:=i; if l<len(h.A)&&h.A[l]<h.A[m]{m=l}; if r<len(h.A)&&h.A[r]<h.A[m]{m=r}; if m==i{break}; h.A[m],h.A[i]=h.A[i],h.A[m]; i=m } }
func (h *MinHeap) Push(x int){ h.A = append(h.A, x); h.up(len(h.A)-1) }
func (h *MinHeap) Pop()(int,bool){ n:=len(h.A); if n==0 {return 0,false}; r:=h.A[0]; x:=h.A[n-1]; h.A=h.A[:n-1]; if len(h.A)>0{ h.A[0]=x; h.down(0) }; return r,true }
func (h *MinHeap) Peek()(int,bool){ if len(h.A)==0 { return 0,false }; return h.A[0],true }
func (h *MinHeap) Size() int { return len(h.A) }

func TopK(nums []int, k int) []int {
  h := &MinHeap{}
  for _, x := range nums {
    if h.Size() < k { h.Push(x) } else if top, ok := h.Peek(); ok && x > top { h.Pop(); h.Push(x) }
  }
  out := make([]int, 0, h.Size())
  for h.Size() > 0 { v, _ := h.Pop(); out = append(out, v) }
  return out
}
```

### Example 4: Memoization Cache for Expensive Calls

#### TypeScript

```typescript
function memoize<A extends any[], R>(fn: (...a: A) => R) {
  const cache = new Map<string, R>();
  return (...a: A): R => {
    const key = JSON.stringify(a);
    if (cache.has(key)) return cache.get(key)!;
    const v = fn(...a);
    cache.set(key, v);
    return v;
  };
}
```

#### Go

```go
type Memo[A comparable, R any] struct { m map[A]R; f func(A) R }
func NewMemo[A comparable, R any](f func(A) R) *Memo[A,R] { return &Memo[A,R]{m: map[A]R{}, f:f} }
func (me *Memo[A,R]) Call(a A) R { if v, ok := me.m[a]; ok { return v }; v := me.f(a); me.m[a] = v; return v }
```

---

## Performance and Design Insights

* The biggest wins usually come from **changing the algorithmic class** (e.g., N·M → N+M) or exploiting **problem structure** (prefixes, ordering, sparsity).
* Use hashing to avoid repeated searching; use heaps to avoid full sorting; use tries when queries are prefix‑oriented.
* Optimize memory traffic (fewer allocations, contiguous layouts) in tight loops to improve constant factors.
* Always protect correctness with tests; optimizations that change representation can shift edge cases.

---

## Key Takeaways

* Start with measurement, then optimize the **dominant cost**.
* Prefer structural changes (data structures/algorithms) over micro‑optimizations.
* Precompute, index, and cache to replace recomputation with lookups.
* Re‑measure and validate after each change; performance work is empirical.
