// js/auth.js
import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const formTitle = document.getElementById("formTitle");
  const authForm = document.getElementById("authForm");
  const toggleLink = document.getElementById("toggleLink");
  const registerFields = document.getElementById("registerFields");
  const submitBtn = document.getElementById("submitBtn");
  const tipoUsuarioSelect = document.getElementById("tipoUsuario");
  const empresaFields = document.getElementById("empresaFields");
  const turistaFields = document.getElementById("turistaFields");

  // 🔔 Contenedor del botón para reenviar correo
  const resendContainer = document.createElement("div");
  resendContainer.style.textAlign = "center";
  resendContainer.style.marginTop = "10px";
  authForm.appendChild(resendContainer);

  let resendBtn; // Botón de reenviar
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
    resendContainer.innerHTML = ""; // limpiar cuando cambia de modo
  });

  // 👔 Mostrar u ocultar campos según tipo
  tipoUsuarioSelect.addEventListener("change", () => {
    const tipo = tipoUsuarioSelect.value;
    empresaFields.style.display = tipo === "empresa" ? "block" : "none";
    turistaFields.style.display = tipo === "turista" ? "block" : "none";

    // Requerir campos específicos
    const empresaInputs = empresaFields.querySelectorAll("input, textarea");
    empresaInputs.forEach(input => (input.required = tipo === "empresa"));
    const nombreInput = document.getElementById("nombre");
    nombreInput.required = tipo === "turista";
  });

  // 🧠 Evento de envío de formulario
  authForm.addEventListener("submit", async (e) => {
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

      try {
        // Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Enviar correo de verificación
        await sendEmailVerification(user);

        // Mostrar mensaje debajo del botón
        resendContainer.innerHTML = `
          <p style="color:#4CAF50; margin-bottom:5px;">
            Se ha enviado un correo de verificación. Revisa tu bandeja 📩
          </p>
          <button id="resendBtn" disabled class="resend-btn" style="
            background-color: #888;
            color: white;
            border: none;
            padding: 8px 14px;
            border-radius: 8px;
            cursor: not-allowed;
          ">
            Reenviar correo (30s)
          </button>
        `;

        resendBtn = document.getElementById("resendBtn");
        startResendCountdown(resendBtn, user);

        // Guardar datos del usuario
        let userData = {
          email: email,
          tipoUsuario: tipo,
          suscripcion: "Free",
          creadoEn: new Date()
        };

        if (tipo === "empresa") {
          userData = {
            ...userData,
            nombreEmpresa: document.getElementById("nombreEmpresa").value,
            direccion: document.getElementById("direccion").value,
            descripcion: document.getElementById("descripcion").value,
            precios: document.getElementById("precios").value
          };
        } else {
          userData = {
            ...userData,
            nombre: document.getElementById("nombre").value
          };
        }

        // Guardar datos en Firestore
        await setDoc(doc(db, "usuarios", user.uid), userData);

        // Guardar en localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", tipo === "empresa" ? userData.nombreEmpresa : userData.nombre);
        localStorage.setItem("tipoUsuario", tipo);

        // Si el usuario nunca ha elegido suscripción, se deja como "Free"
        if (!localStorage.getItem("userSubscription")) {
          localStorage.setItem("userSubscription", "Free");
        }

        showToast("Registro exitoso 🎉");

      } catch (error) {
        showToast("Error al registrar: " + error.message);
      }
    }

    // 🔐 INICIO DE SESIÓN
    // 🔐 INICIO DE SESIÓN
else {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      showToast("Tu correo no está verificado. Revisa tu bandeja 📩");
      resendContainer.innerHTML = `
        <button id="resendBtn" disabled class="resend-btn" style="
          background-color: #888;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: not-allowed;
          margin-top: 10px;
        ">
          Reenviar correo (30s)
        </button>
      `;
      resendBtn = document.getElementById("resendBtn");
      startResendCountdown(resendBtn, user);
      return;
    }

    showToast("Inicio de sesión exitoso ✅");

    // Guardar datos básicos temporales si quieres (opcional)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    // =====> LEER DATOS DEL USUARIO EN FIRESTORE
    const userDocRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      showToast("Error: datos del usuario no encontrados en Firestore.", 3000);
      return;
    }

    const userData = userSnap.data();
    const tipoUsuario = userData.tipoUsuario;
    const suscripcion = userData.suscripcion;
    const rutas = userData.rutas || null;

    // Decide a dónde dirigir al usuario
    setTimeout(() => {
      if (!suscripcion || suscripcion === "Free") {
        window.location.href = "suscripciones.html";
        return;
      }

      if (tipoUsuario === "turista" && !rutas) {
        window.location.href = "rutas.html";
        return;
      }

      window.location.href = "index.html";
    }, 1200);

  } catch (error) {
    showToast("Error: " + error.message);
  }
}


  });

  // 🕒 Función para iniciar el temporizador del botón de reenviar
  function startResendCountdown(button, user) {
    let timeLeft = 70;
    const interval = setInterval(() => {
      timeLeft--;
      button.textContent = `Reenviar correo (${timeLeft}s)`;
      if (timeLeft <= 0) {
        clearInterval(interval);
        button.textContent = "Reenviar correo";
        button.disabled = false;
        button.style.backgroundColor = "#4CAF50";
        button.style.cursor = "pointer";
        button.addEventListener("click", async () => {
          await sendEmailVerification(user);
          showToast("Correo de verificación reenviado 📩");
          button.disabled = true;
          button.style.backgroundColor = "#888";
          button.style.cursor = "not-allowed";
          startResendCountdown(button, user); // reinicia el temporizador
        }, { once: true });
      }
    }, 1000);
  }

  // 🍃 Función para mostrar toast
  function showToast(message, duration = 2500) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");
    toastMessage.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), duration);
  }
});
