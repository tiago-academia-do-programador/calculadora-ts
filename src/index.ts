import { Calculadora } from "./calculadora.js";
import { Calculo } from "./calculo.type.js";
import { RepositorioLocalStorage } from "./repositorios/repositorioLocalStorage.js";

// Data Binding
const txtPrimeiroNumero = document.getElementById("primeiroNumero") as HTMLInputElement;
const txtSegundoNumero = document.getElementById("segundoNumero") as HTMLInputElement;
const selectOperador = document.getElementById("operador") as HTMLSelectElement;

const btnCalcular = document.getElementById("btnCalcular") as HTMLButtonElement;
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
const txtResultado = document.getElementById("txtResultado") as HTMLHeadingElement;
const divHistorico = document.getElementById("historico") as HTMLDivElement;

const calculadora = new Calculadora();
const repositorioLocalStorage = new RepositorioLocalStorage();

atualizarHistorico();

// instanciando classe
function calcular(): void {

  const calculo: Calculo = {
    primeiroNumero: Number(txtPrimeiroNumero.value),
    segundoNumero: Number(txtSegundoNumero.value),
    operador: selectOperador.options[selectOperador.selectedIndex].value
  }

  const resultado = calculadora.calcular(calculo);

  repositorioLocalStorage.inserir(calculadora.historicoOperacoes);

  atualizarHistorico();

  txtResultado.innerText = "O resultado é: " + resultado;
}

function preencherHistorico(operacao: string) {
  const txtOperacao = document.createElement("h5") as HTMLHeadingElement;

  txtOperacao.className = "alert alert-primary";
  txtOperacao.innerText = operacao;

  divHistorico.appendChild(txtOperacao);
}

function atualizarHistorico() {
  limparOperacoes();

  calculadora.historicoOperacoes = repositorioLocalStorage.selecionarTodos();

  if (calculadora.historicoOperacoes.length > 0)
    divHistorico.classList.remove("d-none");

  calculadora.historicoOperacoes.forEach((operacao: string) => {
    preencherHistorico(operacao);
  });
}

function limparOperacoes() {
  while (divHistorico.firstChild) {
    divHistorico.removeChild(divHistorico.firstChild);
  }

  divHistorico.classList.add("d-none");
}

btnCalcular.addEventListener("click", calcular);

btnLimpar.addEventListener("click", () => {
  repositorioLocalStorage.excluir();

  atualizarHistorico();
})