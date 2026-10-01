/* =========================================================
   KIVO - JAVASCRIPT DEL MÓDULO INICIO
========================================================= */


/* =========================================================
   FAVORITOS - FUNCIONES COMPARTIDAS (localStorage)
   El mismo bloque está en Inicio, Favoritos y Cerca de ti:
   usan la misma clave, por eso quedan conectados.
========================================================= */

const CLAVE_FAVORITOS = "kivoFavoritos";


/* Convierte "Café de Origen" en "cafe-de-origen" (id único) */

function crearId(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
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


/* tipo: "productos" o "emprendimientos" */

function esFavorito(tipo, id) {

    return Boolean(obtenerFavoritos()[tipo][id]);
}


/* Agrega o quita. Devuelve true si quedó como favorito */

function alternarFavorito(tipo, item) {

    const favoritos = obtenerFavoritos();

    let activo;

    if (favoritos[tipo][item.id]) {

        delete favoritos[tipo][item.id];
        activo = false;

    } else {

        favoritos[tipo][item.id] = item;
        activo = true;
    }

    guardarFavoritos(favoritos);

    return activo;
}


/* =========================================================
   PRODUCTOS DISPONIBLES (para buscar y filtrar)
========================================================= */

const productos = [
    {
        id: "productoCard1",
        nombre: "Brownie Artesanal",
        categoria: "alimentos",
        vendedor: "Dulce Tradición"
    },

    {
        id: "productoCard2",
        nombre: "Café de Origen caldense",
        categoria: "alimentos",
        vendedor: "Montaña Negra"
    },

    {
        id: "productoCard3",
        nombre: "Audífonos Apple 2 generación",
        categoria: "tecnologia",
        vendedor: "TechLocal"
    },

    {
        id: "productoCard4",
        nombre: "Kit Skincare Natural",
        categoria: "belleza",
        vendedor: "Tierra Viva"
    },

    {
        id: "productoCard5",
        nombre: "Mochilas wayuu",
        categoria: "artesanias",
        vendedor: "Yahandra Artesanías"
    }
];


/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */

const inputBusqueda = document.getElementById("inputBusquedaHero");
const botonBuscar = document.getElementById("btnBuscarHero");

const categoriaTodos = document.getElementById("categoriaTodos");
const categoriaAlimentos = document.getElementById("categoriaAlimentos");
const categoriaArtesanias = document.getElementById("categoriaArtesanias");
const categoriaModa = document.getElementById("categoriaModa");
const categoriaBelleza = document.getElementById("categoriaBelleza");
const categoriaHogar = document.getElementById("categoriaHogar");
const categoriaTecnologia = document.getElementById("categoriaTecnologia");

const botonFiltros = document.getElementById("btnFiltros");

const productosGrid = document.getElementById("productosGrid");


/* =========================================================
   MOSTRAR / OCULTAR PRODUCTOS
========================================================= */

function mostrarProductos(productosEncontrados) {

    productos.forEach(producto => {

        const tarjeta = document.getElementById(producto.id);

        if (!tarjeta) {
            return;
        }

        const columna = tarjeta.closest(".column");

        if (productosEncontrados.includes(producto)) {
            columna.style.display = "";
        } else {
            columna.style.display = "none";
        }

    });

    mostrarMensajeSinResultados(productosEncontrados.length === 0);
}


/* =========================================================
   MENSAJE CUANDO NO HAY RESULTADOS
========================================================= */

function mostrarMensajeSinResultados(mostrar) {

    let mensaje = document.getElementById("mensajeSinResultados");

    if (mostrar) {

        if (!mensaje) {

            mensaje = document.createElement("div");

            mensaje.id = "mensajeSinResultados";

            mensaje.className = "notification";

            mensaje.innerHTML = `
                <strong>No encontramos productos.</strong>
                <br>
                Intenta buscar otro producto o seleccionar otra categoría.
            `;

            productosGrid.appendChild(mensaje);
        }

    } else {

        if (mensaje) {
            mensaje.remove();
        }

    }
}


/* =========================================================
   BÚSQUEDA
========================================================= */

function buscarProductos() {

    const textoBusqueda = inputBusqueda.value
        .toLowerCase()
        .trim();

    if (textoBusqueda === "") {

        mostrarProductos(productos);

        return;
    }

    const resultados = productos.filter(producto => {

        const nombre = producto.nombre.toLowerCase();
        const categoria = producto.categoria.toLowerCase();
        const vendedor = producto.vendedor.toLowerCase();

        return (
            nombre.includes(textoBusqueda) ||
            categoria.includes(textoBusqueda) ||
            vendedor.includes(textoBusqueda)
        );

    });

    mostrarProductos(resultados);
}

botonBuscar.addEventListener("click", function () {

    buscarProductos();

});

inputBusqueda.addEventListener("keydown", function (evento) {

    if (evento.key === "Enter") {

        evento.preventDefault();

        buscarProductos();

    }

});


/* =========================================================
   FILTRAR POR CATEGORÍA
========================================================= */

function filtrarCategoria(categoria) {

    if (categoria === "todos") {

        mostrarProductos(productos);

        return;
    }

    const resultados = productos.filter(producto => {

        return producto.categoria === categoria;

    });

    mostrarProductos(resultados);
}

categoriaTodos.addEventListener("click", function () {

    filtrarCategoria("todos");

});

categoriaAlimentos.addEventListener("click", function () {

    filtrarCategoria("alimentos");

});

categoriaArtesanias.addEventListener("click", function () {

    filtrarCategoria("artesanias");

});

categoriaModa.addEventListener("click", function () {

    filtrarCategoria("moda");

});

categoriaBelleza.addEventListener("click", function () {

    filtrarCategoria("belleza");

});

categoriaHogar.addEventListener("click", function () {

    filtrarCategoria("hogar");

});

categoriaTecnologia.addEventListener("click", function () {

    filtrarCategoria("tecnologia");

});


/* =========================================================
   FAVORITOS (productos y emprendimientos)
   Se guardan con las funciones de arriba
========================================================= */

function leerTexto(id) {

    const elemento = document.getElementById(id);

    return elemento ? elemento.textContent.replace(/\s+/g, " ").trim() : "";
}

function leerImagen(tarjetaId) {

    const imagen = document.querySelector("#" + tarjetaId + " img");

    // Ruta absoluta para que también se vea desde la carpeta de Favoritos
    return imagen ? new URL(imagen.src).pathname : "";
}

function pintarCorazon(boton, activo) {

    boton.classList.toggle("favoritoActivo", activo);

    boton.innerHTML = activo ? "♥" : "♡";

    boton.setAttribute(
        "aria-label",
        activo ? "Quitar de favoritos" : "Agregar a favoritos"
    );
}

function conectarFavorito(boton, tipo, crearItem) {

    function sincronizar() {
        pintarCorazon(boton, esFavorito(tipo, crearItem().id));
    }

    sincronizar();

    boton.addEventListener("click", function () {
        pintarCorazon(boton, alternarFavorito(tipo, crearItem()));
    });

    // Si vuelves desde Favoritos o cambias algo en otra pestaña
    window.addEventListener("pageshow", sincronizar);
    window.addEventListener("storage", sincronizar);
}


/* PRODUCTOS */

document.querySelectorAll('[id^="btnFavoritoProducto"]').forEach(function (boton) {

    const numero = boton.id.replace("btnFavoritoProducto", "");

    conectarFavorito(boton, "productos", function () {

        const nombre = leerTexto("productoNombre" + numero);

        return {
            id: crearId(nombre),
            nombre: nombre,
            categoria: leerTexto("productoCategoria" + numero),
            vendedor: leerTexto("productoVendedor" + numero),
            precio: leerTexto("productoPrecio" + numero),
            imagen: leerImagen("productoCard" + numero)
        };
    });
});


/* EMPRENDIMIENTOS */

document.querySelectorAll('[id^="btnFavoritoEmprendimiento"]').forEach(function (boton) {

    const numero = boton.id.replace("btnFavoritoEmprendimiento", "");

    conectarFavorito(boton, "emprendimientos", function () {

        const nombre = leerTexto("emprendimientoNombre" + numero);

        return {
            id: crearId(nombre),
            nombre: nombre,
            categoria: leerTexto("emprendimientoCategoria" + numero),
            descripcion: leerTexto("emprendimientoDescripcion" + numero),
            imagen: leerImagen("emprendimientoCard" + numero)
        };
    });
});


/* =========================================================
   BOTÓN FILTROS
========================================================= */

botonFiltros.addEventListener("click", function () {

    alert(
        "Los filtros avanzados estarán disponibles próximamente."
    );

});


/* =========================================================
   NAVEGACIÓN (inicio.html está en /Modulos/)
========================================================= */

/* LOGO */

const logoKivo = document.getElementById("logoKivo");

logoKivo.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "inicio.html";

});


