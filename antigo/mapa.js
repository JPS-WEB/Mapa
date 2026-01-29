// src/js/mapa.js

const mapa = document.getElementById("mapa");

const TAMANHO_MAPA = 10;

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

let posicao = { x: 0, y: 0 };

function renderMapa() {
  mapa.innerHTML = "";

  for (let y = 0; y < TAMANHO_MAPA; y++) {
    for (let x = 0; x < TAMANHO_MAPA; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (mapaDados[y][x] === 1) {
        cell.classList.add("parede");
      }

      // jogador
      if (posicao.x === x && posicao.y === y) {
        const token = document.createElement("div");
        token.classList.add("token");
        cell.appendChild(token);
      }

      mapa.appendChild(cell);
    }
  }
}

document.addEventListener("keydown", e => {
  let nx = posicao.x;
  let ny = posicao.y;

  if (e.key === "ArrowUp") ny--;
  if (e.key === "ArrowDown") ny++;
  if (e.key === "ArrowLeft") nx--;
  if (e.key === "ArrowRight") nx++;

  if (nx < 0 || ny < 0 || nx >= TAMANHO_MAPA || ny >= TAMANHO_MAPA) return;
  if (mapaDados[ny][nx] === 1) return;

  posicao.x = nx;
  posicao.y = ny;

  renderMapa();
});

renderMapa();

// exporta para NPC usar depois
window.renderMapa = renderMapa;
window.posicao = posicao;
window.mapaDados = mapaDados;
