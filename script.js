// ======================================
// PROYECTO: PARA HEIDY ❤️
// SCRIPT PRINCIPAL
// ======================================


// Esperar que cargue todo

window.addEventListener("load", () => {


    // ==================================
    // LOADER
    // ==================================

    const loader = document.getElementById("loader");


    setTimeout(() => {

        loader.classList.add("hide");


        showScene(0);


    }, 2000);



});





// ======================================
// VARIABLES PRINCIPALES
// ======================================


const scenes = document.querySelectorAll(".scene");

const nextButtons = document.querySelectorAll(".btn-next");

const sceneNumber = document.getElementById("sceneNumber");


let currentScene = 0;





// ======================================
// CAMBIO DE ESCENAS
// ======================================


function showScene(index){


    scenes.forEach(scene => {

        scene.classList.remove("active");

    });



    if(scenes[index]){


        scenes[index].classList.add("active");


        animateScene(scenes[index]);


        updateCounter(index);


    }



}





// ======================================
// BOTONES CONTINUAR
// ======================================


nextButtons.forEach(button => {


    button.addEventListener("click",()=>{


        if(currentScene < scenes.length - 1){


            currentScene++;


            showScene(currentScene);



        }else{


            openPopup();


        }



    });



});






// ======================================
// ACTUALIZAR NÚMERO DE ESCENA
// ======================================


function updateCounter(index){


    if(sceneNumber){


        sceneNumber.textContent = index + 1;


    }


}







// ======================================
// ANIMACIONES DE ESCENA
// ======================================


function animateScene(scene){



    const elements = scene.querySelectorAll(
        "h1,h2,h3,p,.subtitle,.heart-message,.memory-photo"
    );



    gsap.fromTo(

        elements,

        {

            opacity:0,

            y:40

        },

        {


            opacity:1,

            y:0,

            duration:1,

            stagger:0.15,

            ease:"power3.out"


        }


    );



}







// ======================================
// BOTÓN REINICIAR
// ======================================


const restart = document.getElementById("restart");


if(restart){


    restart.addEventListener("click",()=>{


        currentScene = 0;


        showScene(0);


    });


}
// ======================================
// PARTÍCULAS DEL FONDO
// ======================================


const particlesContainer = document.getElementById("particles");


function createParticles(){


    if(!particlesContainer) return;



    for(let i = 0; i < 80; i++){


        const particle = document.createElement("span");


        particle.className = "particle";


        particle.style.left = Math.random() * 100 + "%";


        particle.style.top = Math.random() * 100 + "%";



        particle.style.animationDelay = 
        Math.random() * 5 + "s";



        particle.style.animationDuration = 
        (5 + Math.random() * 8) + "s";



        particlesContainer.appendChild(particle);



    }


}


createParticles();







// ======================================
// CORAZONES FLOTANTES
// ======================================


const heartsContainer = document.getElementById(
    "hearts-container"
);



function createHeart(){



    if(!heartsContainer) return;



    const heart = document.createElement("span");


    heart.className = "floating-heart";



    heart.innerHTML = "❤";



    heart.style.left = Math.random()*100+"%";



    heart.style.animationDuration =
    (5 + Math.random()*6)+"s";



    heart.style.fontSize =
    (10 + Math.random()*25)+"px";



    heartsContainer.appendChild(heart);



    setTimeout(()=>{


        heart.remove();


    },10000);



}





setInterval(createHeart,900);







// ======================================
// POPUP FINAL
// ======================================


const popup = document.getElementById(
    "message-popup"
);



const closePopup = document.getElementById(
    "closePopup"
);



function openPopup(){


    if(!popup) return;


    popup.classList.add("show");



}



if(closePopup){


    closePopup.addEventListener("click",()=>{


        popup.classList.remove("show");


    });



}







// ======================================
// EFECTO FOTO DE RECUERDO
// ======================================


const memoryPhoto = document.querySelector(
    ".memory-photo img"
);



