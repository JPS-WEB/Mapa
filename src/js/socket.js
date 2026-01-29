// src/js/socket.js

// ⚠️ GARANTE QUE socket.io.js FOI CARREGADO
if (typeof io === "undefined") {
  console.error("❌ socket.io.js NÃO foi carregado");
}

// cria conexão
const io = new Server(server, {
  cors: {
    origin: "*"
  },
  transports: ["websocket"], // 🔥 somente websocket
  allowUpgrades: false
});


// conexão OK
socket.on("connect", () => {
  console.log("🟢 Socket conectado:", socket.id);
});

// erro
socket.on("connect_error", err => {
  console.error("❌ Erro socket:", err.message);
});

// deixa socket global
window.socket = socket;
