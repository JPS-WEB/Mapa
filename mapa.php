<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Mapa</title>
<link rel="stylesheet" href="src/css/mapa.css">
</head>
<body>

<h2>Mapa</h2>

<div id="painel-alvo">
  <p>Nome: <span id="alvo-nome">-</span></p>
  <p>Vida: <span id="alvo-hp">-</span></p>
</div>

<div id="mapa"></div>

<button id="btn-atacar">Atacar</button>

<!-- 1️⃣ socket.io -->
<script src="https://mapa-production.up.railway.app/socket.io/socket.io.js"></script>

<!-- 2️⃣ socket -->
<script src="src/js/sockets.js"></script>

<!-- 3️⃣ mapa -->
<script src="src/js/mapas.js"></script>

<!-- 4️⃣ npc -->
<script src="src/js/npcs.js"></script>

<!-- 5️⃣ combate -->
<script src="src/js/combates.js"></script>


</body>
</html>
