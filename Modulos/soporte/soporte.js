window.onload = function () {
    inicializarAcordeon();
    inicializarFormulario();
};

function inicializarAcordeon() {
    var preguntas = document.getElementsByClassName("kivo-faq-question");

    for (var i = 0; i < preguntas.length; i++) {
        preguntas[i].addEventListener("click", function () {
            alternarPregunta(this);
        });
    }
}

function alternarPregunta(boton) {
    var itemActual = boton.parentElement;
    var todosLosItems = document.getElementsByClassName("kivo-faq-item");
    var estabaAbierta = itemActual.classList.contains("is-open");

    for (var i = 0; i < todosLosItems.length; i++) {
        todosLosItems[i].classList.remove("is-open");
    }


    if (estabaAbierta === false) {
        itemActual.classList.add("is-open");
    }
}


function inicializarFormulario() {
    var formulario = document.getElementById("soporteForm");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault(); 
        mostrarMensajeExito();
        formulario.reset();
    });
}

function mostrarMensajeExito() {
    var mensaje = document.getElementById("formSuccess");
    mensaje.classList.remove("is-hidden");
}
const btnVolverInicio=document.getElementById("btnVolverInicio");

btnVolverInicio.addEventListener("click",function(evento){
    evento.preventDefault();

    window.location.href="/Modulos/inicio.html";
});