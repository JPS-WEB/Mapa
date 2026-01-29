// combates.js
function atacar() {
  if (!window.alvoSelecionado) {
    alert("Nenhum alvo selecionado");
    return;
  }

  window.socket.emit("atacar-npc", {
    npcId: alvoSelecionado.id,
    dano: 5
  });
}
