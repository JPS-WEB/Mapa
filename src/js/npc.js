socket.on("estado-inicial", data => {
  npcs = Object.values(data.npcs);
  renderMapa();
});

socket.on("npc-atualizado", npc => {
  const i = npcs.findIndex(n => n.id === npc.id);
  if (i !== -1) {
    npcs[i] = npc;
    renderMapa();
  }
});
