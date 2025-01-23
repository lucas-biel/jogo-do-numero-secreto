let listaDeNumerosSorteados = [];
let qtdNumSorteados = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let mensagemDeAcerto;
let palavraTentativa;
let chute;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // if ('speechSynthesis' in window) {
    //     let utterance = new SpeechSynthesisUtterance(texto);
    //     utterance.lang = 'pt-BR';
    //     utterance.rate = 1.4;
    //     window.speechSynthesis.speak(utterance);
    // } else {
    //     console.log('Web Speech API não suportada neste navegador.');
    // }
    
    // não está funcionando, verificar depois
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);

        palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        mensagemDeAcerto = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

        exibirTextoNaTela('h1', 'Acertou');
        exibirTextoNaTela('p', mensagemDeAcerto);
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é menor');
        tentativas++;
        limparCampo();
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior');
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * qtdNumSorteados + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == qtdNumSorteados) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}
