const TAMANHO_MAPA = 10;
const mapa = document.getElementById("mapa");

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

let npcs = [];

function renderMapa() {
  mapa.innerHTML = "";

  for (let y = 0; y < TAMANHO_MAPA; y++) {
    for (let x = 0; x < TAMANHO_MAPA; x++) {

      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (mapaDados[y][x] === 1) cell.classList.add("parede");

      npcs.forEach(npc => {
        if (npc.x === x && npc.y === y) {
          const token = document.createElement("div");
          token.classList.add("npc-token");

          const hp = document.createElement("div");
          hp.classList.add("hp-fill");
          hp.style.width = (npc.hp / npc.hpMax * 100) + "%";

          token.appendChild(hp);
          cell.appendChild(token);
        }
      });

      mapa.appendChild(cell);
    }
  }
}
