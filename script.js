/*==================================================
                LOVE OS v2
                SCRIPT.JS - PARTE 1
==================================================*/

"use strict";

/*==================================================
                    ELEMENTOS
==================================================*/

const bootScreen = document.getElementById("boot-screen");
const welcomeScreen = document.getElementById("welcome-screen");
const desktop = document.getElementById("desktop");

const progressBar = document.getElementById("progressBar");
const bootText = document.getElementById("bootText");

const enterBtn = document.getElementById("enterBtn");

const clock = document.getElementById("clock");

const windowBox = document.getElementById("window");
const closeWindow = document.getElementById("closeWindow");
const windowContent = document.getElementById("window-content");

const desktopIcons = document.querySelectorAll(".desktop-icon");

const bootMessages = [

    "Inicializando LoveOS...",

    "Preparando recuerdos...",

    "Cargando momentos especiales...",

    "Organizando sorpresas...",

    "Todo listo ❤️"

];


/*==================================================
                BOOT
==================================================*/

let progress = 0;

let currentMessage = 0;

const bootInterval = setInterval(() => {

    progress++;

    progressBar.style.width = progress + "%";

    if (progress % 20 === 0) {

        if (currentMessage < bootMessages.length) {

            bootText.textContent = bootMessages[currentMessage];

            currentMessage++;

        }

    }

    if (progress >= 100) {

        clearInterval(bootInterval);

        setTimeout(() => {

            bootScreen.classList.add("hidden");

            bootScreen.classList.remove("active");

             welcomeScreen.classList.remove("hidden");

            welcomeScreen.classList.add("active");

        }, 500);

    }

}, 40);


/*==================================================
                ENTRAR
==================================================*/

enterBtn.addEventListener("click", () => {

    welcomeScreen.classList.remove("active");

    welcomeScreen.classList.add("hidden");

    setTimeout(() => {

        desktop.classList.remove("hidden");

        desktop.classList.add("active");

    }, 500);

});

/*==================================================
                    RELOJ
==================================================*/

function updateClock() {

    const now = new Date();

    let hour = now.getHours();

    let minute = now.getMinutes();

    if (hour < 10) hour = "0" + hour;

    if (minute < 10) minute = "0" + minute;

    clock.textContent = hour + ":" + minute;

}

updateClock();

setInterval(updateClock, 1000);


/*==================================================
                ABRIR VENTANAS
==================================================*/

desktopIcons.forEach(icon => {

    icon.addEventListener("click", () => {

        const app = icon.dataset.app;

        openApp(app);

    });

});


/*==================================================
                OPEN APP
==================================================*/

function openApp(app) {

    const template = document.getElementById("tpl-" + app);

    if (!template) return;

    windowContent.innerHTML = "";

    const clone = template.content.cloneNode(true);

    windowContent.appendChild(clone);

    windowBox.classList.remove("hidden");

    setTimeout(() => {

        windowBox.classList.add("show");

    }, 20);

}


/*==================================================
                CERRAR
==================================================*/

closeWindow.addEventListener("click", () => {

    windowBox.classList.remove("show");

    setTimeout(() => {

        windowBox.classList.add("hidden");

        windowContent.innerHTML = "";

    }, 300);

});

/*==================================================
                ESTRELLAS
==================================================*/

const starsContainer = document.getElementById("stars");

function createStars() {

    for (let i = 0; i < 250; i++) {

        const star = document.createElement("div");

        star.className = "star";

        const size = Math.random() * 3 + 1;

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";

        star.style.animationDuration = (2 + Math.random() * 4) + "s";

        starsContainer.appendChild(star);

    }

}

createStars();


/*==================================================
                PARTÍCULAS
==================================================*/

const particles = document.getElementById("particles");

function createParticles() {

    for (let i = 0; i < 70; i++) {

        const particle = document.createElement("div");

        particle.className = "particle";

        const size = Math.random() * 4 + 2;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.left = Math.random() * 100 + "vw";
        particle.style.top = Math.random() * 100 + "vh";

        particle.style.animationDuration = (10 + Math.random() * 10) + "s";

        particles.appendChild(particle);

    }

}

createParticles();


/*==================================================
            ESTRELLAS FUGACES
==================================================*/

const shootingContainer = document.getElementById("shooting-stars");

function createShootingStar() {

    const star = document.createElement("div");

    star.className = "shooting-star";

    star.style.top = Math.random() * 250 + "px";

    star.style.left = window.innerWidth + "px";

    shootingContainer.appendChild(star);

    setTimeout(() => {

        star.remove();

    }, 2500);

}

setInterval(createShootingStar, 5000);


/*==================================================
            CORAZONES FLOTANTES
==================================================*/

const hearts = document.getElementById("hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (18 + Math.random() * 22) + "px";

    heart.style.animationDuration = (6 + Math.random() * 5) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 11000);

}

setInterval(createHeart, 900);

/*==================================================
                LOVE OS v2
                SCRIPT.JS - PARTE 2
        CARTA - GALERÍA - RAZONES - MOMENTOS
==================================================*/


/*==========================================
                CARTA
==========================================*/

const letterMessage = `

Hola mi amor ❤️

Si estás leyendo esto, significa que llegaste
hasta el corazón de esta pequeña aplicación.

Quería hacer algo diferente.

No comprar un regalo.

No copiar una carta.

Sino crear algo que nadie más pudiera darte.

Cada línea de código...

Cada botón...

Cada animación...

Cada detalle...

Fue pensado exclusivamente para ti.

Espero que cada vez que abras
recuerdes lo mucho que significas para mí.

Gracias por hacer mi vida más bonita.

Te amo muchísimo.

❤️

`;