/* INICIO */

const navInicio = document.getElementById("navInicio");

navInicio.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "inicio.html";

});


/* CATÁLOGO */

const navCatalogo = document.getElementById("navCatalogo");

navCatalogo.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "catalogo/catalogo.html";

});


/* EMPRENDIMIENTOS */

const navEmprendimientos = document.getElementById("navEmprendimientos");

navEmprendimientos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "emprendimientos/emprendimientos.html";

});


/* FAVORITOS */

const navFavoritos = document.getElementById("navFavoritos");

navFavoritos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "favoritos/favoritos.html";

});


/* CERCA DE TI */

const navCerca = document.getElementById("navCerca");

navCerca.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "cerca_ti/cerca_ti.html";

});


/* SOPORTE */

const navSoporte = document.getElementById("navSoporte");

navSoporte.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "soporte/soporte.html";

});


/* INICIO DE SESIÓN */

const btnIniciarSesion = document.getElementById("btnIniciarSesion");

btnIniciarSesion.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "inicio_sesion/inicio_sesion.html";

});


/* REGISTRO */

const btnRegistrate = document.getElementById("btnRegistrate");

btnRegistrate.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "registro/registro.html";

});


/* VER TODOS LOS PRODUCTOS */

const linkVerTodosProductos = document.getElementById("linkVerTodosProductos");

linkVerTodosProductos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "catalogo/catalogo.html";

});


/* VER TODOS LOS EMPRENDIMIENTOS */

const linkVerTodosEmprendimientos = document.getElementById("linkVerTodosEmprendimientos");

linkVerTodosEmprendimientos.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "emprendimientos/emprendimientos.html";

});


/* =========================================================
   MENÚ MOBILE DE BULMA
========================================================= */

const navbarBurger = document.getElementById("navbarBurger");
const navbarMenu = document.getElementById("navbarMenu");

navbarBurger.addEventListener("click", function () {

    navbarBurger.classList.toggle("is-active");

    navbarMenu.classList.toggle("is-active");

});


console.log("KIVO - Módulo Inicio cargado correctamente.");