if(memoryPhoto){



    memoryPhoto.addEventListener(
        "mouseenter",
        ()=>{


            gsap.to(memoryPhoto,{

                scale:1.08,

                duration:.8,

                ease:"power2.out"

            });


        }
    );



    memoryPhoto.addEventListener(
        "mouseleave",
        ()=>{


            gsap.to(memoryPhoto,{

                scale:1,

                duration:.8,

                ease:"power2.out"

            });


        }
    );



}







// ======================================
// CURSOR PERSONALIZADO
// ======================================


const cursor = document.querySelector(
    ".cursor"
);



const cursorBlur = document.querySelector(
    ".cursor-blur"
);



document.addEventListener(
"mousemove",
(e)=>{


    if(cursor){


        cursor.style.left = e.clientX+"px";

        cursor.style.top = e.clientY+"px";


    }



    if(cursorBlur){


        cursorBlur.style.left = e.clientX+"px";

        cursorBlur.style.top = e.clientY+"px";


    }



});







// ======================================
// EFECTO EN BOTONES
// ======================================


const buttons = document.querySelectorAll(
    "button"
);



buttons.forEach(button=>{


    button.addEventListener(
        "mouseenter",
        ()=>{


            gsap.to(button,{

                scale:1.05,

                duration:.3

            });



        }
    );



    button.addEventListener(
        "mouseleave",
        ()=>{


            gsap.to(button,{

                scale:1,

                duration:.3

            });



        }
    );



});
// ======================================
// EFECTO MÁQUINA DE ESCRIBIR
// ======================================


function typeWriter(element, text, speed = 50){


    let i = 0;


    element.innerHTML = "";



    function typing(){


        if(i < text.length){


            element.innerHTML += text.charAt(i);


            i++;


            setTimeout(typing, speed);


        }


    }



    typing();



}





// ======================================
// FRASES IMPORTANTES
// ======================================


const importantTexts = document.querySelectorAll(
    ".text-large"
);



importantTexts.forEach(text=>{


    text.addEventListener(
        "click",
        ()=>{


            typeWriter(
                text,
                text.textContent.trim(),
                70
            );


        }
    );


});







// ======================================
// MOVIMIENTO SUAVE DEL FONDO
// ======================================


const background = document.querySelector(
    ".background"
);



document.addEventListener(
"mousemove",
(e)=>{


    if(!background) return;



    const x = e.clientX / window.innerWidth;

    const y = e.clientY / window.innerHeight;



    gsap.to(background,{

        x:x * 20,

        y:y * 20,

        duration:2,

        ease:"power2.out"


    });



});







// ======================================
// CORAZÓN FINAL ANIMADO
// ======================================


const finalHeart = document.querySelector(
    ".final-heart"
);



if(finalHeart){


    gsap.to(finalHeart,{


        scale:1.15,


        repeat:-1,


        yoyo:true,


        duration:1,


        ease:"power1.inOut"



    });



}







// ======================================
// ANIMACIÓN ESPECIAL FOTO
// ======================================


const photoSection = document.querySelector(
    ".memory-scene"
);



if(photoSection){


    photoSection.addEventListener(
        "mouseenter",
        ()=>{


            gsap.to(photoSection,{

                scale:1.01,

                duration:.8

            });


        }
    );



    photoSection.addEventListener(
        "mouseleave",
        ()=>{


            gsap.to(photoSection,{

                scale:1,

                duration:.8

            });



        }
    );



}







// ======================================
// TECLADO
// ======================================


document.addEventListener(
"keydown",
(e)=>{


    if(e.key === "Enter"){



        if(currentScene < scenes.length-1){


            currentScene++;


            showScene(currentScene);


        }



    }



});







// ======================================
// EVITAR ERRORES EN MÓVILES
// ======================================


window.addEventListener(
"resize",
()=>{


    if(window.innerWidth < 600){



        gsap.globalTimeline.timeScale(.8);



    }else{



        gsap.globalTimeline.timeScale(1);



    }



});







// ======================================
// INICIO FINAL
// ======================================


console.log(
`
❤️ Proyecto para Heidy iniciado ❤️

Cada escena fue creada
para transmitir un sentimiento.

`
);