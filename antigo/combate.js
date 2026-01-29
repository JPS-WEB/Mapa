function atacar(npcId) {
  socket.emit("atacar-npc", {
    npcId,
    dano: 5
  });
}
