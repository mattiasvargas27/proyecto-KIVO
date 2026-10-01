/* =========================================================
   KIVO - JAVASCRIPT DEL MÓDULO EMPRENDIMIENTOS
   Rutas desde la raíz de Live Server (empiezan con "/")
========================================================= */


/* =========================================================
   NAVEGACIÓN DEL NAVBAR
========================================================= */


/* LOGO */

const logoKivo = document.getElementById("logoKivo");

logoKivo.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "/Modulos/inicio.html";

});


/* INICIO */

const navInicio = document.getElementById("navInicio");

navInicio.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "/Modulos/inicio.html";

});


/* CATÁLOGO */

const navCatalogo = document.getElementById("navCatalogo");

navCatalogo.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "/Modulos/catalogo/catalogo.html";

});


/* EMPRENDIMIENTOS */

const navEmprendimientos = document.getElementById("navEmprendimientos");

navEmprendimientos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "/Modulos/emprendimientos/emprendimientos.html";

});


/* SOPORTE */

const navSoporte = document.getElementById("navSoporte");

navSoporte.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "/Modulos/soporte/soporte.html";

});
/* FAVORITOS */

const navFavoritos = document.getElementById("navFavoritos");

navFavoritos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "/Modulos/favoritos/favoritos.html";

});
/*CERCA DE TI */

const navCerca = document.getElementById("navCerca");

navCerca.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "/Modulos/cerca_ti/cerca_ti.html";

});



/* BOTÓN REGÍSTRATE */

const btnRegistro = document.getElementById("btnRegistrate");

btnRegistro.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../registro/registro.html";

});


/* BOTÓN INICIA SESIÓN */

const btnSesion = document.getElementById("btnIniciarSesion");

btnSesion.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../inicio_sesion/inicio_sesion.html";

});


/* =========================================================
   ELEMENTOS DE BÚSQUEDA Y CATEGORÍAS
========================================================= */

const botonesCategoria = document.querySelectorAll(".categoria");
const tarjetas = document.querySelectorAll(".tarjeta");
const buscador = document.getElementById("buscar");
const sinResultados = document.getElementById("sin-resultados");


/* =========================================================
   MOSTRAR / OCULTAR TARJETAS
========================================================= */

function mostrarTarjetas(categoria, texto) {

    let cantidadVisible = 0;

    const busqueda = texto.toLowerCase().trim();

    tarjetas.forEach(function (tarjeta) {

        const nombre = tarjeta.dataset.nombre.toLowerCase();
        const categoriaTarjeta = tarjeta.dataset.categoria;

        const coincideCategoria =
            categoria === "todos" ||
            categoriaTarjeta === categoria;

        const coincideBusqueda =
            busqueda === "" ||
            nombre.includes(busqueda);

        if (coincideCategoria && coincideBusqueda) {

            // "" devuelve la tarjeta a su display original (flex del CSS)
            tarjeta.style.display = "";

            cantidadVisible++;

        } else {

            tarjeta.style.display = "none";

        }

    });

    sinResultados.style.display = cantidadVisible === 0 ? "block" : "none";
}


/* =========================================================
   CATEGORÍAS
========================================================= */

botonesCategoria.forEach(function (boton) {

    boton.addEventListener("click", function () {

        botonesCategoria.forEach(function (item) {
            item.classList.remove("seleccionada");
        });

        boton.classList.add("seleccionada");

        mostrarTarjetas(boton.dataset.categoria, buscador.value);

    });

});


/* =========================================================
   BUSCADOR (al escribir)
========================================================= */

buscador.addEventListener("input", function () {

    const categoriaActiva =
        document.querySelector(".categoria.seleccionada").dataset.categoria;

    mostrarTarjetas(categoriaActiva, buscador.value);

});


/* =========================================================
   BOTÓN DE BÚSQUEDA (lo llama el onclick del HTML)
========================================================= */

function buscarEmprendimiento() {

    const categoriaActiva =
        document.querySelector(".categoria.seleccionada").dataset.categoria;

    mostrarTarjetas(categoriaActiva, buscador.value);

}


console.log("KIVO - Módulo Emprendimientos cargado correctamente.");