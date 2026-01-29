// garante que socket.io carregou
if (typeof io === "undefined") {
  throw new Error("❌ socket.io.js não foi carregado");
}

// cria o socket UMA ÚNICA VEZ
const socket = io("https://mapa-production.up.railway.app", {
  transports: ["websocket"]
});

// deixa global
window.socket = socket;

socket.on("connect", () => {
  console.log("🟢 Conectado:", socket.id);
});

socket.on("disconnect", () => {
  console.log("🔴 Desconectado");
});
