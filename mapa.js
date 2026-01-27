// ======================================================
// MAPA EM TEMPO REAL - BASE (TESTE LOCAL)
// Tudo comentado para você saber ONDE mexer no futuro
// ======================================================

// ================================
// REFERÊNCIA AO MAPA NO HTML
// ================================
// Aqui pegamos a <div id="mapa"></div> do HTML
const mapa = document.getElementById("mapa");


// ================================
// CONFIGURAÇÕES GERAIS DO MAPA
// ================================
const TAMANHO_MAPA = 10;   // mapa 10x10 (fácil de mudar depois)
const RAIO_VISAO   = 5;    // até onde o jogador enxerga

// guarda qual NPC está selecionado
let alvoSelecionado = null;
// ================================
// STATUS DO JOGADOR (TEMPORÁRIO)
// ================================
const jogadorStatus = {
  ATK: 1, // alcance físico
  MAG: 3  // alcance mágico / percepção
};


// ================================
// MATRIZ DO MAPA
// 0 = chão (andável)
// 1 = parede (bloqueia movimento e visão)
// FUTURO: isso virá do BANCO ou do servidor
// ================================
const mapaDados = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,0,0,1,1,1,0],
  [0,0,0,1,0,0,0,0,1,0],
  [0,0,0,1,0,1,1,0,1,0],
  [0,1,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,0,1,1,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,0,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0],
];


// ================================
// POSIÇÃO DO JOGADOR
// FUTURO: isso vem do servidor/socket
// ================================
let posicao = {
  x: 0,
  y: 0
};


// ================================
// LISTA DE NPCs NO MAPA (TESTE)
// FUTURO: vem do banco de dados
// ================================
const npcs = [
  { id: 1, nome: "Goblin", x: 1, y: 3, hp: 20, hpMax: 20 },
  { id: 2, nome: "Orc", x: 2, y: 2, hp: 35, hpMax: 35 },
  { id: 3, nome: "Lobo", x: 1, y: 5, hp: 15, hpMax: 15 }
];




// ================================
// VERIFICA SE EXISTE PAREDE ENTRE
// JOGADOR E UMA CÉLULA (linha de visão)
// ================================
function temParedeNoCaminho(x1, y1, x2, y2) {

  let dx = Math.abs(x2 - x1);
  let dy = Math.abs(y2 - y1);

  let sx = x1 < x2 ? 1 : -1;
  let sy = y1 < y2 ? 1 : -1;

  let err = dx - dy;

  while (true) {

    // chegou ao destino
    if (x1 === x2 && y1 === y2) return false;

    // ignora a posição inicial do jogador
    if (!(x1 === posicao.x && y1 === posicao.y)) {
      if (mapaDados[y1][x1] === 1) {
        return true; // parede bloqueia visão
      }
    }

    let e2 = 2 * err;

    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }

    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
}


// ================================
// VERIFICA SE UMA CÉLULA É VISÍVEL
// ================================
function estaVisivel(x, y) {

  const dx = Math.abs(x - posicao.x);
  const dy = Math.abs(y - posicao.y);

  // fora do raio de visão
  if (dx > RAIO_VISAO || dy > RAIO_VISAO) return false;

  // parede bloqueia visão
  if (temParedeNoCaminho(posicao.x, posicao.y, x, y)) return false;

  return true;
}

// ================================
// FUNÇÃO: CALCULA DISTÂNCIA EM GRID
// ================================
function calcularDistancia(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  return Math.max(dx, dy); // distância estilo RPG tático
}
// ================================
// VERIFICA SE O NPC PODE SER ATACADO
// ================================
function podeAtacar(npc) {

  const distancia = calcularDistancia(
    posicao.x,
    posicao.y,
    npc.x,
    npc.y
  );

  // ataque corpo a corpo
  const alcanceCorpoACorpo = 1;

  // ataque mágico
  const alcanceMagico = 3;

  // aqui depois você pode ligar com classe, arma, etc
  if (distancia <= alcanceCorpoACorpo) {
    return true;
  }

  if (distancia <= alcanceMagico) {
    return true;
  }

  return false;
}
// ================================
// VERIFICA TIPO DE ATAQUE POSSÍVEL
// ================================
function tipoDeAtaque(npc) {

  const distancia = calcularDistancia(
    posicao.x,
    posicao.y,
    npc.x,
    npc.y
  );

  const alcanceFisico = 1;
  const alcanceMagico = 3;

  if (distancia <= alcanceFisico) {
    return "fisico";
  }

  if (distancia <= alcanceMagico) {
    return "magico";
  }

  return null; // fora de alcance
}
function atacar(alvo) {

  if (!alvo) return;

  const tipo = tipoDeAtaque(alvo);
  if (!tipo) {
    alert("Fora do alcance!");
    return;
  }

  // dano base (teste)
  let dano = tipo === "fisico" ? 3 : 2;

  alvo.hp -= dano;
  if (alvo.hp < 0) alvo.hp = 0;

  console.log(
    `⚔️ ${tipo.toUpperCase()} causou ${dano} de dano em ${alvo.nome}`
  );

  // morto
  if (alvo.hp === 0) {
    console.log(`☠️ ${alvo.nome} morreu`);
  }

  // atualiza painel
  document.getElementById("alvo-hp").textContent =
    `${alvo.hp} / ${alvo.hpMax}`;

  renderMapa();
}
document.getElementById("btn-atacar").addEventListener("click", () => {
  atacar(alvoSelecionado);
});
function atacarAlvo() {
  if (!alvoSelecionado) {
    alert("Nenhum alvo selecionado");
    return;
  }

  if (!podeAtacar(alvoSelecionado)) {
    alert("Alvo fora do alcance");
    return;
  }

  // dano base (depois isso vem do personagem)
  const dano = 5;

  alvoSelecionado.hp -= dano;

  if (alvoSelecionado.hp < 0) {
    alvoSelecionado.hp = 0;
  }

  // atualiza painel
  document.getElementById("alvo-hp").textContent =
    `${alvoSelecionado.hp} / ${alvoSelecionado.hpMax}`;

  // NPC morreu?
  if (alvoSelecionado.hp === 0) {
    alert(`${alvoSelecionado.nome} morreu!`);
  }

  renderMapa();
}


