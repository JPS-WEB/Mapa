// src/js/npc.js

if (!window.socket) {
  console.error("❌ socket não existe em npc.js");
}

let npcs = [
  { id: 1, nome: "Goblin", x: 2, y: 2, hp: 10 },
  { id: 2, nome: "Orc", x: 5, y: 4, hp: 20 }
];

let alvoSelecionado = null;

function desenharNPCs() {
  const cells = document.querySelectorAll(".cell");
  if (!cells.length) return;

  npcs.forEach(npc => {
    const index = npc.y * TAMANHO_MAPA + npc.x;
    const cell = cells[index];
    if (!cell) return;

    const token = document.createElement("div");
    token.classList.add("npc-token");
    token.title = npc.nome;

    if (alvoSelecionado && alvoSelecionado.id === npc.id) {
      token.classList.add("selecionado");
    }

    token.addEventListener("click", e => {
      e.stopPropagation();
      alvoSelecionado = npc;
      console.log("🎯 Alvo:", npc.nome);
      renderMapa(); // redesenha tudo
    });

    cell.appendChild(token);
  });
}

// 🔁 injeta NPCs após o mapa
const originalRender = window.renderMapa;

window.renderMapa = function () {
  originalRender();
  desenharNPCs();
};

// 🔥 CHAMA A PRIMEIRA VEZ
renderMapa();
