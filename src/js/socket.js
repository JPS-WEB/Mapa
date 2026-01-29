// ================================
// SOCKET.IO - CONEXÃO GLOBAL
// ================================

const socket = io("https://mapa-production.up.railway.app", {
  transports: ["websocket"],
  auth: {
    personagemId: window.PERSONAGEM_ID ?? null
  }
});

socket.on("connect", () => {
  console.log("🟢 Conectado ao servidor realtime:", socket.id);
});

socket.on("disconnect", () => {
  console.warn("🔴 Desconectado do servidor realtime");
});
