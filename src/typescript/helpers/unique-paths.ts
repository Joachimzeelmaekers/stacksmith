type UniquePathsOptions = {
  useMemo?: boolean;
};

export function uniquePaths(
  rows: number,
  cols: number,
  { useMemo = true }: UniquePathsOptions = { useMemo: true }
): number {
  const memoByKey = useMemo ? new Map<string, number>() : null;

  const solve = (r: number, c: number): number => {
    if (r === 1 || c === 1) {
      return 1;
    }

    if (useMemo) {
      const key = `${r},${c}`;
      const cached = memoByKey!.get(key);
      if (cached !== undefined) {
        return cached;
      }

      const result = solve(r - 1, c) + solve(r, c - 1);
      memoByKey!.set(key, result);
      return result;
    }

    // no memoization
    return solve(r - 1, c) + solve(r, c - 1);
  };

  return solve(rows, cols);
}
