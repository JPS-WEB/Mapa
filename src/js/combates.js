if (!window.socket) {
  throw new Error("❌ socket não disponível em npcs.js");
}

const socket = window.socket;

let npcs = [];

socket.on("estado-inicial", data => {
  npcs = data.npcs;
  renderMapa();
});

socket.on("npc-atualizado", npcAtualizado => {
  const i = npcs.findIndex(n => n.id === npcAtualizado.id);
  if (i !== -1) {
    npcs[i] = npcAtualizado;
    renderMapa();
  }
});
