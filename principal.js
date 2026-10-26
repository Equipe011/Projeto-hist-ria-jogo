
import { aleatorio, nome } from './sorteio.js';
import { perguntas } from './questionario.js';

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");
const botaoIniciar = document.querySelector(".iniciar-btn");
const telaInicial = document.querySelector(".tela-inicial");

let atual = 0;
let historiaFinal = "";

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";

    telaInicial.hidden = true;
    caixaResultado.hidden = true;
    caixaPerguntas.hidden = false;
    caixaAlternativas.hidden = false;

    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.replaceChildren();

    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = alternativa.texto;

        botao.addEventListener("click", () => {
            respostaSelecionada(alternativa);
        });

        caixaAlternativas.appendChild(botao);
    }
}

function respostaSelecionada(alternativa) {
    if (Array.isArray(alternativa.afirmacao)) {
        historiaFinal += aleatorio(alternativa.afirmacao) + " ";
    }

    if (alternativa.proxima !== undefined) {
        atual = alternativa.proxima;
        mostraPergunta();
    } else {
        mostraResultado();
    }
}

function mostraResultado() {
    caixaPerguntas.textContent = `Em 2049, ${nome}`;
    caixaAlternativas.replaceChildren();

    caixaPerguntas.hidden = false;
    caixaAlternativas.hidden = true;
    caixaResultado.hidden = false;

    textoResultado.textContent = historiaFinal.trim();
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = "";

    caixaResultado.hidden = true;
    telaInicial.hidden = false;
    caixaPerguntas.hidden = true;
    caixaAlternativas.hidden = true;
}

function substituiNome() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/gi, nome);
    }
}

botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);

caixaPerguntas.hidden = true;
caixaAlternativas.hidden = true;
caixaResultado.hidden = true;

substituiNome();

console.log("principal.js carregou!");
console.log("Botão iniciar:", document.querySelector(".iniciar-btn"));
