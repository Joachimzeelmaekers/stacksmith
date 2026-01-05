export function formatMs(ms: number | null): string {
  if (ms === null) return "TOO SLOW";
  if (ms < 0.001) return `${(ms * 1000000).toFixed(0)}ns`;
  if (ms < 0.01) return `${(ms * 1000).toFixed(2)}µs`;
  if (ms < 1) return `${ms.toFixed(3)}ms`;
  if (ms < 1000) return `${ms.toFixed(2)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}
