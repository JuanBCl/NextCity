document.addEventListener("DOMContentLoaded", () => {
  const formTitle = document.getElementById("formTitle");
  const authForm = document.getElementById("authForm");
  const toggleLink = document.getElementById("toggleLink");
  const registerFields = document.getElementById("registerFields");
  const submitBtn = document.getElementById("submitBtn");
  const tipoUsuarioSelect = document.getElementById("tipoUsuario");
  const empresaFields = document.getElementById("empresaFields");
  const turistaFields = document.getElementById("turistaFields");


  let isRegister = false;

  // 🔄 Alternar entre login y registro
  toggleLink.addEventListener("click", () => {
    isRegister = !isRegister;
    formTitle.textContent = isRegister ? "Crear Cuenta" : "Iniciar Sesión";
    registerFields.style.display = isRegister ? "block" : "none";
    submitBtn.textContent = isRegister ? "Registrarse" : "Iniciar Sesión";
    toggleLink.textContent = isRegister
      ? "¿Ya tienes cuenta? Inicia sesión"
      : "¿No tienes cuenta? Regístrate";
  });

  // 👔 Mostrar u ocultar campos de empresa
  tipoUsuarioSelect.addEventListener("change", () => {
    const tipo = tipoUsuarioSelect.value;

    // Mostrar campos según tipo
    empresaFields.style.display = tipo === "empresa" ? "block" : "none";
    turistaFields.style.display = tipo === "turista" ? "block" : "none";

    // Requerir campos específicos
    const empresaInputs = empresaFields.querySelectorAll("input, textarea");
    empresaInputs.forEach(input => (input.required = tipo === "empresa"));

    const nombreInput = document.getElementById("nombre");
    nombreInput.required = tipo === "turista";
  });


  // 🧠 Evento de envío de formulario
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // 🆕 REGISTRO
    if (isRegister) {
      const tipo = tipoUsuarioSelect.value;

      if (!tipo) {
        showToast("Selecciona el tipo de usuario.", 2500);
        return;
      }

      localStorage.setItem("tipoUsuario", tipo);

      // 🏢 Si es empresa, guarda sus datos
      if (tipo === "empresa") {
        const dataEmpresa = {
          nombreEmpresa: document.getElementById("nombreEmpresa").value,
          direccion: document.getElementById("direccion").value,
          descripcion: document.getElementById("descripcion").value,
          precios: document.getElementById("precios").value,
        };
        localStorage.setItem("empresaData", JSON.stringify(dataEmpresa));
        localStorage.setItem("userName", dataEmpresa.nombreEmpresa);
      } else {
        // 👤 Si es turista, usa el campo de nombre o pide uno si no existe
        const nombre = document.getElementById("nombre").value || prompt("Ingresa tu nombre:");
        localStorage.setItem("userName", nombre);
      }

      // 💾 Guardar datos comunes
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("userSubscription", "Free");
      localStorage.setItem("isLoggedIn", "true");

      showToast("Registro exitoso 🎉 Redirigiendo...");
      setTimeout(() => {
        window.location.href = "suscripciones.html";
      }, 2000);
    }

    // 🔐 INICIO DE SESIÓN
    else {
      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");

      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        showToast("Inicio de sesión exitoso ✅");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } else {
        showToast("Credenciales inválidas ❌");
      }
    }
  });

  // 🍃 Función para mostrar toast
  function showToast(message, duration = 2500) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }
});
