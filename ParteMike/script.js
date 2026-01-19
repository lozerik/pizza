// EFECTO LATIDO DEL BOTÓN PRINCIPAL
const btnReserva = document.querySelector('.reserva-btn-main');

function latido() {
    if (btnReserva) {
        btnReserva.style.transition = "transform 0.2s";
        btnReserva.style.transform = "scale(1.1)";
        setTimeout(() => {
            btnReserva.style.transform = "scale(1)";
        }, 200);
    }
}
setInterval(latido, 3000);

// FILTRADO POR CATEGORÍAS
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

// LÓGICA DE CARGA DINÁMICA DEL MENÚ
let menuData = {}; // Datos del JSON
let indices = {};  // Control de qué producto estamos viendo en cada sección

// Cargar el JSON al iniciar
async function cargarMenu() {
    try {
        const response = await fetch('datos.json');
        menuData = await response.json();
        inicializarSecciones();
    } catch (error) {
        console.error("Error cargando el menú:", error);
    }
}

// Configurar flechas y CARGAR DATOS INICIALES
function inicializarSecciones() {
    const cards = document.querySelectorAll('.menu-card');

    cards.forEach(card => {
        // Obtenemos el título (ej: "Menús Pizzas Classic" o "Fritos")
        const tituloSeccion = card.querySelector('.section-title').innerText.trim();
        
        // Creamos una clave única para los índices interna
        const key = tituloSeccion.toLowerCase().replace(/\s+/g, '_');
        indices[key] = 0;

        // Configurar botones de navegación
        const btnIzq = card.querySelector('.flecha-btn:first-of-type');
        const btnDer = card.querySelector('.flecha-btn-2:last-of-type');

        btnDer.onclick = () => cambiarProducto(card, tituloSeccion, 1);
        btnIzq.onclick = () => cambiarProducto(card, tituloSeccion, -1);

        // LLAMADA CLAVE
        // Esto hace que se rellene la info de "Cargando..." por el primer producto del JSON
        cambiarProducto(card, tituloSeccion, 0);
    });
}

// Lógica para cambiar de producto y actualizar el HTML
function cambiarProducto(card, tituloSeccion, direccion) {
    const keyIndex = tituloSeccion.toLowerCase().replace(/\s+/g, '_');
    const searchKey = tituloSeccion.toLowerCase();
    
    let productos = [];

    // Mapeo refinado según tu estructura JSON
    if (searchKey === "fritos") productos = menuData.entrantes.fritos;
    else if (searchKey === "tapas") productos = menuData.entrantes.tapas;
    else if (searchKey.includes("classic")) {
        productos = searchKey.includes("menú") ? menuData.promociones.clasicas : menuData.pizzas.clasicas;
    } 
    else if (searchKey.includes("deluxe")) {
        productos = searchKey.includes("menú") ? menuData.promociones.deluxe : menuData.pizzas.deluxe;
    }
    else if (searchKey === "refrescos") productos = menuData.bebidas.refrescos;
    else if (searchKey === "infusiones") productos = menuData.bebidas.infusiones;
    else if (searchKey === "batidos") productos = menuData.postres.batidos;
    else if (searchKey === "dulces") productos = menuData.postres.dulces;

    if (!productos || productos.length === 0) return;

    // Actualizar el índice circularmente
    indices[keyIndex] += direccion;
    if (indices[keyIndex] >= productos.length) indices[keyIndex] = 0;
    if (indices[keyIndex] < 0) indices[keyIndex] = productos.length - 1;

    // Obtener el producto actual
    const item = productos[indices[keyIndex]];

    // Actualizar el DOM (Nombre, Precio, Imagen)
    card.querySelector('.p-nombre').innerText = item.nombre;
    card.querySelector('.p-precio').innerText = item.precio;
    
    // Imagen: Se añade .webp si no lo tiene en el JSON
    const imagenElemento = card.querySelector('.p-img');
    imagenElemento.src = item.imagen + ".webp"; 
    imagenElemento.alt = item.nombre;

    // Actualizar descripción o ingredientes
    const desc = card.querySelector('.p-desc');
    if (desc) {
        desc.innerText = item.ingredientes || item.descripcion || `Cantidad: ${item.unidades || item.cantidad}`;
    }
}

// Iniciar proceso cuando el HTML esté listo
document.addEventListener("DOMContentLoaded", cargarMenu);