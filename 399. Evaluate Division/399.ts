function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const graph: Record<string, [string, number][]> = {};

  equations.forEach(([a, b], i) => {
      (graph[a] ??= []).push([b, values[i]]);
      (graph[b] ??= []).push([a, 1 / values[i]]);
  });

  const bfs = (start: string, target: string): number => {
      if (!graph[start] || !graph[target]) return -1;
      if (start === target) return 1;

      const queue: [string, number][] = [[start, 1]];
      const visited = new Set<string>([start]);

      while (queue.length) {
          const [current, product] = queue.shift()!;

          for (const [neighbor, value] of graph[current]) {
              if (visited.has(neighbor)) continue;
              if (neighbor === target) return product * value;

              visited.add(neighbor);
              queue.push([neighbor, product * value]);
          }
      }
      return -1;
  };

  return queries.map(([c, d]) => bfs(c, d));
}