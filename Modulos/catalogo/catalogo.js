/* =========================================================
   KIVO - JAVASCRIPT DEL MÓDULO CATÁLOGO
========================================================= */


/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */

const buscarProducto = document.getElementById("buscarProducto");
const productos = document.querySelectorAll(".producto");
const categorias = document.querySelectorAll(".categoria");
const sinProductos = document.getElementById("sinProductos");

let categoriaActual = "todos";


/* =========================================================
   FILTRAR PRODUCTOS (texto + categoría)
========================================================= */

function filtrarProductos() {

    const texto = buscarProducto.value.toLowerCase().trim();

    let encontrados = 0;

    productos.forEach(function (producto) {

        const nombre = producto.dataset.nombre.toLowerCase();
        const categoria = producto.dataset.categoria;

        const coincideTexto = nombre.includes(texto);

        const coincideCategoria =
            categoriaActual === "todos" ||
            categoria === categoriaActual;

        if (coincideTexto && coincideCategoria) {
            producto.style.display = "block";
            encontrados++;
        } else {
            producto.style.display = "none";
        }

    });

    sinProductos.style.display = encontrados === 0 ? "block" : "none";
}


/* =========================================================
   BUSCADOR
========================================================= */

if (buscarProducto) {
    buscarProducto.addEventListener("input", filtrarProductos);
}


/* =========================================================
   CATEGORÍAS
========================================================= */

categorias.forEach(function (boton) {

    boton.addEventListener("click", function () {

        categorias.forEach(function (item) {
            item.classList.remove("activo");
        });

        boton.classList.add("activo");

        categoriaActual = boton.dataset.categoria;

        filtrarProductos();

    });

});


/* =========================================================
   NAVEGACIÓN DEL NAVBAR
   Rutas desde la raíz de Live Server (empiezan con "/")
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


/* INICIO DE SESIÓN */

const btnIniciarSesion = document.getElementById("btnIniciarSesion");

btnIniciarSesion.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "/Modulos/inicio_sesion/inicio_sesion.html";

});


/* REGISTRO */

const btnRegistrate = document.getElementById("btnRegistrate");

btnRegistrate.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "/Modulos/registro/registro.html";

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


/* =========================================================
   MENÚ MOBILE DE BULMA (una sola vez)
========================================================= */

const navbarBurger = document.getElementById("navbarBurger");
const navbarMenu = document.getElementById("navbarMenu");

navbarBurger.addEventListener("click", function () {

    navbarBurger.classList.toggle("is-active");

    navbarMenu.classList.toggle("is-active");

});


/* =========================================================
   MENSAJE INICIAL EN CONSOLA
========================================================= */

console.log("KIVO - Módulo Catálogo cargado correctamente.");