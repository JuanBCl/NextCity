document.addEventListener("DOMContentLoaded", () => {
  // 🧠 Obtener datos del usuario desde localStorage
  const userName = localStorage.getItem("userName") || "Usuario invitado";
  const userEmail = localStorage.getItem("userEmail") || "correo@ejemplo.com";
  const userSubscription = localStorage.getItem("userSubscription") || "Free";

  // 🌿 Mostrar datos en la tarjeta de perfil
  document.querySelector(".perfil-details").innerHTML = `
    <p><strong>Nombre:</strong> ${userName}</p>
    <p><strong>Email:</strong> ${userEmail}</p>
    <p><strong>Suscripción:</strong> ${userSubscription}</p>
    <button id="editarPerfilBtn">Editar Perfil</button>
  `;

  // 🟢 Mostrar datos en el dropdown del header (si existe)
  const dropdownName = document.getElementById("userName");
  const dropdownEmail = document.getElementById("userEmail");
  const dropdownSubscription = document.getElementById("userSubscription");
  const upgradeBtn = document.getElementById("upgradeBtn");

  if (dropdownName && dropdownEmail && dropdownSubscription) {
    dropdownName.textContent = userName;
    dropdownEmail.textContent = userEmail;
    dropdownSubscription.textContent = userSubscription;

    // Mostrar botón si el plan es "Free"
    if (userSubscription.toLowerCase() === "free") {
      upgradeBtn.style.display = "block";
      upgradeBtn.addEventListener("click", () => {
        window.location.href = "suscripciones.html";
      });
    } else {
      upgradeBtn.style.display = "none";
    }
  }

  // 🔒 Mostrar u ocultar el icono de perfil según el estado de sesión
  const navbarAuth = document.querySelector(".navbar-auth");
  const navbarProfile = document.getElementById("navbarProfile");

  if (localStorage.getItem("userLoggedIn") === "true") {
    navbarAuth.style.display = "none";
    navbarProfile.style.display = "block";
  } else {
    navbarAuth.style.display = "flex";
    navbarProfile.style.display = "none";
  }

  // 🗺️ Simulación de rutas completadas
  const historialRutas = ["Humedal Santa María", "Centro Histórico", "Parque Natural El Cedral"];
  const historialList = document.getElementById("historialRutas");
  historialRutas.forEach(ruta => {
    const li = document.createElement("li");
    li.textContent = ruta;
    historialList.appendChild(li);
  });

  // 🏅 Simulación de logros
  const logros = [
    { titulo: "Explorador Ecológico", icono: "🌿" },
    { titulo: "Caminante Cultural", icono: "🏛️" },
    { titulo: "Amigo del Planeta", icono: "🌍" }
  ];
  const logrosContainer = document.getElementById("logrosContainer");
  logros.forEach(logro => {
    const div = document.createElement("div");
    div.classList.add("logro-card");
    div.innerHTML = `
      <div class="logro-icon">${logro.icono}</div>
      <div class="logro-titulo">${logro.titulo}</div>
    `;
    logrosContainer.appendChild(div);
  });

  // ✏️ Botón editar perfil
  document.getElementById("editarPerfilBtn").addEventListener("click", () => {
    alert("Funcionalidad de edición aún no implementada.");
  });

  // 🍔 Menú hamburguesa
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navbar-links");
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});
