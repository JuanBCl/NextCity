// 🌿 Variables del DOM
const modalPago = document.getElementById("modalPago");
const cerrarModal = document.getElementById("cerrarModal");
const btnConfirmarPago = document.getElementById("btnConfirmarPago");
const planTexto = document.getElementById("planSeleccionadoTexto");

// 🟢 Mostrar modal al seleccionar un plan
document.querySelectorAll(".btn-select").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan || "Básico";
    planTexto.innerHTML = `Has elegido el plan <strong>${plan}</strong>`;
    modalPago.style.display = "flex";

    // 🌟 Efecto visual de plan seleccionado
    document.querySelectorAll(".plan-card").forEach((card) => {
      card.classList.remove("seleccionado");
    });
    btn.closest(".plan-card").classList.add("seleccionado");
  });
});

    


// 🔴 Cerrar modal
cerrarModal.addEventListener("click", () => {
  modalPago.style.display = "none";
});

// 🟢 Confirmar pago simulado
// 🟢 Confirmar pago simulado
// 🟢 Confirmar pago simulado
// 🟢 Confirmar pago simulado
btnConfirmarPago.addEventListener("click", () => {
  const metodo = document.querySelector('input[name="metodo"]:checked')?.value;

  // Verificar que haya un plan seleccionado
  const planSeleccionadoElemento = document.querySelector(".plan-card.seleccionado h3");
  if (!planSeleccionadoElemento) {
    mostrarToast("⚠️ Primero selecciona un plan antes de confirmar el pago.");
    return;
  }

  const planSeleccionado = planSeleccionadoElemento.textContent;

  // Guardar plan en localStorage
  localStorage.setItem("userSubscription", planSeleccionado);

  // Notificación visual
  mostrarToast(`✅ Suscripción ${planSeleccionado} activada con ${metodo}.`);

  // Cerrar modal y redirigir
  setTimeout(() => {
    modalPago.style.display = "none";
    window.location.href = "index.html";
  }, 2500);
});



// 🔔 Función para mostrar notificación visual (toast)
function mostrarToast(mensaje) {
  let toast = document.createElement("div");
  toast.className = "toast-notificacion";
  toast.textContent = mensaje;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("visible"), 100);
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}


// 🔘 Cerrar si clic fuera del modal
window.addEventListener("click", (e) => {
  if (e.target === modalPago) modalPago.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  if (tipoUsuario) {
    // Mostrar solo los planes del tipo correspondiente
    if (tipoUsuario === "turista") {
      document.querySelector(".planes-container.empresas").style.display = "none";
    } else if (tipoUsuario === "empresa") {
      document.querySelector(".planes-container").style.display = "none"; // Ocultar turistas
      document.querySelector(".planes-container.empresas").style.display = "block";
    }
  }
});
