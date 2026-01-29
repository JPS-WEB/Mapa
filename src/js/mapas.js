const mapa = document.getElementById("mapa");
const TAM = 10;

window.renderMapa = function () {
  mapa.innerHTML = "";

  for (let i = 0; i < TAM * TAM; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    mapa.appendChild(cell);
  }
};

renderMapa();
