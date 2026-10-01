/* =========================================================
   KIVO - JAVASCRIPT DEL MÓDULO FAVORITOS
========================================================= */


/* =========================================================
   FAVORITOS - FUNCIONES COMPARTIDAS (localStorage)
   El mismo bloque está en Inicio, Favoritos y Cerca de ti:
   usan la misma clave, por eso quedan conectados.
========================================================= */

const CLAVE_FAVORITOS = "kivoFavoritos";


/* Evita que un texto rompa el HTML al pintarlo con innerHTML */

function escaparHTML(texto) {

    const reemplazos = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return String(texto ?? "").replace(/[&<>"']/g, function (caracter) {
        return reemplazos[caracter];
    });
}


function obtenerFavoritos() {

    try {

        const datos = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS));

        return {
            productos: (datos && datos.productos) || {},
            emprendimientos: (datos && datos.emprendimientos) || {}
        };

    } catch (error) {

        return { productos: {}, emprendimientos: {} };
    }
}


function guardarFavoritos(favoritos) {

    try {

        localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));

    } catch (error) {

        console.warn("KIVO: no se pudo guardar en el navegador.", error);
    }
}


function quitarFavorito(tipo, id) {

    const favoritos = obtenerFavoritos();

    delete favoritos[tipo][id];

    guardarFavoritos(favoritos);
}


/* =========================================================
   NAVEGACIÓN (favoritos.html está en /Modulos/favoritos/)
========================================================= */

/* LOGO */

const logoKivo = document.getElementById("logoKivo");

logoKivo.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../inicio.html";

});


/* INICIO */

const navInicio = document.getElementById("navInicio");

navInicio.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../inicio.html";

});


/* CATÁLOGO */

const navCatalogo = document.getElementById("navCatalogo");

navCatalogo.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../catalogo/catalogo.html";

});


/* EMPRENDIMIENTOS */

const navEmprendimientos = document.getElementById("navEmprendimientos");

navEmprendimientos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../emprendimientos/emprendimientos.html";

});


/* FAVORITOS */

const navFavoritos = document.getElementById("navFavoritos");

navFavoritos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "favoritos.html";

});


/* CERCA DE TI */

const navCerca = document.getElementById("navCerca");

navCerca.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../cerca_ti/cerca_ti.html";

});


/* SOPORTE */

const navSoporte = document.getElementById("navSoporte");

navSoporte.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../soporte/soporte.html";

});


/* INICIO DE SESIÓN */

const btnIniciarSesion = document.getElementById("btnIniciarSesion");

btnIniciarSesion.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../inicio_sesion/inicio_sesion.html";

});


/* REGISTRO */

const btnRegistrate = document.getElementById("btnRegistrate");

btnRegistrate.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../registro/registro.html";

});


/* IR AL CATÁLOGO (encabezado de productos) */

const linkIrCatalogo = document.getElementById("linkIrCatalogo");

linkIrCatalogo.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../catalogo/catalogo.html";

});


/* EXPLORAR PRODUCTOS (cuando no hay favoritos) */

const btnExplorarProductos = document.getElementById("btnExplorarProductos");

btnExplorarProductos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../inicio.html";

});


/* VER CERCA DE TI (encabezado de emprendimientos) */

const linkVerCerca = document.getElementById("linkVerCerca");

linkVerCerca.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../cerca_ti/cerca_ti.html";

});


/* VER EMPRENDIMIENTOS (cuando no hay favoritos) */

const btnVerEmprendimientos = document.getElementById("btnVerEmprendimientos");

btnVerEmprendimientos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "../emprendimientos/emprendimientos.html";

});


/* MENÚ MOBILE DE BULMA */

const navbarBurger = document.getElementById("navbarBurger");
const navbarMenu = document.getElementById("navbarMenu");

navbarBurger.addEventListener("click", function () {

    navbarBurger.classList.toggle("is-active");

    navbarMenu.classList.toggle("is-active");

});


