/*Esto es para que el boton de portada tenga como un ""latido""" */

const btnReserva = document.querySelector('.reserva-btn-main');

function latido() {
    btnReserva.style.transform = "scale(1.1)";
    setTimeout(() => {
        btnReserva.style.transform = "scale(1)";
    }, 200);
}
setInterval(latido, 3000);

// Añadido por Mike: es una función que muestra la sección del botón pulsado.
function filtrar(categoria) {
   
    const secciones = document.querySelectorAll('.menu-section');
    
    secciones.forEach(seccion => {
            if (seccion.id === categoria) {
                seccion.style.display = 'block';
            } else {
                seccion.style.display = 'none';
            }
        }
    );
}



