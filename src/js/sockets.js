// socket.js
const socket = io("http://mapa-production.up.railway.app", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("🟢 Conectado:", socket.id);
});

// deixa global
window.socket = socket;
