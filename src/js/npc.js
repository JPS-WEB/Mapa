// src/js/npc.js
if (typeof socket === "undefined") {
  console.error("❌ socket não existe em npc.js");
}

socket.on("npc-update", lista => {
  console.log("👹 NPCs recebidos:", lista);
  npcs.length = 0;
  npcs.push(...lista);
  renderMapa();
});
