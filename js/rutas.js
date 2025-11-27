// ===========================
// Importar Firebase Services
// ===========================
import { auth, db } from "../js/firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// ===========================
// Función para guardar rutas
// ===========================
export function guardarSeleccion() {
  const humedal = document.getElementById("humedal").checked;
  const monserrate = document.getElementById("monserrate").checked;
  const universidad = document.getElementById("universidad").checked;

  // Validación
  if (!humedal && !monserrate && !universidad) {
    document.getElementById("mensaje").innerText = "Selecciona al menos 1 ruta.";
    document.getElementById("mensaje").style.color = "red";
    return;
  }

  const user = auth.currentUser;

  // Si por alguna razón no hay usuario autenticado
  if (!user) {
    document.getElementById("mensaje").innerText = "Error: No hay usuario autenticado.";
    document.getElementById("mensaje").style.color = "red";
    return;
  }

  // Objeto con las selecciones
  const rutasSeleccion = {
    humedal_la_conejera: humedal,
    cerro_de_monserrate: monserrate,
    universidad_ecologica: universidad
  };

  // Referencia al documento del usuario en Firestore
  const userRef = doc(db, "usuarios", user.uid);

  // ===========================
  // Guardar en Firestore
  // ===========================
  setDoc(userRef, { rutas: rutasSeleccion }, { merge: true })
    .then(() => {
      document.getElementById("mensaje").style.color = "#2e7d32";
      document.getElementById("mensaje").innerText = "Rutas guardadas correctamente.";

      
      // Redirección después de guardar
      setTimeout(() => {
        window.location.href = "index.html"; // Cambia si tu pantalla de inicio es diferente
      }, 2000);
    })
    .catch((error) => {
      console.error("Error al guardar rutas:", error);
      document.getElementById("mensaje").innerText = "Hubo un error al guardar.";
      document.getElementById("mensaje").style.color = "red";
    });
}
