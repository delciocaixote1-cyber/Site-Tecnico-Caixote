<!DOCTYPE html>
<html lang="pt">
<head>
 <link rel="manifest" href="manifest.json">

<meta name="theme-color" content="#1769aa">

<meta name="mobile-web-app-capable" content="yes">

<meta name="apple-mobile-web-app-capable" content="yes"> 
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caixote Runner</title>

<style>
* {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    margin: 0;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    background: #101522;
    color: white;
    text-align: center;
    overflow-x: hidden;
}

/* ================= TELA INICIAL ================= */

#inicio {
    position: fixed;
    inset: 0;
    min-height: 100vh;
    background: linear-gradient(180deg, #17233b, #101522);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 9999;
}

#inicio h1 {
    font-size: clamp(34px, 9vw, 60px);
    margin: 0 0 15px;
}

#inicio p {
    font-size: 18px;
    line-height: 1.6;
    max-width: 500px;
    margin-bottom: 25px;
}

#botaoJogar {
    padding: 16px 45px;
    border: 0;
    border-radius: 12px;
    background: #1769aa;
    color: white;
    font-size: 21px;
    font-weight: bold;
}

#recordeInicial {
    margin-top: 25px;
    font-size: 18px;
}

/* ================= JOGO ================= */

#areaJogo {
    display: none;
    width: 100%;
    max-width: 900px;
    margin: auto;
    padding: 10px;
}

#tituloJogo {
    margin: 8px 0;
}

#pontuacao {
    min-height: 30px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
}

/* ================= CAMPO ================= */

#jogo {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    border: 4px solid #222;
    border-radius: 12px;

    background:
        linear-gradient(
            #69c8ff 0%,
            #dff6ff 68%,
            #8ed081 68%,
            #5a9e4b 100%
        );

    touch-action: manipulation;
}

/* ================= NUVENS ================= */

.nuvem {
    position: absolute;
    width: 90px;
    height: 30px;
    background: white;
    border-radius: 30px;
    opacity: .8;
}

.nuvem::before,
.nuvem::after {
    content: "";
    position: absolute;
    background: white;
    border-radius: 50%;
}

.nuvem::before {
    width: 35px;
    height: 35px;
    left: 15px;
    top: -15px;
}

.nuvem::after {
    width: 45px;
    height: 45px;
    right: 10px;
    top: -22px;
}

.nuvem1 {
    top: 50px;
    left: 15%;
}

.nuvem2 {
    top: 100px;
    left: 65%;
    transform: scale(.7);
}

/* ================= PERSONAGEM ================= */

#personagem {
    position: absolute;
    left: 70px;
    bottom: 10px;
    width: 50px;
    height: 60px;
    background: #1769aa;
    border: 3px solid #0b416d;
    border-radius: 10px;
    z-index: 10;
}

#personagem::before {
    content: "";
    position: absolute;
    width: 7px;
    height: 7px;
    background: white;
    border-radius: 50%;
    top: 12px;
    left: 10px;
    box-shadow: 20px 0 0 white;
}

/* ================= SALTO ================= */

.pular {
    animation: pulo 1.5s ease-out;
}

@keyframes pulo {
    0% {
        bottom: 10px;
    }

    50% {
        bottom: 180px;
    }

    100% {
        bottom: 10px;
    }
}

/* ================= OBSTÁCULO ================= */

#obstaculo {
    position: absolute;
    left: 100%;
    bottom: 10px;
    width: 40px;
    height: 50px;
    background: #e63946;
    border: 3px solid #a51d29;
    border-radius: 7px;
    z-index: 8;
}

/* ================= MOEDA ================= */

#moeda {
    position: absolute;
    left: 550px;
    bottom: 130px;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: gold;
    border: 4px solid #d89b00;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 23px;
    font-weight: bold;
    z-index: 9;
}

/* ================= CONTROLES ================= */

#controles {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

.controle {
    padding: 14px 25px;
    border: 0;
    border-radius: 12px;
    background: #1769aa;
    color: white;
    font-size: 17px;
    font-weight: bold;
}

#botaoPausa {
    background: #444;
}

/* ================= PAUSA ================= */

#pausa,
#mensagem {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,.78);
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

#pausa h2,
#mensagem h2 {
    font-size: 34px;
    margin: 10px;
}

#botaoReiniciar {
    padding: 13px 30px;
    border: 0;
    border-radius: 10px;
    font-size: 17px;
    font-weight: bold;
}

/* ================= CELULAR ================= */

@media (max-width: 600px) {

    #jogo {
        height: 330px;
    }

    #personagem {
        left: 45px;
    }

    #controles {
        flex-wrap: wrap;
    }

    .controle {
        padding: 14px 20px;
    }
}
</style>
</head> 
<script>
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}
</script>
<body>

<!-- ================= TELA INICIAL ================= -->

