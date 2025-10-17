document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // 📌 Referencias generales
  // =====================
  const navbarLinks = document.getElementById("navbar-links");
  const hamburger = document.getElementById("hamburger");
  const navbarAuth = document.querySelector(".navbar-auth");
  const navbarProfile = document.getElementById("navbarProfile");
  const profileIcon = document.getElementById("profileIcon");
  const profileDropdown = document.getElementById("profileDropdown");
  const logoutBtn = document.getElementById("logoutBtn");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userSubscription = document.getElementById("userSubscription");
  const upgradeBtn = document.getElementById("upgradeBtn");


  hamburger.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");

    const icon = hamburger.querySelector("i");
    icon.classList.toggle("bi-list");
    icon.classList.toggle("bi-x");
  });


  // =====================
  // 🔐 Estado de sesión
  // =====================
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    navbarAuth.style.display = "none";
    navbarProfile.style.display = "flex";

    // Mostrar datos guardados en localStorage
    userName.textContent = localStorage.getItem("userName") || "Usuario";
    userEmail.textContent = localStorage.getItem("userEmail") || "correo@ejemplo.com";

    // 🔹 Mostrar tipo de suscripción y manejar botón de upgrade
function actualizarSuscripcion() {
  const subscription = localStorage.getItem("userSubscription") || "Free";
  userSubscription.textContent = subscription;

  if (subscription === "Free") {
      upgradeBtn.style.display = "block";
  } else {
      upgradeBtn.style.display = "none";
    }
  }

  // Ejecutar al cargar
  actualizarSuscripcion();

  // Escuchar cambios de almacenamiento (por si cambia desde otra página)
  window.addEventListener("storage", (e) => {
    if (e.key === "userSubscription") {
      actualizarSuscripcion();
    }
  });

  } else {
    navbarAuth.style.display = "flex";
    navbarProfile.style.display = "none";
  }

  // =====================
  // 🍔 MENÚ HAMBURGUESA
  // =====================
  document.addEventListener("DOMContentLoaded", () => {
  //const hamburger = document.getElementById("hamburger");
  //const navbarLinks = document.getElementById("navbar-links");

    // Toggle de menú al hacer clic en hamburguesa
    hamburger.addEventListener("click", (e) => {
      const icon = hamburger.querySelector("i");
      icon.classList.toggle("bi-list");
      icon.classList.toggle("bi-x");

      e.stopPropagation();
      navbarLinks.classList.toggle("active");
    });

    // Cerrar el menú si se hace clic fuera
    document.addEventListener("click", (e) => {
      const isClickInsideMenu = navbarLinks.contains(e.target);
      const isClickHamburger = hamburger.contains(e.target);

      if (!isClickInsideMenu && !isClickHamburger) {
        navbarLinks.classList.remove("active");
      }
    });

  if (hamburger && navbarLinks) {
    
  }
});



  // =====================
  // 👤 PERFIL DROPDOWN
  // =====================
  profileIcon?.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!navbarProfile.contains(e.target)) {
      profileDropdown.classList.remove("active");
    }
  });

  // =====================
  // 💳 UPGRADE DE PLAN
  // =====================
  upgradeBtn?.addEventListener("click", () => {
    window.location.href = "suscripciones.html";
  });

  // =====================
  // 🚪 CERRAR SESIÓN
  // =====================
  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear(); // Limpia todos los datos
    window.location.href = "index.html";
  });
});

