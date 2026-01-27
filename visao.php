<?php
$personagemId = (int)($_GET['id'] ?? 0);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Mapa</title>
<link rel="stylesheet" href="mapa.css">
<style>
  body{
    background: #000000;
  }
  #mapa {
    display: grid;
    grid-template-columns: repeat(10, 40px);
    grid-template-rows: repeat(10, 40px);
    gap: 1px;
  }
  .celula {
    width: 40px;
    height: 40px;
    background: #eee;
  }
  .parede {
    background: #333;
  }

</style>
</head>

<body>

<h2>Mapa</h2>
    <div id="painel-alvo">
      <h3>Alvo</h3>
      <p><strong>Nome:</strong> <span id="alvo-nome">Nenhum</span></p>
      <p><strong>Distância:</strong> <span id="alvo-distancia">-</span></p>
      <p><strong>Ataque:</strong> <span id="alvo-alcance">-</span></p>
       Vida: <span id="alvo-hp">-</span>
    </div>



<div id="mapa"></div>
  <button id="btn-atacar">Atacar</button>

<script>
  const PERSONAGEM_ID = <?= $personagemId ?>;
</script>
<script src="mapa.js"></script>
</body>
</html>
