import { Calculadora } from "./calculadora.js";
import { Calculo } from "./calculo.type.js";

// Data Binding
const txtPrimeiroNumero = document.getElementById("primeiroNumero") as HTMLInputElement;
const txtSegundoNumero = document.getElementById("segundoNumero") as HTMLInputElement;
const selectOperador = document.getElementById("operador") as HTMLSelectElement;

const btnCalcular = document.getElementById("btnCalcular") as HTMLButtonElement;
const txtResultado = document.getElementById("txtResultado") as HTMLHeadingElement;
const divHistorico = document.getElementById("historico") as HTMLDivElement;

const calculadora = new Calculadora();

// instanciando classe
function calcular(): void {

  const calculo: Calculo = {
    primeiroNumero: Number(txtPrimeiroNumero.value),
    segundoNumero: Number(txtSegundoNumero.value),
    operador: selectOperador.options[selectOperador.selectedIndex].value
  }

  const resultado = calculadora.calcular(calculo);

  if (calculadora.historicoOperacoes.length === 0) {
    divHistorico.style.display = "none";
  } else {
    limparOperacoes();
    exibirHistorico();
  }

  txtResultado.innerText = "O resultado é: " + resultado;
}

function exibirHistorico() {
  divHistorico.style.display = "flex";

  calculadora.historicoOperacoes.forEach((operacao: string) => {
    const txtOperacao = document.createElement("h3") as HTMLHeadingElement;

    txtOperacao.className = "card-historico";
    txtOperacao.innerText = operacao;

    divHistorico.appendChild(txtOperacao);
  });
}

function limparOperacoes() {
  while (divHistorico.firstChild) {
    divHistorico.removeChild(divHistorico.firstChild);
  }
}

btnCalcular.addEventListener("click", calcular);