/* =========================================================
   KIVO - LOGIN.JS
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const loginForm =
    document.getElementById("loginForm");

const inputCorreo =
    document.getElementById("inputLoginCorreo");

const inputPassword =
    document.getElementById("inputLoginPassword");

const btnMostrarPassword =
    document.getElementById("btnMostrarLoginPassword");

const modal =
    document.getElementById("loginSuccessModal");


/* =========================================================
   MOSTRAR / OCULTAR CONTRASEÑA
========================================================= */

btnMostrarPassword.addEventListener(
    "click",
    function () {

        if (inputPassword.type === "password") {

            inputPassword.type = "text";

        } else {

            inputPassword.type = "password";

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
   INICIAR SESIÓN
========================================================= */

loginForm.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        /* =================================================
           LIMPIAR MENSAJES
        ================================================= */

        document.getElementById(
            "errorLoginCorreo"
        ).textContent = "";

        document.getElementById(
            "errorLoginPassword"
        ).textContent = "";


        let valido = true;


        /* =================================================
           VALIDAR CORREO
        ================================================= */

        if (inputCorreo.value.trim() === "") {

            document.getElementById(
                "errorLoginCorreo"
            ).textContent =
                "Ingresa tu correo.";

            valido = false;

        } else if (
            !validarCorreo(
                inputCorreo.value.trim()
            )
        ) {

            document.getElementById(
                "errorLoginCorreo"
            ).textContent =
                "Ingresa un correo válido.";

            valido = false;

        }


        /* =================================================
           VALIDAR CONTRASEÑA
        ================================================= */

        if (inputPassword.value === "") {

            document.getElementById(
                "errorLoginPassword"
            ).textContent =
                "Ingresa tu contraseña.";

            valido = false;

        }


        /* =================================================
           SI HAY ERRORES
        ================================================= */

        if (!valido) {

            Swal.fire({

                title: "Revisa los datos",

                text: "Completa correctamente los campos del formulario.",

                icon: "warning",

                confirmButtonText: "Entendido",

                confirmButtonColor: "#5B3FB5",

                background: "#FFFDFC",

                color: "#202020"

            });

            return;

        }


        /* =================================================
           BUSCAR USUARIO EN LOCALSTORAGE
        ================================================= */

        const usuarioGuardado =
            localStorage.getItem("usuarioKivo");


        if (usuarioGuardado) {

            const usuario =
                JSON.parse(usuarioGuardado);


            /* =============================================
               COMPROBAR CORREO
            ============================================= */

            if (
                usuario.correo ===
                inputCorreo.value.trim()
            ) {


                /* =========================================
                   LOGIN EXITOSO
                ========================================= */

                Swal.fire({

                    title: "¡Bienvenido a KIVO!",

                    text: "Has iniciado sesión correctamente.",

                    icon: "success",

                    confirmButtonText: "Continuar",

                    confirmButtonColor: "#5B3FB5",

                    background: "#FFFDFC",

                    color: "#202020",

                    timer: 2500,

                    timerProgressBar: true

                }).then(() => {

                    window.location.href =
                        "../../inicio.html";

                });


                return;

            }

        }


        /* =================================================
           USUARIO NO ENCONTRADO
        ================================================= */

        Swal.fire({

            title: "No se pudo iniciar sesión",

            text: "El correo ingresado no está registrado.",

            icon: "error",

            confirmButtonText: "Entendido",

            confirmButtonColor: "#5B3FB5",

            background: "#FFFDFC",

            color: "#202020"

        });

    }
);


/* =========================================================
   ¿OLVIDASTE TU CONTRASEÑA?
========================================================= */

document
    .getElementById("linkOlvidePassword")
    .addEventListener(
        "click",
        function (evento) {

            evento.preventDefault();

            Swal.fire({

                title: "¿Olvidaste tu contraseña?",

                text: "La recuperación de contraseña se implementará posteriormente.",

                icon: "info",

                confirmButtonText: "Entendido",

                confirmButtonColor: "#5B3FB5",

                background: "#FFFDFC",

                color: "#202020"

            });

        }
    );


/* =========================================================
   GOOGLE
========================================================= */

document
    .getElementById("btnLoginGoogle")
    .addEventListener(
        "click",
        function () {

            Swal.fire({

                title: "Iniciar sesión con Google",

                text: "Esta función se implementará posteriormente.",

                icon: "info",

                confirmButtonText: "Entendido",

                confirmButtonColor: "#5B3FB5",

                background: "#FFFDFC",

                color: "#202020"

            });

        }
    );


/* =========================================================
   FACEBOOK
========================================================= */

document
    .getElementById("btnLoginFacebook")
    .addEventListener(
        "click",
        function () {

            Swal.fire({

                title: "Iniciar sesión con Facebook",

                text: "Esta función se implementará posteriormente.",

                icon: "info",

                confirmButtonText: "Entendido",

                confirmButtonColor: "#5B3FB5",

                background: "#FFFDFC",

                color: "#202020"

            });

        }
    );


/* =========================================================
   CONSOLA
========================================================= */

console.log(
    "KIVO: módulo de inicio de sesión cargado correctamente."
);