/* ============================================================
   1. EFECTO VISUAL: LATIDO DEL BOTÓN DE RESERVA
   ============================================================ */
const btnReserva = document.querySelector('.reserva-btn-main');

function latido() {
    // Verificamos existencia para evitar errores en consola si el botón no está en el DOM
    if (btnReserva) {
        btnReserva.style.transition = "transform 0.2s";
        btnReserva.style.transform = "scale(1.1)";
        setTimeout(() => {
            btnReserva.style.transform = "scale(1)";
        }, 200);
    }
}
// El botón "late" cada 3 segundos
setInterval(latido, 3000);

/* ============================================================
   2. SISTEMA DE FILTRADO POR CATEGORÍAS
   (Añadido por Mike: Muestra la sección del botón pulsado)
   ============================================================ */
function filtrar(categoria) {
    const secciones = document.querySelectorAll('.menu-section');
    
    secciones.forEach(seccion => {
        if (seccion.id === categoria) {
            seccion.style.display = 'block';
        } else {
            seccion.style.display = 'none';
        }
    });
}

/* ============================================================
   3. LÓGICA DE CARGA DINÁMICA Y SLIDERS (JSON)
   ============================================================ */
let menuData = {}; // Almacena los datos del JSON
let indices = {};  // Controla el índice actual de cada slider

// Función para cargar el archivo de datos
async function cargarMenu() {
    try {
        const response = await fetch('datos.json');
        menuData = await response.json();
        inicializarSecciones();
    } catch (error) {
        console.error("Error cargando el menú (datos.json no encontrado):", error);
    }
}

// Configura los eventos de las flechas y rellena la info inicial
function inicializarSecciones() {
    const cards = document.querySelectorAll('.menu-card');

    cards.forEach(card => {
        const tituloSeccion = card.querySelector('.section-title').innerText.trim();
        
        // Creamos una clave única para los índices (ej: "fritos", "pizzas_classic")
        const key = tituloSeccion.toLowerCase().replace(/\s+/g, '_');
        indices[key] = 0;

        // Configurar botones de navegación
        const btnIzq = card.querySelector('.flecha-btn, .flecha-btn:first-of-type, #flechaIzq');
        const btnDer = card.querySelector('.flecha-btn-2, .flecha-btn-2:last-of-type, #flechaDer');

        if (btnDer) btnDer.onclick = () => cambiarProducto(card, tituloSeccion, 1);
        if (btnIzq) btnIzq.onclick = () => cambiarProducto(card, tituloSeccion, -1);

        // Carga el primer producto inmediatamente
        cambiarProducto(card, tituloSeccion, 0);
    });
}

/**
 * Lógica para mapear el título de la sección con los datos del JSON
 * y actualizar el contenido visual de la tarjeta.
 */
function cambiarProducto(card, tituloSeccion, direccion) {
    const keyIndex = tituloSeccion.toLowerCase().replace(/\s+/g, '_');
    const searchKey = tituloSeccion.toLowerCase();
    
    let productos = [];

    // Mapeo de categorías basado en el texto del título
    if (searchKey === "fritos") productos = menuData.entrantes?.fritos;
    else if (searchKey === "tapas") productos = menuData.entrantes?.tapas;
    else if (searchKey.includes("classic")) {
        productos = searchKey.includes("menú") ? menuData.promociones?.clasicas : menuData.pizzas?.clasicas;
    } 
    else if (searchKey.includes("deluxe")) {
        productos = searchKey.includes("menú") ? menuData.promociones?.deluxe : menuData.pizzas?.deluxe;
    }
    else if (searchKey === "refrescos") productos = menuData.bebidas?.refrescos;
    else if (searchKey === "infusiones") productos = menuData.bebidas?.infusiones;
    else if (searchKey === "batidos") productos = menuData.postres?.batidos;
    else if (searchKey === "dulces") productos = menuData.postres?.dulces;

    // Si no se encuentran productos para esa categoría, salimos
    if (!productos || productos.length === 0) return;

    // Actualización circular del índice
    indices[keyIndex] += direccion;
    if (indices[keyIndex] >= productos.length) indices[keyIndex] = 0;
    if (indices[keyIndex] < 0) indices[keyIndex] = productos.length - 1;

    // Extraemos el objeto del producto actual
    const item = productos[indices[keyIndex]];

    // Actualización del DOM
    const nombreElemento = card.querySelector('.p-nombre');
    const precioElemento = card.querySelector('.p-precio');
    const imagenElemento = card.querySelector('.p-img');
    const descElemento = card.querySelector('.p-desc');

    if (nombreElemento) nombreElemento.innerText = item.nombre;
    if (precioElemento) precioElemento.innerText = item.precio;
    
    if (imagenElemento) {
        // Se asume que en el JSON viene el nombre base y aquí añadimos la extensión
        imagenElemento.src = item.imagen.includes('.') ? item.imagen : item.imagen + ".webp"; 
        imagenElemento.alt = item.nombre;
    }

    if (descElemento) {
        descElemento.innerText = item.ingredientes || item.descripcion || `Cantidad: ${item.unidades || item.cantidad}`;
    }
}

/* ============================================================
   4. INICIALIZACIÓN AL CARGAR EL DOCUMENTO
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    cargarMenu();
});
