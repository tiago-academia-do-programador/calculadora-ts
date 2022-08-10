import { Calculo } from "./calculo.type.js";

export class Calculadora {
  historicoOperacoes: string[];

  constructor() {
    this.historicoOperacoes = [];
  }

  calcular(calculo: Calculo): number {
    let resultado: number = 0;

    if (calculo.operador === "/" && calculo.segundoNumero === 0)
      return 0;

    switch (calculo.operador) {
      case "+": resultado = calculo.primeiroNumero + calculo.segundoNumero; break;
      case "-": resultado = calculo.primeiroNumero - calculo.segundoNumero; break;
      case "*": resultado = calculo.primeiroNumero * calculo.segundoNumero; break;
      case "/": resultado = calculo.primeiroNumero / calculo.segundoNumero; break;
    }

    // 2 + 2 = 4
    const operacao: string
      = `${calculo.primeiroNumero} ${calculo.operador} ${calculo.segundoNumero} = ${resultado}`;

    this.historicoOperacoes.push(operacao);

    return resultado;
  }

} 