<div id="inicio">

    <h1>🎮 CAIXOTE RUNNER</h1>

    <p>
        🪙 Colete moedas<br>
        🧱 Salte sobre os obstáculos<br>
        ❤️ Não perca todas as vidas!
    </p>

    <button id="botaoJogar" onclick="iniciarJogo()">
        ▶️ JOGAR
    </button>

    <div id="recordeInicial">
        🏅 Recorde: 0
    </div>

</div>


<!-- ================= ÁREA DO JOGO ================= -->

<div id="areaJogo">

    <h1 id="tituloJogo">🎮 Caixote Runner</h1>

    <div id="pontuacao">
        🏆 Pontos: 0 |
        🪙 Moedas: 0 |
        ❤️ Vidas: 3 |
        📈 Nível: 1
    </div>

    <div id="jogo">

        <div class="nuvem nuvem1"></div>
        <div class="nuvem nuvem2"></div>

        <div id="personagem"></div>

        <div id="obstaculo"></div>

        <div id="moeda">★</div>

        <!-- PAUSA -->

        <div id="pausa">

            <h2>⏸️ PAUSADO</h2>

            <button class="controle" onclick="continuarJogo()">
                ▶️ CONTINUAR
            </button>

        </div>

        <!-- GAME OVER -->

        <div id="mensagem">

            <h2>💥 GAME OVER</h2>

            <p id="resultado"></p>

            <button id="botaoReiniciar"
                    onclick="reiniciar()">
                🔄 JOGAR NOVAMENTE
            </button>

        </div>

    </div>


    <div id="controles">

        <button class="controle" onclick="pular()">
            🦘 SALTAR
        </button>

        <button id="botaoPausa"
                class="controle"
                onclick="pausarJogo()">
            ⏸️ PAUSAR
        </button>

    </div>

</div>


<script>

/* ================= ELEMENTOS ================= */

const personagem =
    document.getElementById("personagem");

const obstaculo =
    document.getElementById("obstaculo");

const moeda =
    document.getElementById("moeda");

const pontuacao =
    document.getElementById("pontuacao");

const mensagem =
    document.getElementById("mensagem");

const resultado =
    document.getElementById("resultado");

const pausa =
    document.getElementById("pausa");

const areaJogo =
    document.getElementById("areaJogo");

const inicio =
    document.getElementById("inicio");

const recordeInicial =
    document.getElementById("recordeInicial");


/* ================= VARIÁVEIS ================= */

let pontos = 0;
let moedas = 0;
let vidas = 3;

let nivel = 1;

let velocidade = 2;

let jogoAtivo = false;
let jogoPausado = false;

let ultimoDano = 0;


/* ================= RECORDE ================= */

let recorde =
    Number(localStorage.getItem("caixoteRecorde")) || 0;

recordeInicial.innerText =
    "🏅 Recorde: " + recorde;


/* ================= SOM ================= */

let audioContext = null;


function iniciarAudio() {

    if (!audioContext) {

        audioContext =
            new (window.AudioContext ||
                 window.webkitAudioContext)();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}


function tocarSom(frequencia, duracao) {

    try {

        iniciarAudio();

        const oscilador =
            audioContext.createOscillator();

        const ganho =
            audioContext.createGain();

        oscilador.connect(ganho);
        ganho.connect(audioContext.destination);

        oscilador.type = "square";

        oscilador.frequency.value =
            frequencia;

        ganho.gain.setValueAtTime(
            0.06,
            audioContext.currentTime
        );

        ganho.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + duracao
        );

        oscilador.start();

        oscilador.stop(
            audioContext.currentTime + duracao
        );

    } catch (erro) {

        console.log("Áudio não disponível.");

    }
}


/* ================= PLACAR ================= */

function atualizarPlacar() {

    pontuacao.innerText =
        "🏆 Pontos: " + pontos +
        " | 🪙 Moedas: " + moedas +
        " | ❤️ Vidas: " + vidas +
        " | 📈 Nível: " + nivel;
}


/* ================= INICIAR ================= */

function iniciarJogo() {

    iniciarAudio();

    inicio.style.display = "none";

    areaJogo.style.display = "block";

    pontos = 0;
    moedas = 0;
    vidas = 3;

    nivel = 1;

    velocidade = 2;

    jogoAtivo = true;
    jogoPausado = false;

    ultimoDano = 0;

    atualizarPlacar();

    obstaculo.style.left = "100%";

    moeda.style.left = "550px";

    mensagem.style.display = "none";

    pausa.style.display = "none";
}


/* ================= SALTO ================= */

function pular() {

    if (!jogoAtivo) return;

    if (jogoPausado) return;

    iniciarAudio();

    if (!personagem.classList.contains("pular")) {

        personagem.classList.add("pular");

        tocarSom(600, 0.12);

        setTimeout(function() {

            personagem.classList.remove("pular");

        }, 1500);
    }
}


