// 🌿 Variables del DOM
const modalPago = document.getElementById("modalPago");
const cerrarModal = document.getElementById("cerrarModal");
const btnConfirmarPago = document.getElementById("btnConfirmarPago");
const planTexto = document.getElementById("planSeleccionadoTexto");
const formPago = document.getElementById("formPago");
const resumenPago = document.getElementById("resumenPago"); // contenedor nuevo

// 🟢 Mostrar modal al seleccionar un plan
document.querySelectorAll(".btn-select").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan || "Básico";
    const precio = btn.dataset.precio || "$0";
    planTexto.innerHTML = `Has elegido el plan <strong>${plan}</strong>`;
    modalPago.style.display = "flex";

    // 🌟 Efecto visual
    document.querySelectorAll(".plan-card").forEach((card) => {
      card.classList.remove("seleccionado");
    });
    btn.closest(".plan-card").classList.add("seleccionado");

    // Guardar en dataset
    modalPago.dataset.plan = plan;
    modalPago.dataset.precio = precio;

    // Mostrar formulario y resumen
    mostrarFormularioPago("Tarjeta");
    actualizarResumenPago(plan, "Tarjeta", precio);
  });
});

// 🧾 Mostrar campos según método
function mostrarFormularioPago(metodo) {
  let html = "";

  if (metodo === "Tarjeta") {
    html = `
      <label>Nombre del titular</label>
      <input type="text" id="nombreTitular" placeholder="Ej. Juan Pérez" required>

      <label>Número de tarjeta</label>
      <input type="text" id="numeroTarjeta" maxlength="16" placeholder="•••• •••• •••• ••••" required pattern="\\d{16}">

      <div class="fila">
        <div>
          <label>Vencimiento</label>
          <input type="month" id="vencimiento" required>
        </div>
        <div>
          <label>CVV</label>
          <input type="text" id="cvv" maxlength="3" placeholder="123" required pattern="\\d{3}">
        </div>
      </div>
    `;
  } else if (metodo === "Nequi") {
    html = `
      <label>Número de Nequi</label>
      <input type="text" id="numeroNequi" maxlength="10" placeholder="Ej. 3001234567" required pattern="\\d{10}">
    `;
  } else if (metodo === "PayPal") {
    html = `
      <label>Correo de PayPal</label>
      <input type="email" id="correoPayPal" placeholder="ejemplo@correo.com" required>
    `;
  }

  formPago.innerHTML = html;
}

// 🧾 Actualizar resumen del pago
function actualizarResumenPago(plan, metodo, precio) {
  resumenPago.innerHTML = `
    <h4>🧾 Resumen del pago</h4>
    <p><strong>Plan:</strong> ${plan}</p>
    <p><strong>Método:</strong> ${metodo}</p>
    <p><strong>Total a pagar:</strong> ${precio}</p>
  `;
}

// 🟢 Detectar cambio de método
document.querySelectorAll('input[name="metodo"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const metodo = e.target.value;
    mostrarFormularioPago(metodo);
    actualizarResumenPago(modalPago.dataset.plan, metodo, modalPago.dataset.precio);
  });
});

// 🔴 Cerrar modal
cerrarModal.addEventListener("click", () => {
  modalPago.style.display = "none";
});

// 🟢 Confirmar pago (validación de campos)
btnConfirmarPago.addEventListener("click", (e) => {
  e.preventDefault();

  const metodo = document.querySelector('input[name="metodo"]:checked')?.value;
  const planSeleccionadoElemento = document.querySelector(".plan-card.seleccionado h3");
  if (!planSeleccionadoElemento) {
    mostrarToast("⚠️ Primero selecciona un plan antes de confirmar el pago.");
    return;
  }

  // ⚠️ Validar campos
  const inputs = formPago.querySelectorAll("input[required]");
  let formularioValido = true;

  inputs.forEach((input) => {
    if (!input.checkValidity() || input.value.trim() === "") {
      formularioValido = false;
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "var(--verde-principal)";
    }
  });

  if (!formularioValido) {
    mostrarToast("🚫 Por favor completa todos los campos correctamente.");
    return;
  }

  // ✅ Guardar suscripción
  const planSeleccionado = planSeleccionadoElemento.textContent;
  localStorage.setItem("userSubscription", planSeleccionado);
  mostrarToast(`✅ Suscripción ${planSeleccionado} activada con ${metodo}.`);

  setTimeout(() => {
    modalPago.style.display = "none";
    window.location.href = "rutas.html";
  }, 2500);
});

// 🔔 Toast visual
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

// 🔘 Cerrar al hacer clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modalPago) modalPago.style.display = "none";
});

// Mostrar planes según tipo de usuario
document.addEventListener("DOMContentLoaded", () => {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  if (tipoUsuario) {
    if (tipoUsuario === "turista") {
      document.querySelector(".planes-container.empresas").style.display = "none";
    } else if (tipoUsuario === "empresa") {
      document.querySelector(".planes-container").style.display = "none";
      document.querySelector(".planes-container.empresas").style.display = "block";
    }
  }
});
