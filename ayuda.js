function mostrar(pregunta) {
    if (document.getElementById(pregunta).style.display == 'block') {
        document.getElementById(pregunta).style.display = 'none'
    }
    else {
        document.getElementById(pregunta).style.display = 'block'
    }
}