/* ================= TECLADO ================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.code === "Space") {

            event.preventDefault();

            pular();
        }

        if (event.code === "Escape") {

            if (jogoAtivo) {
                pausarJogo();
            }
        }
    }
);


/* ================= OBSTÁCULO ================= */

function moverObstaculo() {

    if (!jogoAtivo || jogoPausado) return;

    let posicao =
        obstaculo.offsetLeft;

    posicao -= velocidade;


    if (posicao < -60) {

        pontos++;

        /* A cada 5 pontos aumenta o nível */

        if (pontos % 5 === 0) {

            nivel++;

            velocidade += 0.5;

            tocarSom(800, 0.15);
        }

        posicao =
            document.getElementById("jogo")
            .offsetWidth + 100;

        atualizarPlacar();
    }

    obstaculo.style.left =
        posicao + "px";
}


/* ================= MOEDA ================= */

function moverMoeda() {

    if (!jogoAtivo || jogoPausado) return;

    let posicao =
        moeda.offsetLeft;

    posicao -= velocidade;


    if (posicao < -50) {

        posicao =
            document.getElementById("jogo")
            .offsetWidth +
            200 +
            Math.random() * 300;
    }

    moeda.style.left =
        posicao + "px";
}


/* ================= PEGAR MOEDA ================= */

function verificarMoeda() {

    if (!jogoAtivo || jogoPausado) return;

    const p =
        personagem.getBoundingClientRect();

    const m =
        moeda.getBoundingClientRect();


    if (
        p.right > m.left &&
        p.left < m.right &&
        p.bottom > m.top &&
        p.top < m.bottom
    ) {

        moedas++;

        tocarSom(1000, 0.15);

        atualizarPlacar();

        moeda.style.left =
            document.getElementById("jogo")
            .offsetWidth + 300 + "px";
    }
}


/* ================= COLISÃO ================= */

function verificarColisao() {

    if (!jogoAtivo || jogoPausado) return;

    const agora =
        Date.now();

    /* Pequeno intervalo para evitar
       várias perdas de vida seguidas */

    if (agora - ultimoDano < 1000) {
        return;
    }


    const p =
        personagem.getBoundingClientRect();

    const o =
        obstaculo.getBoundingClientRect();


    if (
        p.right > o.left &&
        p.left < o.right &&
        p.bottom > o.top &&
        p.top < o.bottom
    ) {

        ultimoDano = agora;

        vidas--;

        tocarSom(150, 0.25);

        atualizarPlacar();


        obstaculo.style.left =
            document.getElementById("jogo")
            .offsetWidth + 150 + "px";


        if (vidas <= 0) {

            terminarJogo();
        }
    }
}


/* ================= GAME OVER ================= */

function terminarJogo() {

    jogoAtivo = false;

    tocarSom(100, 0.6);


    if (pontos > recorde) {

        recorde = pontos;

        localStorage.setItem(
            "caixoteRecorde",
            recorde
        );
    }


    resultado.innerHTML =
        "🏆 Pontos: " + pontos +
        "<br>🪙 Moedas: " + moedas +
        "<br>📈 Nível: " + nivel +
        "<br>🏅 Recorde: " + recorde;


    mensagem.style.display = "flex";
}


/* ================= PAUSAR ================= */

function pausarJogo() {

    if (!jogoAtivo) return;

    jogoPausado = true;

    pausa.style.display = "flex";
}


/* ================= CONTINUAR ================= */

function continuarJogo() {

    if (!jogoAtivo) return;

    jogoPausado = false;

    pausa.style.display = "none";
}


/* ================= REINICIAR ================= */

function reiniciar() {

    pontos = 0;
    moedas = 0;
    vidas = 3;

    nivel = 1;
    velocidade = 2;

    jogoAtivo = true;
    jogoPausado = false;

    ultimoDano = 0;

    atualizarPlacar();

    obstaculo.style.left = "100%";

    moeda.style.left = "550px";

    mensagem.style.display = "none";

    pausa.style.display = "none";

    iniciarAudio();
}


/* ================= LOOP ================= */

setInterval(
    function() {

        moverObstaculo();

        moverMoeda();

        verificarColisao();

        verificarMoeda();

    },
    20
);


/* ================= ESTADO INICIAL ================= */

areaJogo.style.display = "none";

inicio.style.display = "flex";

atualizarPlacar();
if ("serviceWorker" in navigator) {

    window.addEventListener("load", function() {

        navigator.serviceWorker
            .register("sw.js")
            .then(function() {

                console.log(
                    "Caixote Runner: aplicativo pronto!"
                );

            })
            .catch(function(erro) {

                console.log(
                    "Erro ao registrar aplicativo:",
                    erro
                );

            });

    });

}
</script>
<script>
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}
</script>
</body>
</html>
