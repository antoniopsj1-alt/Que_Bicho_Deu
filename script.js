
/* =========================================================================
   1. DADOS: TABELA DE ANIMAIS DO JOGO DO BICHO
   Cada grupo cobre 4 dezenas (01 a 100). O animal é definido pelos dois
   últimos dígitos do número sorteado (a "dezena").
   ========================================================================= */
// O campo "arquivo" reproduz EXATAMENTE o nome do arquivo de imagem fornecido,
// incluindo o intervalo de dezenas no início do nome (ex: "01-04 AVESTRUZ.png").
const GRUPOS = [
  { id: 1,  nome: "Avestruz", min: 1,  max: 4,   arquivo: "01-04 AVESTRUZ.png"  },
  { id: 2,  nome: "Águia",    min: 5,  max: 8,   arquivo: "05-08 AGUIA.png"     },
  { id: 3,  nome: "Burro",    min: 9,  max: 12,  arquivo: "09-12 BURRO.png"     },
  { id: 4,  nome: "Borboleta",min: 13, max: 16,  arquivo: "13-16 BORBOLETA.png"},
  { id: 5,  nome: "Cachorro", min: 17, max: 20,  arquivo: "17-20 CACHORRO.png" },
  { id: 6,  nome: "Cabra",    min: 21, max: 24,  arquivo: "21-24 CABRA.png"    },
  { id: 7,  nome: "Carneiro", min: 25, max: 28,  arquivo: "25-28 CARNEIRO.png"},
  { id: 8,  nome: "Camelo",   min: 29, max: 32,  arquivo: "29-32 CAMELO.png"  },
  { id: 9,  nome: "Cobra",    min: 33, max: 36,  arquivo: "33-36 COBRA.png"   },
  { id: 10, nome: "Coelho",   min: 37, max: 40,  arquivo: "37-40 COELHO.png"  },
  { id: 11, nome: "Cavalo",   min: 41, max: 44,  arquivo: "41-44 CAVALO.png"  },
  { id: 12, nome: "Elefante", min: 45, max: 48,  arquivo: "45-48 ELEFANTE.png"},
  { id: 13, nome: "Galo",     min: 49, max: 52,  arquivo: "49-52 GALO.png"    },
  { id: 14, nome: "Gato",     min: 53, max: 56,  arquivo: "53-56 GATO.png"    },
  { id: 15, nome: "Jacaré",   min: 57, max: 60,  arquivo: "57-60 JACARE.png"  },
  { id: 16, nome: "Leão",     min: 61, max: 64,  arquivo: "61-64 LEAO.png"    },
  { id: 17, nome: "Macaco",   min: 65, max: 68,  arquivo: "65-68 MACACO.png"  },
  { id: 18, nome: "Porco",    min: 69, max: 72,  arquivo: "69-72 PORCO.png"   },
  { id: 19, nome: "Pavão",    min: 73, max: 76,  arquivo: "73-76 PAVAO.png"   },
  { id: 20, nome: "Peru",     min: 77, max: 80,  arquivo: "77-80 PERU.png"    },
  { id: 21, nome: "Touro",    min: 81, max: 84,  arquivo: "81-84 TOURO.png"   },
  { id: 22, nome: "Tigre",    min: 85, max: 88,  arquivo: "85-88 TIGRE.png"   },
  { id: 23, nome: "Urso",     min: 89, max: 92,  arquivo: "89-92 URSO.png"    },
  { id: 24, nome: "Veado",    min: 93, max: 96,  arquivo: "93-96 VEADO.png"   },
  { id: 25, nome: "Vaca",     min: 97, max: 100, arquivo: "97-00 VACA.png"    }
];

// Retorna o grupo/animal a partir dos dois últimos dígitos do número sorteado
function getAnimalPorNumero(numero4digitos){
  let dezena = parseInt(numero4digitos, 10) % 100;
  if (dezena === 0) dezena = 100;
  return GRUPOS.find(g => dezena >= g.min && dezena <= g.max);
}

