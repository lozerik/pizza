function mostrarMensaje() {
    var per = document.getElementById("numeroPer").value
    var hor = document.getElementById("hora").value
    var fecha = document.getElementById("dates").value
    var email = document.getElementById("email").value
    
    alert("La reserva para " + per + " personas se realizo para el " + fecha + " a las " + hor +"\nRevisa el correo: " + email)
}