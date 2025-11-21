// ============================
// 🌍 Datos de rutas actualizados
// ============================
const rutas = [
  // 🟢 Lugares Ecológicos
  {
    nombre: "Cerro de Monserrate",
    tipo: "ecologica",
    direccion: "Calle 21 No. 5-80, Bogotá",
    coordenadas: "4.605555, -74.055615",
    descripcion:
      "Ícono de la ciudad, ofrece vistas panorámicas de Bogotá. Es un lugar turístico, religioso y natural, al que se puede acceder por teleférico, funicular o senderismo."
  },
  {
    nombre: "Parque Natural Chingaza",
    tipo: "ecologica",
    direccion: "Vereda El Hato, municipio de Fómeque",
    coordenadas: "4.547510, -73.733419",
    descripcion:
      "Parque que protege ecosistemas de páramo y cuenta con senderos para caminatas. Ideal para los amantes de la naturaleza y la observación de fauna."
  },
  {
    nombre: "Humedal La Conejera",
    tipo: "ecologica",
    direccion: "Calle 170 No. 56-85, Bogotá",
    coordenadas: "4.761198, -74.103158",
    descripcion:
      "Refugio natural al norte de Bogotá, perfecto para el avistamiento de aves y la realización de caminatas ecológicas en un entorno tranquilo."
  },

  // 🍽️ Lugares Gastronómicos
  {
    nombre: "La Puerta Falsa",
    tipo: "gastronomica",
    direccion: "Calle 11 No. 6-50, La Candelaria, Bogotá",
    coordenadas: "4.598047, -74.074961",
    descripcion:
      "Restaurante tradicional en La Candelaria, famoso por su ajiaco y tamales. Un lugar emblemático para probar la gastronomía típica bogotana."
  },
  {
    nombre: "Mercado de La Perseverancia",
    tipo: "gastronomica",
    direccion: "Calle 38 No. 13-52, Bogotá",
    coordenadas: "4.616461, -74.066296",
    descripcion:
      "Mercado vibrante con una gran variedad de platos típicos colombianos, como bandeja paisa y arepas. Ideal para disfrutar de la comida local."
  },
  {
    nombre: "Calle del Embudo (Chorro de Quevedo)",
    tipo: "gastronomica",
    direccion: "Calle 2 No. 2-60, La Candelaria, Bogotá",
    coordenadas: "4.597800, -74.069665",
    descripcion:
      "Calle bohemia llena de cafés y restaurantes. Ofrece una experiencia gastronómica variada en un lugar histórico y pintoresco."
  },

  // 🎭 Lugares Culturales
  {
    nombre: "Museo Nacional de Colombia",
    tipo: "cultural",
    direccion: "Carrera 7 No. 28-66, Bogotá",
    coordenadas: "4.615550, -74.068844",
    descripcion:
      "Museo con una vasta colección de arte, arqueología e historia de Colombia. Es un lugar clave para conocer la cultura y evolución del país."
  },
  {
    nombre: "Teatro Colón",
    tipo: "cultural",
    direccion: "Carrera 6 No. 9-45, Bogotá",
    coordenadas: "4.596488, -74.074542",
    descripcion:
      "Uno de los teatros más importantes de Bogotá, con una programación cultural que incluye teatro, música y ópera, y una arquitectura impresionante."
  },
  {
    nombre: "Centro Cultural Gabriel García Márquez",
    tipo: "cultural",
    direccion: "Calle 11 No. 5-60, Bogotá",
    coordenadas: "4.597687, -74.074081",
    descripcion:
      "Centro dedicado al legado del Nobel Gabriel García Márquez, con exposiciones, conferencias y eventos literarios que celebran la cultura colombiana."
  }
];

// ============================
// 🗺️ Mostrar rutas según filtro
// ============================
function mostrarRutas(filtro = "todas") {
  const container = document.getElementById("rutas-container");
  container.innerHTML = "";

  const filtradas = rutas.filter(ruta => filtro === "todas" || ruta.tipo === filtro);

  if (filtradas.length === 0) {
    container.innerHTML = "<p>No hay rutas disponibles para este filtro.</p>";
    return;
  }

  filtradas.forEach(ruta => {
    const div = document.createElement("div");
    div.className = "ruta-item";

    div.innerHTML = `
      <h3>${ruta.nombre}</h3>
      <span class="tag ${ruta.tipo}">${capitalizar(ruta.tipo)}</span>
      <p>${ruta.descripcion}</p>
      <button onclick="verRuta('${ruta.nombre}', '${ruta.direccion}', '${ruta.coordenadas}', '${ruta.descripcion}')">Ver más</button>
    `;

    container.appendChild(div);
  });
}

// ============================
// 🔍 Ver más (abrir modal con información)
// ============================
function verRuta(nombre, direccion, coordenadas, descripcion) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-titulo").textContent = nombre;
  document.getElementById("modal-descripcion").innerHTML = `
    <strong>Dirección:</strong> ${direccion}<br>
    <strong>Coordenadas:</strong> ${coordenadas}<br><br>
    ${descripcion}
  `;

  // ===============================
  // 🧭 Conversión de coordenadas texto → numéricas
  // ===============================
  // Ejemplo: "4.5957° N, 74.2160° W"
  const [latText, lngText] = coordenadas.split(",");

  // Extraer valores numéricos
  let lat = parseFloat(latText);
  let lng = parseFloat(lngText);

  // Detectar hemisferio y asignar signo correcto
  if (latText.includes("S")) lat = -lat;
  if (lngText.includes("W")) lng = -lng;

  // ===============================
  // 🗺️ Generar URL del mapa sin API key
  // ===============================
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es&z=14&output=embed`;

  // Insertar URL en el iframe
  const mapFrame = document.getElementById("mapFrame");
  mapFrame.src = mapUrl;

  modal.style.display = "block";
}



// ============================
// ❌ Cerrar modal
// ============================
function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

// ============================
// 🔄 Filtrar por tipo
// ============================
function filtrarRutas() {
  const tipo = document.getElementById("tipo").value;
  mostrarRutas(tipo);
}

// ============================
// 🪶 Capitalizar texto
// ============================
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// ============================
// 🍔 Inicialización
// ============================
document.addEventListener("DOMContentLoaded", () => {
  mostrarRutas(); // Mostrar todas al cargar
});
