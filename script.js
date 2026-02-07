let tabuleiro = Array(9).fill("");
let jogadorAtual = "X";
let jogoFim = false;

const celulas = document.querySelectorAll(".celula");
const jogadorAtualElement = document.getElementById("jogador-atual");
const novoJogoBtn = document.getElementById("novo-jogo");
const sairBtn = document.getElementById("sair");

const condicoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function verificarVencedor() {
    for (let condicao of condicoesVitoria) {
        const [a, b, c] = condicao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return tabuleiro[a];
        }
    }
    return null;
}

function verificarEmpate() {
    return tabuleiro.every(celula => celula !== "");
}

function atualizarTabuleiro() {
    celulas.forEach((celula, index) => {
        celula.textContent = tabuleiro[index];
        if (tabuleiro[index] === "X") {
            celula.style.color = "#667eea";
        } else if (tabuleiro[index] === "O") {
            celula.style.color = "#f44336";
        }
    });
}

function clicarCelula(event) {
    if (jogoFim) return;
    
    const celula = event.target;
    const index = celula.getAttribute("data-index");
    
    if (tabuleiro[index] !== "") {
        alert("Essa posição já foi preenchida!");
        return;
    }
    
    tabuleiro[index] = jogadorAtual;
    atualizarTabuleiro();
    
    const vencedor = verificarVencedor();
    if (vencedor) {
        setTimeout(() => {
            alert(`🎉 Jogador ${vencedor} venceu! 🎉`);
            reiniciarJogo();
        }, 100);
        jogoFim = true;
        return;
    }
    
    if (verificarEmpate()) {
        setTimeout(() => {
            alert("Empate! O jogo terminou em empate!");
            reiniciarJogo();
        }, 100);
        jogoFim = true;
        return;
    }
    
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    jogadorAtualElement.textContent = jogadorAtual;
}

function reiniciarJogo() {
    tabuleiro = Array(9).fill("");
    jogadorAtual = "X";
    jogoFim = false;
    jogadorAtualElement.textContent = jogadorAtual;
    atualizarTabuleiro();
}

function sair() {
    if (confirm("Tem certeza que deseja sair?")) {
        window.close();
    }
}

celulas.forEach(celula => celula.addEventListener("click", clicarCelula));
novoJogoBtn.addEventListener("click", reiniciarJogo);
sairBtn.addEventListener("click", sair);

atualizarTabuleiro();