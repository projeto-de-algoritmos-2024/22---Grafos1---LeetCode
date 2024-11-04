function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  const graph: Record<string, [string, number][]> = {};

  // Construindo o grafo de forma eficiente
  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    graph[a] = graph[a] || [];
    graph[b] = graph[b] || [];
    graph[a].push([b, values[i]]);
    graph[b].push([a, 1 / values[i]]);
  }

  const memo: Record<string, Record<string, number>> = {};

  const dfs = (start: string, target: string, visited: Set<string>): number => {
    if (!graph[start] || !graph[target]) return -1;
    if (start === target) return 1;

    // Usa memoização para evitar cálculos redundantes
    if (memo[start] && memo[start][target] !== undefined)
      return memo[start][target];

    visited.add(start);

    for (const [neighbor, value] of graph[start]) {
      if (visited.has(neighbor)) continue;
      const result = dfs(neighbor, target, visited);
      if (result !== -1) {
        memo[start] = memo[start] || {};
        memo[start][target] = result * value;
        return memo[start][target];
      }
    }

    visited.delete(start);
    return -1;
  };

  // Processando consultas e usando memoização para armazenar resultados
  return queries.map(([c, d]) => {
    const visited = new Set<string>();
    return dfs(c, d, visited);
  });
}
