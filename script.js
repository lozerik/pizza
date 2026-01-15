

/*Esto es para que el boton de portada tenga como un ""latido""" */

const btnReserva = document.querySelector('.reserva-btn-main');

function latido() {
    btnReserva.style.transform = "scale(1.1)";
    setTimeout(() => {
        btnReserva.style.transform = "scale(1)";
    }, 200);
}
setInterval(latido, 3000);
