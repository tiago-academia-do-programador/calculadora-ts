export interface IRepositorio {
  inserir(dados: any): void;
  selecionarTodos(): string[];
  excluir(): void;
}