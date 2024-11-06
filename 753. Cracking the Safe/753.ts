function crackSafe(n: number, k: number): string {
  // Se k for 1, a única sequência possível é composta por '0' repetido n vezes
  if (k === 1) {
    return '0'.repeat(n);
  }

  // Função para gerar a sequência de De Bruijn
  function deBruijn(k: number, n: number): number[] {
    const a: number[] = new Array(k * n).fill(0);
    const sequence: number[] = [];

    function db(t: number, p: number): void {
      if (t > n) {
        if (n % p === 0) {
          for (let j = 1; j <= p; j++) {
            sequence.push(a[j]);
          }
        }
      } else {
        a[t] = a[t - p];
        db(t + 1, p);
        for (let j = a[t - p] + 1; j < k; j++) {
          a[t] = j;
          db(t + 1, t);
        }
      }
    }

    db(1, 1);
    return sequence;
  }

  // Gerar a sequência De Bruijn para os parâmetros k e n
  const sequence = deBruijn(k, n);

  // Concatenar os primeiros n-1 dígitos para fazer a sequência não cíclica
  return sequence.join('') + sequence.slice(0, n - 1).join('');
}