/* =========================================================
   ELEMENTOS DE LA PÁGINA
========================================================= */

const gridProductos = document.getElementById("gridProductos");
const vacioProductos = document.getElementById("vacioProductos");
const contadorProductos = document.getElementById("contadorProductos");

const gridEmprendimientos = document.getElementById("gridEmprendimientos");
const vacioEmprendimientos = document.getElementById("vacioEmprendimientos");
const contadorEmprendimientos = document.getElementById("contadorEmprendimientos");


/* =========================================================
   TARJETAS
========================================================= */

function crearTarjetaProducto(producto) {

    const imagen = producto.imagen
        ? `<img src="${escaparHTML(producto.imagen)}" alt="${escaparHTML(producto.nombre)}"
                onerror="this.style.display='none'">`
        : "";

    return `
        <article class="fav-card">

            <div class="fav-imagen">
                ${imagen}
                <span class="etiqueta-kivo">${escaparHTML(producto.categoria)}</span>
                <button class="fav-quitar" type="button"
                        data-tipo="productos"
                        data-id="${escaparHTML(producto.id)}"
                        aria-label="Quitar de favoritos">♥</button>
            </div>

            <div class="fav-info">
                <h3>${escaparHTML(producto.nombre)}</h3>
                <p class="fav-vendedor">${escaparHTML(producto.vendedor)}</p>
                <strong class="fav-precio">${escaparHTML(producto.precio)}</strong>
            </div>

        </article>
    `;
}


function crearTarjetaEmprendimiento(emprendimiento) {

    const imagen = emprendimiento.imagen
        ? `<img src="${escaparHTML(emprendimiento.imagen)}" alt="${escaparHTML(emprendimiento.nombre)}"
                onerror="this.style.display='none'">`
        : "";

    return `
        <article class="fav-card">

            <div class="fav-imagen">
                🏪
                ${imagen}
                <button class="fav-quitar" type="button"
                        data-tipo="emprendimientos"
                        data-id="${escaparHTML(emprendimiento.id)}"
                        aria-label="Quitar de favoritos">♥</button>
            </div>

            <div class="fav-info">
                <h3>${escaparHTML(emprendimiento.nombre)}</h3>
                <p class="fav-categoria">${escaparHTML(emprendimiento.categoria)}</p>
                <p class="fav-descripcion">${escaparHTML(emprendimiento.descripcion)}</p>
            </div>

        </article>
    `;
}


/* =========================================================
   PINTAR FAVORITOS
========================================================= */

function pintarFavoritos() {

    const favoritos = obtenerFavoritos();

    // Los últimos guardados primero
    const productos = Object.values(favoritos.productos).reverse();
    const emprendimientos = Object.values(favoritos.emprendimientos).reverse();

    gridProductos.innerHTML = productos.map(crearTarjetaProducto).join("");
    gridEmprendimientos.innerHTML = emprendimientos.map(crearTarjetaEmprendimiento).join("");

    contadorProductos.textContent =
        productos.length + (productos.length === 1 ? " producto guardado" : " productos guardados");

    contadorEmprendimientos.textContent =
        emprendimientos.length + (emprendimientos.length === 1 ? " emprendimiento guardado" : " emprendimientos guardados");

    vacioProductos.hidden = productos.length > 0;
    vacioEmprendimientos.hidden = emprendimientos.length > 0;
}


/* =========================================================
   QUITAR DE FAVORITOS (corazón de cada tarjeta)
========================================================= */

document.addEventListener("click", function (evento) {

    const boton = evento.target.closest(".fav-quitar");

    if (!boton) {
        return;
    }

    quitarFavorito(boton.dataset.tipo, boton.dataset.id);

    pintarFavoritos();
});


/* Si cambias un favorito en otra pestaña, esta se actualiza sola */

window.addEventListener("storage", pintarFavoritos);


pintarFavoritos();

console.log("KIVO - Módulo Favoritos cargado correctamente.");