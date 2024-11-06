function crackSafe(n: number, k: number): string {
    // Conjunto para armazenar as combinações visitadas e a sequência inicial
    const visited = new Set<string>();
    const result: string[] = [];
  
    // Define o ponto inicial da busca e marca como visitado
    const start = '0'.repeat(n - 1);
    visited.add(start);
    
    // Função DFS para explorar todas as combinações possíveis
    function dfs(node: string): void {
      for (let x = 0; x < k; x++) {
        const next = node + x.toString();
        if (!visited.has(next)) {
          visited.add(next);   // Marca o próximo nó como visitado
          dfs(next.slice(1));  // Faz a chamada recursiva para o próximo nó
          result.push(x.toString()); // Adiciona o dígito diretamente ao resultado
        }
      }
    }
  
    // Inicia a busca a partir do ponto inicial
    dfs(start);
    
    // Constrói a sequência final combinando o resultado e o ponto inicial
    return start + result.reverse().join('');
  }  