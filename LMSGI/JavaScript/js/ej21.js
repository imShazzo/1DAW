// --- 1. ESTADO DE LA APLICACIÓN (Nuestra base de datos) ---
let tareas = []; 
let filtroActual = "todas"; // Puede ser: "todas", "pendientes", "completadas"

// --- 2. REFERENCIAS AL DOM (Enganchamos el HTML) ---
const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");
const contador = document.getElementById("contador");
const btnLimpiar = document.getElementById("btnLimpiar");

// --- 3. FUNCIÓN PRINCIPAL: DIBUJAR LA PANTALLA ---
// Esta función lee el array y genera el HTML. Se ejecuta cada vez que hay un cambio.
function renderizar() {
    // a) Limpiamos la lista visual para redibujarla desde cero
    listaTareas.innerHTML = "";

    // b) Aplicamos el filtro (¡Aquí está lo del ejercicio 18!)
    let tareasFiltradas = tareas;
    if (filtroActual === "pendientes") {
        tareasFiltradas = tareas.filter(tarea => tarea.completada === false);
    } else if (filtroActual === "completadas") {
        tareasFiltradas = tareas.filter(tarea => tarea.completada === true);
    }

    // c) Dibujamos los <li> por cada tarea que ha pasado el filtro
    tareasFiltradas.forEach((tarea, index) => {
        const li = document.createElement("li");
        
        // Si está completada, le metemos la clase CSS del tachado
        if (tarea.completada) {
            li.classList.add("tachado");
        }

        // Metemos el contenido: un checkbox, el texto y un botón de borrar
        li.innerHTML = `
            <input type="checkbox" ${tarea.completada ? "checked" : ""} 
                   onclick="marcarCompletada(${tarea.id})">
            <span>${tarea.texto}</span>
            <button onclick="borrarTarea(${tarea.id})">❌</button>
        `;
        listaTareas.appendChild(li);
    });

    // d) Actualizamos el contador de pendientes (Usando filter otra vez)
    const numPendientes = tareas.filter(tarea => tarea.completada === false).length;
    contador.innerText = numPendientes;
}

// --- 4. ACCIONES (Las funciones que modifican el array) ---

// Añadir tarea
function agregarTarea() {
    const texto = inputTarea.value.trim();
    if (texto !== "") {
        const nuevaTarea = {
            id: Date.now(), // Un truco para dar un ID único rápido
            texto: texto,
            completada: false
        };
        tareas.push(nuevaTarea); // Al array general
        inputTarea.value = ""; // Limpiamos el input
        renderizar(); // Redibujamos la pantalla
    }
}

// Marcar/Desmarcar
function marcarCompletada(id) {
    // Buscamos la tarea y le damos la vuelta a su booleano (si es true pasa a false y viceversa)
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        renderizar();
    }
}

// Borrar individual
function borrarTarea(id) {
    // Nos quedamos con todas las tareas MENOS la que queremos borrar
    tareas = tareas.filter(tarea => tarea.id !== id);
    renderizar();
}

// --- 5. EVENTOS (Escuchando los clics del usuario) ---

// Botón de añadir y tecla Enter
btnAgregar.addEventListener("click", agregarTarea);
inputTarea.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") agregarTarea();
});

// Botones de filtros
document.getElementById("btnTodas").addEventListener("click", () => {
    filtroActual = "todas";
    renderizar();
});
document.getElementById("btnPendientes").addEventListener("click", () => {
    filtroActual = "pendientes";
    renderizar();
});
document.getElementById("btnCompletadas").addEventListener("click", () => {
    filtroActual = "completadas";
    renderizar();
});

// Botón Limpiar Completadas
btnLimpiar.addEventListener("click", () => {
    // Machacamos el array original quedándonos solo con las pendientes
    tareas = tareas.filter(tarea => tarea.completada === false);
    renderizar();
});

// Arrancamos la aplicación dibujando la pantalla vacía por primera vez
renderizar();