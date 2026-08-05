/* ============================================================
   SISTEMA WEB — NUEVA HISTORIA
   SCRIPT PRINCIPAL
   ============================================================ */


/* ============================================================
   ESPERAR A QUE EL DOCUMENTO ESTÉ LISTO
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Página cargada correctamente ♥");


    /* ========================================================
       ELEMENTOS PRINCIPALES
       ======================================================== */

    const introButton =
        document.querySelector(".intro-button");

    const intro =
        document.querySelector(".intro");

    const main =
        document.querySelector("#main-content");


    /* ========================================================
       CONFIGURACIÓN INICIAL
       ======================================================== */

    if (main) {
        main.style.opacity = "0";

        main.style.transition =
            "opacity 1.2s ease";
    }


    /* ========================================================
       BOTÓN DE ENTRADA
       ======================================================== */

    if (introButton) {

        introButton.addEventListener("click", () => {

            /*
             * Primero hacemos desaparecer
             * suavemente la portada.
             */

            if (intro) {

                intro.style.transition =
                    "opacity 1s ease, transform 1s ease";

                intro.style.opacity = "0";

                intro.style.transform =
                    "scale(1.02)";
            }


            /*
             * Después mostramos el contenido.
             */

            setTimeout(() => {

                if (main) {

                    main.style.opacity = "1";

                }


                /*
                 * Llevamos al inicio de la historia.
                 */

                if (main) {

                    main.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }, 700);


            /*
             * Después de la transición,
             * ocultamos completamente la portada.
             */

            setTimeout(() => {

                if (intro) {

                    intro.style.display = "none";

                }

            }, 1200);

        });

    }


    /* ========================================================
       ANIMACIONES AL HACER SCROLL
       ======================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".story-section, .change-card, .future-card, " +
            ".history-card, .history-quote, " +
            ".proposal-letter, .proposal-question"
        );


    /*
     * Estado inicial de los elementos.
     */

    animatedElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity 0.9s ease, " +
            "transform 0.9s ease";

    });


    /* ========================================================
       OBSERVER
       ======================================================== */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        /*
                         * Una vez visible no necesitamos
                         * seguir observándolo.
                         */

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    /* ========================================================
       OBSERVAR ELEMENTOS
       ======================================================== */

    animatedElements.forEach((element) => {

        observer.observe(element);

    });


});
/* ============================================================
   CORAZONES DE LA RESPUESTA FINAL
   ============================================================ */

.floating-heart {
    position: fixed;

    bottom: -30px;

    z-index: 9999;

    color: var(--accent-light);

    pointer-events: none;

    opacity: 0;

    animation-name: floatingHeart;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
}


@keyframes floatingHeart {

    0% {
        transform:
            translateY(0)
            rotate(0deg)
            scale(0.7);

        opacity: 0;
    }

    15% {
        opacity: 0.85;
    }

    70% {
        opacity: 0.7;
    }

    100% {
        transform:
            translateY(-100vh)
            rotate(25deg)
            scale(1.1);

        opacity: 0;
    }
}
/* ============================================================
   DETALLES FINALES
   ============================================================ */

.scroll-stopped {
    --scroll-state: 1;
}


/* ============================================================
   MEJORA PARA DISPOSITIVOS TÁCTILES
   ============================================================ */

@media (hover: none) {

    .change-card:hover,
    .future-card:hover,
    .intro-button:hover,
    .answer-button:hover {
        transform: none;
    }

}


/* ============================================================
   EVITAR SELECCIÓN ACCIDENTAL EN BOTONES
   ============================================================ */

.intro-button,
.answer-button {
    -webkit-tap-highlight-color: transparent;

    user-select: none;
}


/* ============================================================
   FOCUS PARA ACCESIBILIDAD
   ============================================================ */

.intro-button:focus-visible,
.answer-button:focus-visible {
    outline: 2px solid var(--accent-light);

    outline-offset: 4px;
}


/* ============================================================
   BOTONES DESACTIVADOS
   ============================================================ */

.answer-button:disabled {
    cursor: default;

    transform: none !important;
}