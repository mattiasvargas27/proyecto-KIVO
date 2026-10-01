/* =========================================================
   KIVO - JAVASCRIPT DEL MÓDULO CERCA DE TI
   Usa Leaflet (mapa) y localStorage (favoritos)
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
   NAVEGACIÓN (cerca_ti.html está en /Modulos/cerca_ti/)
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

    window.location.href = "../favoritos/favoritos.html";

});


/* CERCA DE TI */

const navCerca = document.getElementById("navCerca");

navCerca.addEventListener("click", function (evento) {

    evento.preventDefault();

    window.location.href = "cerca_ti.html";

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


/* MENÚ MOBILE DE BULMA */

const navbarBurger = document.getElementById("navbarBurger");
const navbarMenu = document.getElementById("navbarMenu");

navbarBurger.addEventListener("click", function () {

    navbarBurger.classList.toggle("is-active");

    navbarMenu.classList.toggle("is-active");

});


/* =========================================================
   DATOS DE EJEMPLO
   Coordenadas de prueba (Manizales): cámbialas por las de tus
   emprendimientos reales. El nombre debe ser igual al de Inicio
   para que el favorito sea el mismo.
========================================================= */

const emprendimientosCerca = [

    {
        nombre: "Montaña Negra",
        categoria: "alimentos",
        etiqueta: "☕ Café",
        ciudad: "Manizales",
        descripcion: "Café de especialidad cultivado en las montañas colombianas.",
        lat: 5.0689,
        lng: -75.5174
    },

    {
        nombre: "Sabores de Casa",
        categoria: "alimentos",
        etiqueta: "🍴 Alimentos",
        ciudad: "Manizales",
        descripcion: "Restaurante de comida casera colombiana con recetas tradicionales.",
        lat: 5.0615,
        lng: -75.4921
    },

    {
        nombre: "Dulce Tradición",
        categoria: "alimentos",
        etiqueta: "🍰 Postres",
        ciudad: "Manizales",
        descripcion: "Postres y brownies artesanales hechos a diario.",
        lat: 5.0660,
        lng: -75.5030
    },

    {
        nombre: "Studio Bella",
        categoria: "belleza",
        etiqueta: "✨ Belleza",
        ciudad: "Manizales",
        descripcion: "Belleza y cuidado personal con productos naturales.",
        lat: 5.0730,
        lng: -75.5105
    },

    {
        nombre: "TechLocal",
        categoria: "tecnologia",
        etiqueta: "💻 Tecnología",
        ciudad: "Manizales",
        descripcion: "Accesorios y soluciones tecnológicas con servicio personalizado.",
        lat: 5.0551,
        lng: -75.4868
    },

    {
        nombre: "Yahandra Artesanías",
        categoria: "artesania",
        etiqueta: "🧶 Artesanía",
        ciudad: "Manizales",
        descripcion: "Mochilas wayuu y artesanías hechas a mano.",
        lat: 5.0780,
        lng: -75.5230
    }
];

emprendimientosCerca.forEach(function (emprendimiento) {
    emprendimiento.id = crearId(emprendimiento.nombre);
});


/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */

const cercaContenido = document.getElementById("cercaContenido");
const overlayPermiso = document.getElementById("overlayPermiso");
const btnPermitirUbicacion = document.getElementById("btnPermitirUbicacion");
const mensajeUbicacion = document.getElementById("mensajeUbicacion");

const btnRecentrar = document.getElementById("btnRecentrar");
const btnDesactivar = document.getElementById("btnDesactivar");

const listaCerca = document.getElementById("listaCerca");
const resumenCerca = document.getElementById("resumenCerca");
const sinCerca = document.getElementById("sinCerca");

const chipsRadio = document.querySelectorAll(".chip-radio");
const chipsCategoria = document.querySelectorAll(".chip-categoria");


/* =========================================================
   ESTADO
========================================================= */

let ubicacionUsuario = null;
let radioKm = 5;
let categoriaFiltro = "todos";

let marcadorUsuario = null;
let circuloRadio = null;
let marcadoresPorId = {};
let resultadosActuales = [];


/* =========================================================
   MAPA (Leaflet + OpenStreetMap)
========================================================= */

const mapa = L.map("mapaCerca").setView([5.0703, -75.5138], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

const capaMarcadores = L.layerGroup().addTo(mapa);

const iconoEmprendimiento = L.divIcon({
    className: "pin-kivo",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12]
});

const iconoUsuario = L.divIcon({
    className: "pin-usuario",
    iconSize: [18, 18],
    iconAnchor: [9, 9]
});


/* =========================================================
   DISTANCIA (fórmula de Haversine)
========================================================= */

function calcularDistanciaKm(lat1, lng1, lat2, lng2) {

    const radioTierra = 6371;

    const aRadianes = function (grados) {
        return grados * Math.PI / 180;
    };

    const dLat = aRadianes(lat2 - lat1);
    const dLng = aRadianes(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(aRadianes(lat1)) * Math.cos(aRadianes(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    return radioTierra * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatearDistancia(km) {

    if (km < 1) {
        return Math.round(km * 1000) + " m";
    }

    return km.toFixed(1).replace(".", ",") + " km";
}


/* =========================================================
   TARJETAS Y POPUPS
========================================================= */

function urlComoLlegar(emprendimiento) {

    return "https://www.google.com/maps/dir/?api=1&destination=" +
        emprendimiento.lat + "," + emprendimiento.lng;
}

function crearTarjeta(emprendimiento) {

    const activo = esFavorito("emprendimientos", emprendimiento.id);

    return `
        <article class="cerca-card" data-id="${escaparHTML(emprendimiento.id)}">

            <div class="cerca-card-top">
                <span class="etiqueta-kivo">${escaparHTML(emprendimiento.etiqueta)}</span>
                <span class="cerca-distancia">${formatearDistancia(emprendimiento.distancia)}</span>
            </div>

            <h3>${escaparHTML(emprendimiento.nombre)}</h3>
            <p>${escaparHTML(emprendimiento.descripcion)}</p>

            <div class="cerca-card-acciones">

                <a class="btn-kivo-borde" target="_blank" rel="noopener"
                   href="${urlComoLlegar(emprendimiento)}">Cómo llegar</a>

                <button class="cerca-fav ${activo ? "favoritoActivo" : ""}" type="button"
                        aria-label="Guardar en favoritos">${activo ? "♥" : "♡"}</button>

            </div>

        </article>
    `;
}

function crearPopup(emprendimiento) {

    return `
        <div class="popup-kivo">
            <strong>${escaparHTML(emprendimiento.nombre)}</strong>
            <span>${escaparHTML(emprendimiento.etiqueta)} · ${formatearDistancia(emprendimiento.distancia)}</span>
            <a target="_blank" rel="noopener" href="${urlComoLlegar(emprendimiento)}">Cómo llegar →</a>
        </div>
    `;
}

function resaltarTarjeta(id) {

    document.querySelectorAll(".cerca-card").forEach(function (tarjeta) {

        tarjeta.classList.toggle("resaltada", tarjeta.dataset.id === id);

        if (tarjeta.dataset.id === id) {
            tarjeta.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    });
}


/* =========================================================
   PINTAR RESULTADOS (filtros + distancia)
========================================================= */

function pintarResultados() {

    capaMarcadores.clearLayers();
    marcadoresPorId = {};
    listaCerca.innerHTML = "";

    if (!ubicacionUsuario) {

        resumenCerca.textContent = "";
        sinCerca.hidden = true;

        return;
    }

    // Círculo del radio elegido
    if (circuloRadio) {
        mapa.removeLayer(circuloRadio);
    }

    circuloRadio = L.circle([ubicacionUsuario.lat, ubicacionUsuario.lng], {
        radius: radioKm * 1000,
        color: "#5B3FB5",
        weight: 1,
        fillColor: "#5B3FB5",
        fillOpacity: 0.06
    }).addTo(mapa);

    // Calcular distancia, filtrar y ordenar de más cerca a más lejos
    resultadosActuales = emprendimientosCerca
        .map(function (emprendimiento) {
            return Object.assign({}, emprendimiento, {
                distancia: calcularDistanciaKm(
                    ubicacionUsuario.lat,
                    ubicacionUsuario.lng,
                    emprendimiento.lat,
                    emprendimiento.lng
                )
            });
        })
        .filter(function (emprendimiento) {
            return emprendimiento.distancia <= radioKm &&
                (categoriaFiltro === "todos" || emprendimiento.categoria === categoriaFiltro);
        })
        .sort(function (a, b) {
            return a.distancia - b.distancia;
        });

    const total = resultadosActuales.length;

    resumenCerca.textContent =
        total + (total === 1 ? " emprendimiento" : " emprendimientos") +
        " a menos de " + radioKm + " km";

    sinCerca.hidden = total > 0;

    resultadosActuales.forEach(function (emprendimiento) {

        const marcador = L.marker([emprendimiento.lat, emprendimiento.lng], { icon: iconoEmprendimiento })
            .bindPopup(crearPopup(emprendimiento))
            .addTo(capaMarcadores);

        marcador.on("click", function () {
            resaltarTarjeta(emprendimiento.id);
        });

        marcadoresPorId[emprendimiento.id] = marcador;

        listaCerca.insertAdjacentHTML("beforeend", crearTarjeta(emprendimiento));
    });
}

function ajustarVista() {

    const puntos = [[ubicacionUsuario.lat, ubicacionUsuario.lng]];

    resultadosActuales.forEach(function (emprendimiento) {
        puntos.push([emprendimiento.lat, emprendimiento.lng]);
    });

    if (puntos.length === 1) {
        mapa.setView(puntos[0], 15);
        return;
    }

    mapa.fitBounds(L.latLngBounds(puntos).pad(0.2), { maxZoom: 16 });
}

function actualizarTodo() {

    if (!ubicacionUsuario) {
        return;
    }

    pintarResultados();
    ajustarVista();
}


/* =========================================================
   BLOQUEAR / DESBLOQUEAR
========================================================= */

function desbloquearModulo() {

    cercaContenido.classList.remove("bloqueado");
    cercaContenido.inert = false;
    overlayPermiso.hidden = true;

    mapa.invalidateSize();
}

function bloquearModulo() {

    cercaContenido.classList.add("bloqueado");
    cercaContenido.inert = true;
    overlayPermiso.hidden = false;
}

function mostrarMensaje(texto, esError) {

    mensajeUbicacion.textContent = texto;
    mensajeUbicacion.classList.toggle("es-error", Boolean(esError));
}


/* =========================================================
   PERMISO DE UBICACIÓN
========================================================= */

function ubicacionObtenida(posicion) {

    ubicacionUsuario = {
        lat: posicion.coords.latitude,
        lng: posicion.coords.longitude
    };

    btnPermitirUbicacion.disabled = false;
    btnPermitirUbicacion.textContent = "Permitir ubicación";
    mostrarMensaje("");

    if (marcadorUsuario) {
        mapa.removeLayer(marcadorUsuario);
    }

    marcadorUsuario = L.marker([ubicacionUsuario.lat, ubicacionUsuario.lng], {
        icon: iconoUsuario,
        interactive: false
    }).addTo(mapa);

    desbloquearModulo();
    pintarResultados();
    ajustarVista();
}

function ubicacionError(error) {

    btnPermitirUbicacion.disabled = false;
    btnPermitirUbicacion.textContent = "Permitir ubicación";

    if (error.code === error.PERMISSION_DENIED) {

        mostrarMensaje(
            "Tienes el permiso bloqueado. Haz clic en el candado de la barra " +
            "de direcciones, activa «Ubicación» y vuelve a intentarlo.",
            true
        );

    } else if (error.code === error.TIMEOUT) {

        mostrarMensaje("Tardó demasiado en obtener tu ubicación. Inténtalo de nuevo.", true);

    } else {

        mostrarMensaje("No pudimos determinar tu ubicación en este momento.", true);
    }
}

function solicitarUbicacion() {

    if (!("geolocation" in navigator)) {

        mostrarMensaje("Tu navegador no permite usar la ubicación.", true);

        return;
    }

    btnPermitirUbicacion.disabled = true;
    btnPermitirUbicacion.textContent = "Esperando permiso...";
    mostrarMensaje("");

    // Aquí el navegador muestra su cuadro de permiso (como el de cámara o micrófono)
    navigator.geolocation.getCurrentPosition(ubicacionObtenida, ubicacionError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
    });
}

btnPermitirUbicacion.addEventListener("click", solicitarUbicacion);


/* Si el usuario ya había dado el permiso antes, se activa solo */

if (navigator.permissions && navigator.permissions.query) {

    navigator.permissions.query({ name: "geolocation" })
        .then(function (estado) {

            if (estado.state === "granted") {
                solicitarUbicacion();
            }

            if (estado.state === "denied") {
                mostrarMensaje(
                    "El permiso de ubicación está bloqueado en este navegador. " +
                    "Actívalo desde el candado de la barra de direcciones.",
                    true
                );
            }
        })
        .catch(function () {
            // Algunos navegadores no permiten consultar el permiso: no pasa nada
        });
}


/* =========================================================
   BOTONES: MI UBICACIÓN / DESACTIVAR
========================================================= */

btnRecentrar.addEventListener("click", function () {

    if (ubicacionUsuario) {
        mapa.flyTo([ubicacionUsuario.lat, ubicacionUsuario.lng], 15);
    }
});

btnDesactivar.addEventListener("click", function () {

    ubicacionUsuario = null;

    if (marcadorUsuario) {
        mapa.removeLayer(marcadorUsuario);
        marcadorUsuario = null;
    }

    if (circuloRadio) {
        mapa.removeLayer(circuloRadio);
        circuloRadio = null;
    }

    pintarResultados();
    bloquearModulo();

    mostrarMensaje(
        "Dejamos de usar tu ubicación. Para quitar el permiso del navegador " +
        "usa el candado de la barra de direcciones."
    );
});


/* =========================================================
   FILTROS
========================================================= */

chipsRadio.forEach(function (chip) {

    chip.addEventListener("click", function () {

        chipsRadio.forEach(function (item) {
            item.classList.remove("seleccionada");
        });

        chip.classList.add("seleccionada");

        radioKm = Number(chip.dataset.radio);

        actualizarTodo();
    });
});

chipsCategoria.forEach(function (chip) {

    chip.addEventListener("click", function () {

        chipsCategoria.forEach(function (item) {
            item.classList.remove("seleccionada");
        });

        chip.classList.add("seleccionada");

        categoriaFiltro = chip.dataset.categoria;

        actualizarTodo();
    });
});


/* =========================================================
   CLIC EN LA LISTA (tarjeta o corazón)
========================================================= */

listaCerca.addEventListener("click", function (evento) {

    const tarjeta = evento.target.closest(".cerca-card");

    if (!tarjeta) {
        return;
    }

    const id = tarjeta.dataset.id;

    // Corazón: guardar / quitar de favoritos
    const botonFavorito = evento.target.closest(".cerca-fav");

    if (botonFavorito) {

        const emprendimiento = emprendimientosCerca.find(function (item) {
            return item.id === id;
        });

        const activo = alternarFavorito("emprendimientos", {
            id: emprendimiento.id,
            nombre: emprendimiento.nombre,
            categoria: emprendimiento.etiqueta + " · " + emprendimiento.ciudad,
            descripcion: emprendimiento.descripcion,
            imagen: ""
        });

        botonFavorito.textContent = activo ? "♥" : "♡";
        botonFavorito.classList.toggle("favoritoActivo", activo);

        return;
    }

    // Enlace "Cómo llegar": que siga su camino
    if (evento.target.closest("a")) {
        return;
    }

    // Resto de la tarjeta: ir al marcador en el mapa
    const marcador = marcadoresPorId[id];

    if (marcador) {
        mapa.flyTo(marcador.getLatLng(), 16);
        marcador.openPopup();
        resaltarTarjeta(id);
    }
});


console.log("KIVO - Módulo Cerca de ti cargado correctamente.");