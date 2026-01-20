let menuData = {}; 
let indices = {};  

const btnReserva = document.querySelector('.reserva-btn-main');

setInterval(() => {
    if(btnReserva) {
        btnReserva.style.transform = "scale(1.1)";
        setTimeout(() => btnReserva.style.transform = "scale(1)", 200);
    }
}, 3000);

async function cargarMenu() {
    try {
        const response = await fetch('datos.json');
        menuData = await response.json();
        inicializarSecciones();
    } catch (error) {
        console.error("Error cargando el menú:", error);
    }
}

function filtrar(categoria) {
    document.querySelectorAll('.menu-section').forEach(sec => {
        // Solo muestra la seccion cuyo ID coincide con el boton pulsado
        sec.style.display = (sec.id === categoria) ? 'block' : 'none';
    });
}

function inicializarSecciones() {
    document.querySelectorAll('.menu-card').forEach(card => {
        const titulo = card.querySelector('.section-title').innerText.trim();
        // Crea una clave unica (ej. pizzas_classic) para trackear el indice de cada slider
        const key = titulo.toLowerCase().replace(/\s+/g, '_');
        indices[key] = 0;

        card.querySelector('.flecha-btn').onclick = () => cambiarProducto(card, titulo, -1);
        card.querySelector('.flecha-btn-2').onclick = () => cambiarProducto(card, titulo, 1);

        cambiarProducto(card, titulo, 0);
    });
}

function obtenerProductosPorTitulo(titulo) {
    const sK = titulo.toLowerCase();
    // Mapeo manual para vincular los titulos del HTML con las rutas del JSON
    if (sK === "fritos") return menuData.entrantes.fritos;
    if (sK === "tapas") return menuData.entrantes.tapas;
    if (sK.includes("classic")) return sK.includes("menú") ? menuData.promociones.clasicas : menuData.pizzas.clasicas;
    if (sK.includes("deluxe")) return sK.includes("menú") ? menuData.promociones.deluxe : menuData.pizzas.deluxe;
    if (sK === "refrescos") return menuData.bebidas.refrescos;
    if (sK === "infusiones") return menuData.bebidas.infusiones;
    if (sK === "batidos") return menuData.postres.batidos;
    if (sK === "dulces") return menuData.postres.dulces;
    return [];
}

function cambiarProducto(card, tituloSeccion, direccion) {
    const keyIndex = tituloSeccion.toLowerCase().replace(/\s+/g, '_');
    const productos = obtenerProductosPorTitulo(tituloSeccion);

    if (!productos.length) return;

    // Actualiza el indice y crea un bucle infinito (del ultimo vuelve al primero)
    indices[keyIndex] += direccion;
    if (indices[keyIndex] >= productos.length) indices[keyIndex] = 0;
    if (indices[keyIndex] < 0) indices[keyIndex] = productos.length - 1;

    const item = productos[indices[keyIndex]];
    card.querySelector('.p-nombre').innerText = item.nombre;
    card.querySelector('.p-precio').innerText = item.precio;
    // Asume que las imagenes son archivos .webp
    card.querySelector('.p-img').src = item.imagen + ".webp";
    
    const desc = card.querySelector('.p-desc');
    if (desc) {
        // Muestra ingredientes o cantidad segun lo que este disponible en el JSON
        desc.innerText = item.ingredientes || item.descripcion || `Cantidad: ${item.unidades || item.cantidad}`;
    }
}

function buscarProducto() {
    const query = document.getElementById('menuSearch').value.toLowerCase().trim();
    const res = document.getElementById('searchResults');
    
    if (query.length < 2) { 
        res.style.display = 'none'; 
        return; 
    }

    let html = "";
    // Triple bucle para rastrear: Categoria -> Subcategoria -> Producto
    for (let cat in menuData) {
        for (let sub in menuData[cat]) {
            menuData[cat][sub].forEach(p => {
                if (p.nombre.toLowerCase().includes(query)) {
                    let nombreSubCard = traducirSub(sub, cat);
                    // Al hacer click, envia categoria, subcategoria y nombre exacto
                    html += `<div class="search-item" onclick="seleccionarExacto('${cat}', '${nombreSubCard}', '${p.nombre}')">
                        <strong>${p.nombre}</strong> <br><small>${cat} > ${nombreSubCard}</small>
                    </div>`;
                }
            });
        }
    }
    res.innerHTML = html || '<div class="search-item">Sin resultados</div>';
    res.style.display = 'block';
}

function traducirSub(sub, cat) {
    // Convierte terminos del JSON a los nombres reales de las etiquetas h2 del HTML
    const mapa = {
        "fritos": "Fritos", 
        "tapas": "Tapas", 
        "refrescos": "Refrescos", 
        "infusiones": "Infusiones", 
        "batidos": "Batidos", 
        "dulces": "Dulces",
        "clasicas": (cat === "pizzas") ? "Pizzas Classic" : "Menús Pizzas Classic",
        "deluxe": (cat === "pizzas") ? "Pizzas Deluxe" : "Menús Pizzas Deluxe"
    };
    return mapa[sub] || sub;
}

function seleccionarExacto(idSeccion, tituloCard, nombreProd) {
    filtrar(idSeccion);
    
    const cards = document.querySelectorAll(`#${idSeccion} .menu-card`);
    cards.forEach(card => {
        const h2 = card.querySelector('.section-title').innerText.trim();
        // Solo actua sobre la tarjeta que contiene el producto buscado
        if (h2 === tituloCard) {
            const productos = obtenerProductosPorTitulo(tituloCard);
            const index = productos.findIndex(p => p.nombre === nombreProd);
            
            if (index !== -1) {
                const key = tituloCard.toLowerCase().replace(/\s+/g, '_');
                // Sincroniza el slider para que muestre el producto encontrado
                indices[key] = index; 
                cambiarProducto(card, tituloCard, 0); 
                // Centra la pantalla en el producto encontrado
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('menuSearch').value = '';
}

document.addEventListener('click', (e) => {
    const container = document.querySelector('.search-container');
    if (container && !container.contains(e.target)) {
        document.getElementById('searchResults').style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", cargarMenu);