// ================================
// FUNÇÃO PRINCIPAL: DESENHA O MAPA
// TODA VEZ QUE ALGO MUDA
// ================================
function renderMapa() {
  
  // 1️⃣ limpa o mapa
  mapa.innerHTML = "";

  for (let y = 0; y < TAMANHO_MAPA; y++) {
    for (let x = 0; x < TAMANHO_MAPA; x++) {

      const cell = document.createElement("div");
      cell.classList.add("cell");

      const ehParede = mapaDados[y][x] === 1;
      const visivel  = estaVisivel(x, y);

      // 2️⃣ visão
      if (ehParede && visivel) cell.classList.add("parede");
      if (ehParede && !visivel) cell.classList.add("parede-escura");
      if (!ehParede && !visivel) cell.classList.add("escuro");

      // 3️⃣ jogador
      if (posicao.x === x && posicao.y === y) {
        const token = document.createElement("div");
        token.classList.add("token");
        cell.appendChild(token);
      }

      // 4️⃣ NPCs
      // 4️⃣ NPCs
npcs.forEach(npc => {
  if (npc.x === x && npc.y === y && visivel) {

    // ============================
    // CONTAINER DO NPC
    // ============================
    const npcContainer = document.createElement("div");
    npcContainer.classList.add("npc-container");

    // ============================
    // TOKEN DO NPC
    // ============================
    const npcToken = document.createElement("div");
    npcToken.classList.add("npc-token");
    npcToken.title = npc.nome;

    // 🎯 estado visual do alvo selecionado
    if (alvoSelecionado && alvoSelecionado.id === npc.id) {
      npcToken.classList.add("selecionado");

      const tipo = tipoDeAtaque(npc);

      if (tipo === "fisico") npcToken.classList.add("fisico");
      if (tipo === "magico") npcToken.classList.add("magico");
      if (!tipo) npcToken.classList.add("fora-alcance");
    }

    // 🖱️ clique no NPC
    npcToken.addEventListener("click", e => {
      e.stopPropagation();
      e.preventDefault();

      alvoSelecionado = npc;

      // UI lateral
      document.getElementById("alvo-nome").textContent = npc.nome;
      document.getElementById("alvo-hp").textContent =
        `${npc.hp} / ${npc.hpMax}`;

      const dist = calcularDistancia(
        posicao.x,
        posicao.y,
        npc.x,
        npc.y
      );

      document.getElementById("alvo-distancia").textContent = dist;

      const tipo = tipoDeAtaque(npc);

      let texto = "❌ Fora do alcance";
      if (tipo === "fisico") texto = "🗡️ Ataque físico disponível";
      if (tipo === "magico") texto = "🔮 Ataque mágico disponível";

      document.getElementById("alvo-alcance").textContent = texto;
      // barra de vida
        const hpBar = document.createElement("div");
        hpBar.classList.add("hp-bar");
            
        const hpFill = document.createElement("div");
        hpFill.classList.add("hp-fill");
            
        const percent = (npc.hp / npc.hpMax) * 100;
        hpFill.style.width = percent + "%";
            
        // cor dinâmica
        if (percent > 60) hpFill.style.background = "green";
        else if (percent > 30) hpFill.style.background = "orange";
        else hpFill.style.background = "red";
            
        hpBar.appendChild(hpFill);
        npcToken.appendChild(hpBar);

      renderMapa();
    });

    // ============================
    // BARRA DE VIDA
    // ============================
    const hpBar = document.createElement("div");
    hpBar.classList.add("hp-bar");

    const hpFill = document.createElement("div");
    hpFill.classList.add("hp-fill");

    const percent = (npc.hp / npc.hpMax) * 100;
    hpFill.style.width = percent + "%";

    // cor dinâmica
    if (percent > 60) hpFill.style.background = "#00ff00";
    else if (percent > 30) hpFill.style.background = "#ffaa00";
    else hpFill.style.background = "#ff0000";

    hpBar.appendChild(hpFill);

    // ============================
    // MONTA TUDO
    // ============================
    npcContainer.appendChild(npcToken);
    npcContainer.appendChild(hpBar);

    cell.appendChild(npcContainer);
  }
});



      mapa.appendChild(cell);
    }
  }
}



// ================================
// CONTROLE DE MOVIMENTO DO JOGADOR
// ================================
document.addEventListener("keydown", e => {

  let nx = posicao.x;
  let ny = posicao.y;

  if (e.key === "ArrowUp")    ny--;
  if (e.key === "ArrowDown")  ny++;
  if (e.key === "ArrowLeft")  nx--;
  if (e.key === "ArrowRight") nx++;

  // limites do mapa
  if (nx < 0 || ny < 0 || nx >= TAMANHO_MAPA || ny >= TAMANHO_MAPA) return;

  // parede bloqueia movimento
  if (mapaDados[ny][nx] === 1) return;

  // move jogador
  posicao.x = nx;
  posicao.y = ny;

  renderMapa();
});

document.getElementById("btn-atacar").addEventListener("click", atacarAlvo);

// ================================
// DESENHO INICIAL
// ================================
renderMapa();
