function agregarAcademico() {
  const nombre = prompt("Escribe el nuevo elemento académico:");

  if (nombre && nombre.trim() !== "") {
    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = nombre.trim();
    document.getElementById("listaAcademica").appendChild(nuevoElemento);
  }
}

function agregarLaboral() {
  const nombre = prompt("Escribe el nuevo elemento laboral:");

  if (nombre && nombre.trim() !== "") {
    const nuevoElemento = document.createElement("li");
    nuevoElemento.textContent = nombre.trim();
    document.getElementById("listaLaboral").appendChild(nuevoElemento);
  }
}