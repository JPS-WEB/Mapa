// npcs.js

let npcs = {};
let alvoSelecionado = null;

// recebe estado inicial
window.socket.on("estado-inicial", estado => {
  npcs = estado.npcs;
  desenharNPCs();
});

// atualiza NPC
window.socket.on("npc-atualizado", npc => {
  npcs[npc.id] = npc;
  desenharNPCs();

  if (alvoSelecionado?.id === npc.id) {
    document.getElementById("alvo-hp").textContent =
      `${npc.hp} / ${npc.hpMax}`;
  }
});

function desenharNPCs() {
  document.querySelectorAll(".npc").forEach(n => n.remove());

  const cells = document.querySelectorAll(".cell");

  Object.values(npcs).forEach(npc => {
    const idx = npc.y * 10 + npc.x;
    const cell = cells[idx];
    if (!cell) return;

    const el = document.createElement("div");
    el.className = "npc";
    el.textContent = "●";

    if (alvoSelecionado?.id === npc.id) {
      el.style.outline = "2px solid red";
    }

    el.onclick = e => {
      e.stopPropagation();
      alvoSelecionado = npc;
      document.getElementById("alvo-nome").textContent = npc.nome;
      document.getElementById("alvo-hp").textContent =
        `${npc.hp} / ${npc.hpMax}`;
      desenharNPCs();
    };

    cell.appendChild(el);
  });
}
