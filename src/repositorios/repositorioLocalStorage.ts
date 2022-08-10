import { IRepositorio } from "../interfaces/IRepositorio.js";

export class RepositorioLocalStorage implements IRepositorio {
  private readonly localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  inserir(dados: any): void {
    const jsonString = JSON.stringify(dados);

    this.localStorage.setItem("historico", jsonString)
  }

  selecionarTodos(): string[] {
    const dados = this.localStorage.getItem("historico");

    if (!dados)
      return [];

    return JSON.parse(dados);
  }

  excluir(): void {
    this.localStorage.removeItem("historico");
  }
}