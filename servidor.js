const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// ================================
// ESTADO DO MAPA (TEMPORÁRIO)
// ================================
const estadoMapa = {
  jogadores: {},
  npcs: {
    1: { id: 1, nome: "Goblin", x: 1, y: 3, hp: 20, hpMax: 20 },
    2: { id: 2, nome: "Orc", x: 2, y: 2, hp: 30, hpMax: 30 }
  }
};

// ================================
// SOCKET
// ================================
io.on("connection", socket => {
  console.log("🟢 Cliente conectado");

  socket.emit("estado-inicial", estadoMapa);

  socket.on("mover", data => {
    estadoMapa.jogadores[data.id] = data.pos;
    io.emit("jogadores-atualizados", estadoMapa.jogadores);
  });

  socket.on("atacar-npc", ({ npcId, dano }) => {
    const npc = estadoMapa.npcs[npcId];
    if (!npc) return;

    npc.hp = Math.max(0, npc.hp - dano);
    io.emit("npc-atualizado", npc);
  });
});

server.listen(3001, () => {
  console.log("🔥 Server MAPA rodando na porta 3001");
});
