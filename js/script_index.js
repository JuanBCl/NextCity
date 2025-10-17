// Simulación de navegación
function irA(vista) {
  alert("Ir a: " + vista);
  // window.location.href = `${vista}.html` si tienes otras páginas
}

function verRuta() {
  alert("Ver detalles de la ruta destacada");
}

// Si más adelante deseas agregar scripts que interactúen con el DOM,
// puedes seguir trabajando dentro de este listener.
document.addEventListener("DOMContentLoaded", () => {
  // Por ahora, nada más se ejecuta automáticamente
});