// 👉 Coloque as 25 imagens (150x150px) dentro de assets/animais/, usando
// de preferência os nomes de arquivo listados no array GRUPOS (ex: AVESTRUZ.png).
// Para evitar que uma diferença de maiúscula/minúscula ou acento quebre a
// imagem (muito comum ao mover arquivos entre Windows e um servidor Linux,
// que é case-sensitive), o app tenta automaticamente algumas variações do
// nome antes de cair no ícone padrão.
function gerarCandidatosImagem(arquivo){
  const semAcento = arquivo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const candidatos = [...new Set([
    arquivo,
    semAcento,
    arquivo.toLowerCase(),
    semAcento.toLowerCase()
  ])];
  return candidatos.map(nome => `assets/animais/${nome}`);
}

// Aplica a imagem no <img>, tentando cada candidato em sequência.
// Se todos falharem, substitui pelo ícone padrão (iconeAnimalPadrao).
function configurarImagemAnimal(img, grupo){
  const candidatos = gerarCandidatosImagem(grupo.arquivo);
  let indice = 0;

  function tentarProximoCandidato(){
    if (indice >= candidatos.length){
      img.removeEventListener("error", tentarProximoCandidato);
      console.warn(
        `[Bicho Certo] Imagem de "${grupo.nome}" não encontrada. Caminhos tentados:`,
        candidatos
      );
      img.replaceWith(iconeAnimalPadrao());
      return;
    }
    img.src = candidatos[indice];
    indice++;
  }

  img.addEventListener("error", tentarProximoCandidato);
  tentarProximoCandidato(); // dispara a primeira tentativa
}

/* =========================================================================
   2. DADOS: RESULTADOS DOS SORTEIOS
   Substitua estes valores pelos números reais vindos da sua API/banco de
   dados. A estrutura deve ser mantida para não quebrar a renderização.
   ========================================================================= */
// Dados reais da Loteria Federal (fonte: Caixa Econômica Federal).
// A "milhar" usada para determinar o bicho é formada pelos 4 últimos
// dígitos do número do bilhete sorteado em cada prêmio.
const RESULTADOS = {
  atual: {
    concurso: 6100,
    data: "13/09/2026",
    diaSemana: "domingo",
    premios: ["0028", "3895", "5292", "9375", "5594"]
  },
  passado: {
    concurso: 6099,
    data: "09/09/2026",
    diaSemana: "quarta-feira",
    premios: ["4423", "3481", "7422", "7068", "7566"]
  }
};

const ORDINAIS = ["1º", "2º", "3º", "4º", "5º"];

/* =========================================================================
   2b. BUSCA AO VIVO NA API DA LOTERIA FEDERAL (CAIXA)
   IMPORTANTE — leia antes de confiar cegamente nisto:
   Este endpoint (servicebus2.caixa.gov.br) é o mesmo usado pelo site oficial,
   mas não foi feito para ser chamado diretamente do navegador de terceiros.
   Ele pode não enviar o cabeçalho "Access-Control-Allow-Origin", e nesse
   caso o navegador BLOQUEIA a resposta por política de CORS — especialmente
   ao abrir o HTML direto do disco (file://). Por isso todo o código abaixo
   tem um "catch": se a busca ao vivo falhar, o app automaticamente volta a
   usar os dados fixos em RESULTADOS (os últimos valores reais conhecidos),
   e mostra isso claramente para o usuário — nunca finge que é "ao vivo"
   quando na verdade é o exemplo salvo.
   Se o bloqueio de CORS acontecer no seu navegador, a solução definitiva é
   buscar esses dados a partir de um pequeno backend/proxy seu (Node, PHP,
   Python, uma função serverless etc.), que então é consumido pelo app.
   ========================================================================= */

let fonteDosDados = "offline"; // "ao-vivo" | "offline" — usado no indicador de status

const DIAS_SEMANA_PT = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

function diaDaSemanaPorData(dataBr){
  // dataBr no formato "DD/MM/AAAA", como vem da API da Caixa
  const [dia, mes, ano] = dataBr.split("/").map(Number);
  const data = new Date(ano, mes - 1, dia);
  return DIAS_SEMANA_PT[data.getDay()];
}

