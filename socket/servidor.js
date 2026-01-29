const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
  transports: ["websocket"]
});

// arquivos estáticos
app.use(express.static("public"));

const estadoMapa = {
  npcs: [
    { id: 1, nome: "Goblin", x: 2, y: 2, hp: 20, hpMax: 20 },
    { id: 2, nome: "Orc", x: 5, y: 4, hp: 30, hpMax: 30 }
  ]
};

io.on("connection", socket => {
  console.log("🟢 Cliente conectado");

  socket.emit("estado-inicial", estadoMapa);

  socket.on("atacar-npc", ({ id, dano }) => {
    const npc = estadoMapa.npcs.find(n => n.id === id);
    if (!npc) return;

    npc.hp = Math.max(0, npc.hp - dano);
    io.emit("npc-atualizado", npc);
  });
});

const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
  console.log("🔥 Servidor rodando na porta", PORT);
});