function startLetter(){

    const text=document.getElementById("letterText");

    if(!text) return;

    text.innerHTML="";

    let i=0;

    const timer=setInterval(()=>{

        text.innerHTML+=letterMessage.charAt(i);

        i++;

        if(i>=letterMessage.length){

            clearInterval(timer);

        }

    },30);

}


/*==========================================
                RAZONES
==========================================*/

const reasons=[

{
title:"Tu sonrisa",
icon:"😊",
text:"Porque tu sonrisa ilumina incluso mis días más difíciles."
},

{
title:"Tu forma de ser",
icon:"🥰",
text:"Porque eres una persona increíble y de buen corazón"
},

{
title:"Tus abrazos",
icon:"🤗",
text:"Porque en tus abrazos siento tranquilidad, paz y amor."
},

{
title:"Tu apoyo",
icon:"💖",
text:"Porque siempre estuviste cuando estaba mal y tambien en los buenos momentos."
},

{
title:"Nuestro amor",
icon:"❤️",
text:"Porque contigo aprendí lo bonito que es amar de verdad y mejorar siempre en mi."
}

];

let currentReason=0;

function startReasons(){

    const number=document.querySelector(".reason-number");
    const icon=document.querySelector(".reason-icon");
    const title=document.getElementById("reasonTitle");
    const text=document.getElementById("reasonText");
    const button=document.getElementById("nextReason");

    if(!button) return;

    function loadReason(){

        number.innerHTML="#"+(currentReason+1);

        icon.innerHTML=reasons[currentReason].icon;

        title.innerHTML=reasons[currentReason].title;

        text.innerHTML=reasons[currentReason].text;

    }

    loadReason();

    button.onclick=function(){

        currentReason++;

        if(currentReason>=reasons.length){

            currentReason=0;

        }

        loadReason();

    }

}


/*==========================================
                MOMENTOS
==========================================*/

const moments=[

"❤️ Cuando celebramos nuestro primer año.",

"🌹 Cuando empezamos a viajar con tus padres y mis padres",

"🥰 Cada conversación contigo, cada llamada, cada juego ya sea en linea freefire - valorant",

"💖 Cada 'te extraño','te amo', eres mi todo'." ,


"💍 Y asi hubi muchos momentos que esta lista es muy corto......... Vamos por muchos recuerdos y construyendo un amor muy hermoso."

];

let currentMoment=0;

let momentInterval=null;

function startMoments(){

    const text=document.getElementById("momentText");

    const dots=document.querySelectorAll(".dot");

    if(!text) return;

    function updateMoment(){

        text.style.opacity=0;

        setTimeout(()=>{

            text.innerHTML=moments[currentMoment];

            dots.forEach(dot=>dot.classList.remove("active"));

            dots[currentMoment].classList.add("active");

            text.style.opacity=1;

        },250);

    }

    updateMoment();

    if(momentInterval){

        clearInterval(momentInterval);

    }

    momentInterval=setInterval(()=>{

        currentMoment++;

        if(currentMoment>=moments.length){

            currentMoment=0;

        }

        updateMoment();

    },3500);

}


/*==========================================
                GALERÍA
==========================================*/

function startGallery(){

    const images=document.querySelectorAll(".gallery img");

    images.forEach(image=>{

        image.onclick=function(){

            const overlay=document.createElement("div");

            overlay.style.position="fixed";
            overlay.style.left="0";
            overlay.style.top="0";
            overlay.style.width="100%";
            overlay.style.height="100%";
            overlay.style.background="rgba(0,0,0,.85)";
            overlay.style.display="flex";
            overlay.style.justifyContent="center";
            overlay.style.alignItems="center";
            overlay.style.zIndex="99999";
            overlay.style.cursor="pointer";

            const img=document.createElement("img");

            img.src=this.src;

            img.style.maxWidth="90%";
            img.style.maxHeight="90%";
            img.style.borderRadius="20px";
            img.style.boxShadow="0 0 40px black";

            overlay.appendChild(img);

            document.body.appendChild(overlay);

            overlay.onclick=function(){

                overlay.remove();

            }

        }

    });

}


/*==========================================
        CONECTAR CON openApp()
==========================================*/

const originalOpenApp=openApp;

openApp=function(app){

    originalOpenApp(app);

    setTimeout(()=>{

        switch(app){

            case "letter":

                startLetter();

            break;

            case "gallery":

                startGallery();

            break;

            case "reasons":

                startReasons();

            break;

            case "moments":

                startMoments();

            break;

        }

    },150);

}

/*==========================================
            TIEMPO JUNTOS
==========================================*/

function startLoveTime(){

    const startDate = new Date(2022, 11, 2); // 2 diciembre 2022

    const today = new Date();

    let years = today.getFullYear() - startDate.getFullYear();

    let months = today.getMonth() - startDate.getMonth();

    let days = today.getDate() - startDate.getDate();

    if(days < 0){

        months--;

        const lastMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += lastMonth.getDate();

    }

    if(months < 0){

        years--;

        months += 12;

    }

    document.getElementById("years").textContent = years;

    document.getElementById("months").textContent = months;

    document.getElementById("days").textContent = days;

}