// Busca um concurso específico da Federal (ou o mais recente, se "numero" for omitido)
async function buscarConcursoFederal(numero){
  const url = numero
    ? `https://servicebus2.caixa.gov.br/portaldeloterias/api/federal/${numero}`
    : `https://servicebus2.caixa.gov.br/portaldeloterias/api/federal`;

  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error(`API respondeu com status ${resposta.status}`);
  return resposta.json();
}

// Converte o JSON da Caixa para o mesmo formato usado em RESULTADOS
function converterConcursoApi(json){
  return {
    concurso: json.numero,
    data: json.dataApuracao,
    diaSemana: diaDaSemanaPorData(json.dataApuracao),
    // a milhar do jogo do bicho são os 4 últimos dígitos do bilhete sorteado
    premios: json.listaDezenas.map(bilhete => bilhete.slice(-4))
  };
}

// Tenta atualizar RESULTADOS.atual e RESULTADOS.passado com dados reais e
// recentes. Se falhar por qualquer motivo (CORS, sem internet, API fora do
// ar), mantém os dados fixos que já estão no código como reserva.
async function carregarResultadosAoVivo(){
  try {
    const concursoAtual = await buscarConcursoFederal(); // sem número = último concurso
    const concursoPassado = await buscarConcursoFederal(concursoAtual.numeroConcursoAnterior);

    RESULTADOS.atual = converterConcursoApi(concursoAtual);
    RESULTADOS.passado = converterConcursoApi(concursoPassado);
    fonteDosDados = "ao-vivo";
  } catch (erro){
    console.warn(
      "[Bicho Certo] Não foi possível buscar os resultados ao vivo da Loteria Federal (provável bloqueio de CORS ao abrir o arquivo localmente). Usando os dados de exemplo salvos no código.",
      erro
    );
    fonteDosDados = "offline";
  }

  atualizarIndicadorDeFonte();
  // se a tela de resultados já estiver aberta, re-renderiza com os dados atualizados
  if (screenResults.classList.contains("active")) renderizarResultado(abaAtiva);
}

function atualizarIndicadorDeFonte(){
  const indicador = document.getElementById("fonte-dados");
  if (!indicador) return;
  if (fonteDosDados === "ao-vivo"){
    indicador.textContent = "🟢 Dados ao vivo da Loteria Federal";
  } else {
    indicador.textContent = "🟡 Sem conexão com a Loteria Federal — exibindo o último resultado salvo";
  }
}

/* =========================================================================
   3. ÁUDIO DE FUNDO
   ========================================================================= */
const bgAudio = document.getElementById("bg-audio");
bgAudio.volume = 0.1;
let audioLigadoPeloUsuario = true; // controla o botão de mudo

// Avisa no console se o arquivo de música não for encontrado ou não puder
// ser reproduzido (caminho errado, formato inválido, etc.)
bgAudio.addEventListener("error", () => {
  console.warn(
    `[Bicho Certo] Não foi possível carregar a música de fundo em "${bgAudio.currentSrc || bgAudio.src}". Verifique se o arquivo existe nesse caminho.`
  );
});

function tocarMusicaFundo(){
  if (!audioLigadoPeloUsuario) return;
  // play() pode falhar se o navegador bloquear autoplay — como isso ocorre
  // dentro de um clique do usuário, normalmente é permitido.
  bgAudio.play().catch(() => {
    console.warn("Não foi possível iniciar a música de fundo automaticamente.");
  });
}

function pausarMusicaFundo(){
  bgAudio.pause();
}

/* =========================================================================
   4. NAVEGAÇÃO ENTRE TELAS
   ========================================================================= */
const screenHome = document.getElementById("screen-home");
const screenResults = document.getElementById("screen-results");
const tabIndicator = document.getElementById("tab-indicator");
const tabButtons = document.querySelectorAll(".tab-btn");

let abaAtiva = "atual";

function abrirResultados(modoInicial){
  abaAtiva = modoInicial;
  atualizarAbasVisual();
  renderizarResultado(abaAtiva);

  screenHome.classList.remove("active");
  screenResults.classList.add("active");

  tocarMusicaFundo();
}

