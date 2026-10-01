/* =========================================================
   KIVO - REGISTRO.JS
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const registroForm =
    document.getElementById("registroForm");

const inputNombre =
    document.getElementById("inputNombre");

const inputCorreo =
    document.getElementById("inputCorreo");

const inputPassword =
    document.getElementById("inputPassword");

const inputConfirmPassword =
    document.getElementById("inputConfirmPassword");

const checkboxTerminos =
    document.getElementById("checkboxTerminos");

const btnTipoComprador =
    document.getElementById("btnTipoComprador");

const btnTipoVendedor =
    document.getElementById("btnTipoVendedor");

const btnMostrarPassword =
    document.getElementById("btnMostrarPassword");

const btnMostrarConfirmPassword =
    document.getElementById("btnMostrarConfirmPassword");

const registroSuccessModal =
    document.getElementById("registroSuccessModal");

const btnIrInicio =
    document.getElementById("btnIrInicio");


/* =========================================================
   VARIABLE DEL TIPO DE USUARIO
========================================================= */

let tipoUsuario = "";


/* =========================================================
   SELECCIONAR COMPRADOR
========================================================= */

btnTipoComprador.addEventListener(
    "click",
    function () {

        tipoUsuario = "comprador";

        btnTipoComprador.classList.add("selected");

        btnTipoVendedor.classList.remove("selected");

        document.getElementById(
            "errorTipoUsuario"
        ).textContent = "";

    }
);


/* =========================================================
   SELECCIONAR VENDEDOR
========================================================= */

btnTipoVendedor.addEventListener(
    "click",
    function () {

        tipoUsuario = "vendedor";

        btnTipoVendedor.classList.add("selected");

        btnTipoComprador.classList.remove("selected");

        document.getElementById(
            "errorTipoUsuario"
        ).textContent = "";

    }
);


/* =========================================================
   MOSTRAR CONTRASEÑA
========================================================= */

btnMostrarPassword.addEventListener(
    "click",
    function () {

        if (
            inputPassword.type === "password"
        ) {

            inputPassword.type = "text";

        } else {

            inputPassword.type = "password";

        }

    }
);


/* =========================================================
   MOSTRAR CONFIRMACIÓN
========================================================= */

btnMostrarConfirmPassword.addEventListener(
    "click",
    function () {

        if (
            inputConfirmPassword.type === "password"
        ) {

            inputConfirmPassword.type = "text";

        } else {

            inputConfirmPassword.type = "password";

        }

    }
);


/* =========================================================
   VALIDAR CORREO
========================================================= */

function validarCorreo(correo) {

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(correo);

}


/* =========================================================
   ERROR
========================================================= */

function mostrarError(
    id,
    mensaje
) {

    document.getElementById(id).textContent =
        mensaje;

}


/* =========================================================
   LIMPIAR ERRORES
========================================================= */

function limpiarErrores() {

    const errores = [

        "errorNombre",
        "errorCorreo",
        "errorPassword",
        "errorConfirmPassword",
        "errorTipoUsuario",
        "errorTerminos"

    ];


    errores.forEach(
        function (id) {

            document.getElementById(
                id
            ).textContent = "";

        }
    );

}


/* =========================================================
   VALIDAR FORMULARIO
========================================================= */

function validarFormulario() {

    let valido = true;

    limpiarErrores();


    /* NOMBRE */

    if (
        inputNombre.value.trim() === ""
    ) {

        mostrarError(
            "errorNombre",
            "Ingresa tu nombre completo."
        );

        valido = false;

    }


    /* CORREO */

    if (
        inputCorreo.value.trim() === ""
    ) {

        mostrarError(
            "errorCorreo",
            "Ingresa tu correo."
        );

        valido = false;

    } else if (
        !validarCorreo(
            inputCorreo.value.trim()
        )
    ) {

        mostrarError(
            "errorCorreo",
            "Ingresa un correo válido."
        );

        valido = false;

    }


    /* CONTRASEÑA */

    if (
        inputPassword.value.length < 8
    ) {

        mostrarError(
            "errorPassword",
            "La contraseña debe tener mínimo 8 caracteres."
        );

        valido = false;

    }


    /* CONFIRMACIÓN */

    if (
        inputConfirmPassword.value === ""
    ) {

        mostrarError(
            "errorConfirmPassword",
            "Confirma tu contraseña."
        );

        valido = false;

    } else if (
        inputPassword.value !==
        inputConfirmPassword.value
    ) {

        mostrarError(
            "errorConfirmPassword",
            "Las contraseñas no coinciden."
        );

        valido = false;

    }


    /* TIPO DE USUARIO */

    if (
        tipoUsuario === ""
    ) {

        mostrarError(
            "errorTipoUsuario",
            "Selecciona un tipo de cuenta."
        );

        valido = false;

    }


    /* TÉRMINOS */

    if (
        !checkboxTerminos.checked
    ) {

        mostrarError(
            "errorTerminos",
            "Debes aceptar los términos."
        );

        valido = false;

    }


    return valido;

}


/* =========================================================
   ENVIAR FORMULARIO
========================================================= */

registroForm.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        if (
            !validarFormulario()
        ) {

            return;

        }


        /* ---------------------------------------------
           DATOS TEMPORALES
        --------------------------------------------- */

        const usuario = {

            nombre:
                inputNombre.value.trim(),

            correo:
                inputCorreo.value.trim(),

            tipo:
                tipoUsuario

        };


        /*
         * Por ahora guardamos únicamente
         * información básica.
         *
         * La contraseña NO se guarda.
         */

        localStorage.setItem(
            "usuarioKivo",
            JSON.stringify(usuario)
        );


        /* ---------------------------------------------
           ACTUALIZAR PASOS
        --------------------------------------------- */

        document
            .getElementById("step1")
            .classList.remove("active");

        document
            .getElementById("step2")
            .classList.add("active");

        document
            .getElementById("step3")
            .classList.add("active");


        /* ---------------------------------------------
           MOSTRAR MODAL
        --------------------------------------------- */

        registroSuccessModal.classList.add(
            "is-active"
        );

    }
);


/* =========================================================
   IR AL INICIO
========================================================= */

btnIrInicio.addEventListener(
    "click",
    function () {

        window.location.href ="../inicio.html";

    }
);


/* =========================================================
   GOOGLE
========================================================= */

document
    .getElementById("btnGoogle")
    .addEventListener(
        "click",
        function () {

            alert(
                "El registro con Google se implementará posteriormente."
            );

        }
    );


/* =========================================================
   FACEBOOK
========================================================= */

document
    .getElementById("btnFacebook")
    .addEventListener(
        "click",
        function () {

            alert(
                "El registro con Facebook se implementará posteriormente."
            );

        }
    );


/* =========================================================
   TÉRMINOS
========================================================= */

document
    .getElementById("linkTerminos")
    .addEventListener(
        "click",
        function (evento) {

            evento.preventDefault();

            alert(
                "Hola----- poner terminos de acuerdo"
            );

        }
    );


/* =========================================================
   PRIVACIDAD
========================================================= */

document
    .getElementById("linkPrivacidad")
    .addEventListener(
        "click",
        function (evento) {

            evento.preventDefault();

            alert(
                "Hola----- poner terminos de privacidad"
            );

        }
    );


/* =========================================================
   CONSOLA
========================================================= */

console.log(
    "KIVO: módulo de registro cargado correctamente."
);