const API_URL = "http://localhost:8080/api/reminders";

// Mapeo de días en inglés (valor que envía el backend) a español para mostrar
const DIAS_ESPANOL = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

const form = document.getElementById("reminder-form");
const titleInput = document.getElementById("title");
const daySelect = document.getElementById("dayOfWeek");
const reminderList = document.getElementById("reminder-list");

// Carga los recordatorios desde el backend y los renderiza
async function cargarRecordatorios() {
  try {
    const respuesta = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los recordatorios");
    }

    const recordatorios = await respuesta.json();
    renderizarRecordatorios(recordatorios);
  } catch (error) {
    console.error("Error al cargar recordatorios:", error);
    reminderList.innerHTML = `<li class="error">Error al cargar los recordatorios. ¿Está el backend ejecutándose?</li>`;
  }
}

// Renderiza la lista de recordatorios en el DOM
function renderizarRecordatorios(recordatorios) {
  reminderList.innerHTML = "";

  if (!recordatorios || recordatorios.length === 0) {
    reminderList.innerHTML = `<li class="vacio">No hay recordatorios aún. Añade uno nuevo.</li>`;
    return;
  }

  recordatorios.forEach((reminder) => {
    const tarjeta = document.createElement("li");
    tarjeta.className = "reminder-card";
    const diaEspañol = DIAS_ESPANOL[reminder.dayOfWeek] || reminder.dayOfWeek;
    const fecha = reminder.createdAt
      ? new Date(reminder.createdAt).toLocaleString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    tarjeta.innerHTML = `
      <div class="title">${escapeHtml(reminder.title)}</div>
      <div class="day">${diaEspañol}</div>
      ${fecha ? `<div class="fecha">${fecha}</div>` : ""}
    `;
    reminderList.appendChild(tarjeta);
  });
}

// Escapa HTML para evitar inyección de código
function escapeHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

// Maneja el envío del formulario: crea un recordatorio nuevo vía POST
form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const titulo = titleInput.value.trim();
  const dia = daySelect.value;

  if (!titulo) {
    return;
  }

  const boton = form.querySelector("button[type=submit]");
  const textoOriginalBoton = boton.textContent;

  try {
    boton.disabled = true;
    boton.textContent = "Guardando...";

    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: titulo, dayOfWeek: dia }),
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo crear el recordatorio");
    }

    const creado = await respuesta.json();

    // Añade el nuevo recordatorio al principio de la lista sin recargar
    const tarjeta = document.createElement("li");
    tarjeta.className = "reminder-card";
    const diaEspañol = DIAS_ESPANOL[creado.dayOfWeek] || creado.dayOfWeek;
    const fecha = creado.createdAt
      ? new Date(creado.createdAt).toLocaleString("es-ES", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    tarjeta.innerHTML = `
      <div class="title">${escapeHtml(creado.title)}</div>
      <div class="day">${diaEspañol}</div>
      ${fecha ? `<div class="fecha">${fecha}</div>` : ""}
    `;

    // Si había mensaje de "no hay recordatorios", lo eliminamos
    const mensajeVacio = reminderList.querySelector(".vacio");
    if (mensajeVacio) {
      mensajeVacio.remove();
    }

    reminderList.prepend(tarjeta);

    // Limpia el formulario
    form.reset();
  } catch (error) {
    console.error("Error al crear recordatorio:", error);
    alert("No se pudo guardar el recordatorio. Inténtalo de nuevo.");
  } finally {
    boton.disabled = false;
    boton.textContent = textoOriginalBoton;
  }
});

// Carga los recordatorios al iniciar
cargarRecordatorios();

console.log("Frontend cargado correctamente y conectado al backend");