function voltarParaHome(){
  screenResults.classList.remove("active");
  screenHome.classList.add("active");
  pararLeituraDeVoz();
  pausarMusicaFundo();
}

function atualizarAbasVisual(){
  tabButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === abaAtiva));
  tabIndicator.style.transform = abaAtiva === "atual" ? "translateX(0%)" : "translateX(100%)";
}

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    abaAtiva = btn.dataset.tab;
    atualizarAbasVisual();
    renderizarResultado(abaAtiva);
    // a música de fundo continua tocando normalmente entre as abas
  });
});

document.getElementById("btn-back").addEventListener("click", voltarParaHome);

/* =========================================================================
   5. RENDERIZAÇÃO DOS RESULTADOS
   ========================================================================= */
const metaConcurso = document.getElementById("meta-concurso");
const metaData = document.getElementById("meta-data");
const metaDia = document.getElementById("meta-dia");
const drawSubtitle = document.getElementById("draw-subtitle");
const prizeList = document.getElementById("prize-list");

function renderizarResultado(modo){
  const sorteio = RESULTADOS[modo];

  drawSubtitle.textContent = modo === "atual" ? "Extração Federal · Sorteio de hoje" : "Extração Federal · Sorteio anterior";
  metaConcurso.textContent = `Nº ${sorteio.concurso}`;
  metaData.textContent = sorteio.data;
  metaDia.textContent = sorteio.diaSemana;

  prizeList.innerHTML = sorteio.premios.map((numero, index) => {
    const ordem = index + 1;
    const animal = getAnimalPorNumero(numero);
    const ehCabeca = ordem === 1;

    return `
      <div class="prize-card p-4 flex items-center gap-4 ${ehCabeca ? "is-head" : ""}">
        <div class="animal-avatar" data-grupo-id="${animal.id}">
          <img alt="${animal.nome}">
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <p class="text-lg font-bold">${ORDINAIS[index]} Prêmio</p>
            ${ehCabeca ? '<span class="head-badge">CABEÇA</span>' : ""}
          </div>
          <p class="num-mono" style="font-size:48px; font-weight:900; line-height:1.1; color:#FFFFFF; text-shadow: 0 0 12px rgba(125,227,255,.45);">${numero} - ${animal.nome}</p>
        </div>
        <button
          class="speak-btn"
          aria-label="Ouvir o ${ORDINAIS[index]} prêmio em voz alta"
          data-ordem="${ORDINAIS[index]}"
          data-numero="${numero}"
          data-animal="${animal.nome}"
          data-dia="${sorteio.diaSemana}">
          <svg viewBox="0 0 24 24" fill="none" class="w-4.5 h-4.5"><path d="M4 9v6h4l5 4V5L8 9H4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M16.5 9a4.5 4.5 0 0 1 0 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </div>
    `;
  }).join("");

  // liga os botões de acessibilidade recém-criados
  prizeList.querySelectorAll(".speak-btn").forEach(btn => {
    btn.addEventListener("click", () => lerPremioEmVoz(btn));
  });

  // configura a imagem (com fallback) de cada animal recém-renderizado
  prizeList.querySelectorAll(".animal-avatar").forEach(wrapper => {
    const grupoId = Number(wrapper.dataset.grupoId);
    const grupo = GRUPOS.find(g => g.id === grupoId);
    const img = wrapper.querySelector("img");
    if (grupo && img) configurarImagemAnimal(img, grupo);
  });
}

// Ícone padrão exibido quando a imagem local do animal ainda não existe
function iconeAnimalPadrao(){
  const span = document.createElement("span");
  span.className = "w-full h-full flex items-center justify-center";
  span.style.color = "var(--gold)";
  span.innerHTML = `<svg viewBox="0 0 24 24" fill="none" class="w-6 h-6"><path d="M12 21c-4-3-8-6-8-10a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4-4 7-8 10Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  return span;
}

/* =========================================================================
   6. LEITURA EM VOZ ALTA (Web Speech API)
   Ao ler um prêmio: pausa a música de fundo, fala o texto com um tom mais
   grave/pausado (estilo "locutor") e retoma a música ao final.
   ========================================================================= */
let vozPtBR = null;

// Carrega as vozes disponíveis (em alguns navegadores isso é assíncrono)
function carregarVozes(){
  const vozes = window.speechSynthesis.getVoices();
  vozPtBR =
    vozes.find(v => v.lang === "pt-BR" && /male|masculin/i.test(v.name)) ||
    vozes.find(v => v.lang === "pt-BR") ||
    vozes.find(v => v.lang.startsWith("pt")) ||
    null;
}
carregarVozes();
if ("speechSynthesis" in window){
  window.speechSynthesis.onvoiceschanged = carregarVozes;
}

function pararLeituraDeVoz(){
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  document.querySelectorAll(".speak-btn.is-speaking").forEach(b => b.classList.remove("is-speaking"));
}

function lerPremioEmVoz(botao){
  if (!("speechSynthesis" in window)){
    alert("Seu navegador não suporta leitura em voz alta.");
    return;
  }

  const { ordem, numero, animal, dia } = botao.dataset;
  const texto = `${dia}, ${ordem} prêmio, número ${numero.split("").join(" ")}, bicho ${animal}`;

  // cancela qualquer leitura em andamento antes de iniciar uma nova
  window.speechSynthesis.cancel();
  document.querySelectorAll(".speak-btn.is-speaking").forEach(b => b.classList.remove("is-speaking"));

  const wasPlaying = !bgAudio.paused;
  pausarMusicaFundo();

  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "pt-BR";
  if (vozPtBR) utterance.voice = vozPtBR;
  utterance.rate = 0.92;   // levemente mais pausado, estilo locutor
  utterance.pitch = 0.85;  // tom mais grave

  botao.classList.add("is-speaking");

  utterance.onend = () => {
    botao.classList.remove("is-speaking");
    if (wasPlaying) tocarMusicaFundo();
  };
  utterance.onerror = () => {
    botao.classList.remove("is-speaking");
    if (wasPlaying) tocarMusicaFundo();
  };

  window.speechSynthesis.speak(utterance);
}

/* =========================================================================
   7. CONTROLE DE MUDO DA MÚSICA DE FUNDO
   ========================================================================= */
const btnMute = document.getElementById("btn-mute");
const iconSoundOn = document.getElementById("icon-sound-on");
const iconSoundOff = document.getElementById("icon-sound-off");

btnMute.addEventListener("click", () => {
  audioLigadoPeloUsuario = !audioLigadoPeloUsuario;
  btnMute.classList.toggle("is-muted", !audioLigadoPeloUsuario);
  btnMute.setAttribute("aria-pressed", String(!audioLigadoPeloUsuario));
  iconSoundOn.classList.toggle("hidden", !audioLigadoPeloUsuario);
  iconSoundOff.classList.toggle("hidden", audioLigadoPeloUsuario);

  if (audioLigadoPeloUsuario) tocarMusicaFundo();
  else pausarMusicaFundo();
});

/* =========================================================================
   8. BOTÕES DA HOME (com efeito ripple)
   ========================================================================= */
function criarRipple(event, botao){
  const rect = botao.getBoundingClientRect();
  const ripple = document.createElement("span");
  const tamanho = Math.max(rect.width, rect.height);
  const x = (event.clientX ?? rect.left + rect.width / 2) - rect.left - tamanho / 2;
  const y = (event.clientY ?? rect.top + rect.height / 2) - rect.top - tamanho / 2;

  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = `${tamanho}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  botao.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

document.querySelectorAll(".home-btn").forEach(botao => {
  botao.addEventListener("click", (event) => {
    criarRipple(event, botao);
    abrirResultados(botao.dataset.mode);
  });
});

/* =========================================================================
   9. INICIALIZAÇÃO
   Busca os resultados ao vivo assim que a página carrega. Se o usuário
   já clicar em um dos botões antes da resposta chegar, os dados de exemplo
   (os últimos valores reais salvos no código) aparecem normalmente — e a
   tela se atualiza sozinha assim que a busca terminar, com ou sem sucesso.
   ========================================================================= */
carregarResultadosAoVivo();

