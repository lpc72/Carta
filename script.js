
"use strict";

/* ==========================================
   NUESTRO UNIVERSO - PARA HEIDY ❤️
   ========================================== */

const CONFIG = {
  nombre: "Heidy",
  diaAniversario: 16,
  musica: "assets/musica.mp3",

  // Cambia los nombres si tus fotos son diferentes.
  fotos: [
    {
      src: "assets/1.jpeg",
      texto: "Mi persona favorita"
    },
    {
      src: "assets/2.jpeg",
      texto: "Nuestro pequeño mundo"
    },
    {
      src: "assets/3.jpeg",
      texto: "Momentos contigo"
    },
    {
      src: "assets/4.jpeg",
      texto: "Tu sonrisa"
    },
    {
      src: "assets/5.jpeg",
      texto: "Tú y yo"
    },
    {
      src: "assets/6.jpeg",
      texto: "Por muchos recuerdos más"
    }
  ],

  razones: [
    "Porque tu sonrisa puede alegrar incluso los días más difíciles.",
    "Porque contigo los momentos sencillos se convierten en recuerdos especiales.",
    "Porque me encanta escuchar tu voz y saber cómo estuvo tu día.",
    "Porque tienes una forma única de hacerme sonreír.",
    "Porque admiro muchas cosas de ti, incluso esas que quizá tú no notas.",
    "Porque cada recuerdo bonito contigo ocupa un lugar especial en mi corazón.",
    "Porque quiero seguir descubriendo lugares, experiencias y sueños a tu lado.",
    "Porque eres tú, Heidy, y eso ya es una razón maravillosa."
  ]
};

/* ELEMENTOS */
const $ = selector => document.querySelector(selector);

const intro = $("#intro");
const main = $("#mainContent");
const music = $("#backgroundMusic");
const musicBtn = $("#musicBtn");
const modal = $("#surpriseModal");
const lightbox = $("#lightbox");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let reasonIndex = 0;
let particleInterval = null;
let toastTimeout = null;
let lastFocusedElement = null;

/* MENSAJES */
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* PANTALLA INICIAL */
$("#startBtn").addEventListener("click", async () => {
  intro.classList.add("hidden");
  main.classList.remove("hidden");
  musicBtn.classList.remove("hidden");

  window.scrollTo(0, 0);
  initReveal();
  startParticles();

  await playMusic(false);
});

/* ANIMACIONES AL DESLIZAR */
function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -20px 0px"
  });

  elements.forEach(el => observer.observe(el));
}

/* PARTÍCULAS */
function createParticle() {
  if (document.hidden || reduceMotion) return;

  const container = $("#particles");
  const particle = document.createElement("span");

  const symbols = ["♥", "♡", "✦", "✧", "❀"];
  const symbol = symbols[
    Math.floor(Math.random() * symbols.length)
  ];

  const duration = 7 + Math.random() * 8;
  const drift = (Math.random() - 0.5) * 220;

  particle.className = "particle";
  particle.textContent = symbol;

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.fontSize = (10 + Math.random() * 15) + "px";
  particle.style.color = Math.random() > 0.3
    ? "#f2a4bd"
    : "#e9c58d";
  particle.style.animationDuration = duration + "s";
  particle.style.setProperty("--drift", drift + "px");

  container.appendChild(particle);

  setTimeout(() => particle.remove(), duration * 1000 + 200);
}

function startParticles() {
  if (reduceMotion || particleInterval) return;

  for (let i = 0; i < 12; i++) {
    setTimeout(createParticle, i * 150);
  }

  particleInterval = setInterval(createParticle, 550);
}

function heartExplosion(amount = 50) {
  if (reduceMotion) return;

  for (let i = 0; i < amount; i++) {
    setTimeout(createParticle, i * 35);
  }
}

/* CUENTA REGRESIVA CADA DÍA 16 */
function updateCountdown() {
  const now = new Date();
  const day = CONFIG.diaAniversario;

  let target = new Date(
    now.getFullYear(),
    now.getMonth(),
    day,
    0, 0, 0
  );

  const isAnniversary = now.getDate() === day;

  // El día 16 celebramos durante todo el día.
  // La cuenta regresiva muestra el próximo día 16.
  if (now >= target) {
    target = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      day,
      0, 0, 0
    );
  }

  let difference = Math.max(0, target - now);

  const days = Math.floor(difference / 86400000);
  difference %= 86400000;

  const hours = Math.floor(difference / 3600000);
  difference %= 3600000;

  const minutes = Math.floor(difference / 60000);
  difference %= 60000;

  const seconds = Math.floor(difference / 1000);

  const format = value => String(value).padStart(2, "0");

  $("#days").textContent = format(days);
  $("#hours").textContent = format(hours);
  $("#minutes").textContent = format(minutes);
  $("#seconds").textContent = format(seconds);

  $("#anniversaryMessage").textContent = isAnniversary
    ? "¡Hoy es nuestro día especial! Feliz aniversario, mi amor. ❤️"
    : "Cada día que pasa es un día más de nuestra historia. ♡";
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* GALERÍA DE FOTOGRAFÍAS */
function createGallery() {
  const gallery = $("#gallery");

  CONFIG.fotos.forEach((photo, index) => {
    const card = document.createElement("div");
    card.className = "photo-card reveal";

    const rotation = [-3, 2, -2, 3, -3, 2][index % 6];
    card.style.setProperty("--rotation", rotation + "deg");

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.texto;
    img.loading = "lazy";

    const caption = document.createElement("span");
    caption.className = "photo-caption";
    caption.textContent = photo.texto;

    img.addEventListener("error", () => {
      img.remove();

      const placeholder = document.createElement("div");
      placeholder.className = "photo-placeholder";

      const icon = document.createElement("span");
      icon.textContent = "♡";

      const message = document.createElement("p");
      message.textContent = "Aquí irá uno de nuestros recuerdos";

      placeholder.append(icon, message);
      card.prepend(placeholder);
      card.style.cursor = "default";
    }, { once: true });

    card.addEventListener("click", () => {
      if (!img.isConnected) return;
      openLightbox(photo.src, photo.texto);
    });

    card.append(img, caption);
    gallery.appendChild(card);
  });
}

createGallery();

/* VISOR DE FOTOGRAFÍAS */
function openLightbox(src, caption) {
  lastFocusedElement = document.activeElement;

  $("#lightboxImage").src = src;
  $("#lightboxCaption").textContent = caption;

  lightbox.classList.remove("hidden");
  document.body.classList.add("no-scroll");
  $("#closeLightbox").focus();
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  document.body.classList.remove("no-scroll");
  $("#lightboxImage").removeAttribute("src");
  lastFocusedElement?.focus();
}

$("#closeLightbox").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

/* RAZONES PARA QUERERLA */
$("#nextReason").addEventListener("click", () => {
  reasonIndex = (reasonIndex + 1) % CONFIG.razones.length;

  const text = $("#reasonText");
  text.style.opacity = "0";

  setTimeout(() => {
    text.textContent = CONFIG.razones[reasonIndex];

    $("#reasonCounter").textContent =
      String(reasonIndex + 1).padStart(2, "0") +
      " / " +
      String(CONFIG.razones.length).padStart(2, "0");

    text.style.transition = "opacity .4s";
    text.style.opacity = "1";
  }, 200);
});

/* CARTA DE AMOR */
let letterOpened = false;

$("#envelope").addEventListener("click", () => {
  if (letterOpened) {
    $("#loveLetter").scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "center"
    });
    return;
  }

  letterOpened = true;
  $("#envelope").classList.add("open");

  setTimeout(() => {
    $("#loveLetter").classList.remove("hidden");

    setTimeout(() => {
      $("#loveLetter").scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "start"
      });
    }, 150);

    heartExplosion(25);
  }, reduceMotion ? 0 : 950);
});

/* MÚSICA */
async function playMusic(showError = true) {
  try {
    music.volume = 0.45;
    await music.play();

    musicBtn.classList.add("playing");
    musicBtn.textContent = "♫";
    musicBtn.setAttribute("aria-label", "Pausar música");
  } catch (error) {
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "♪";
    musicBtn.setAttribute("aria-label", "Reproducir música");

    if (showError) {
      showToast(
        "No se pudo reproducir la música. Revisa assets/musica.mp3"
      );
    }
  }
}

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    await playMusic();
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "♪";
    musicBtn.setAttribute("aria-label", "Reproducir música");
  }
});

/* SORPRESA FINAL */
function openSurprise() {
  lastFocusedElement = document.activeElement;

  modal.classList.remove("hidden");
  document.body.classList.add("no-scroll");

  $("#closeModal").focus();
  heartExplosion(80);
}

function closeSurprise() {
  modal.classList.add("hidden");
  document.body.classList.remove("no-scroll");
  lastFocusedElement?.focus();
}

$("#surpriseBtn").addEventListener("click", openSurprise);
$("#closeModal").addEventListener("click", closeSurprise);

modal.addEventListener("click", event => {
  if (event.target === modal) closeSurprise();
});

/* CERRAR CON ESCAPE Y MANTENER FOCO EN MODALES */
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (!lightbox.classList.contains("hidden")) {
      closeLightbox();
    } else if (!modal.classList.contains("hidden")) {
      closeSurprise();
    }
  }

  if (event.key !== "Tab") return;

  const activeDialog = !lightbox.classList.contains("hidden")
    ? lightbox
    : !modal.classList.contains("hidden")
      ? modal
      : null;

  if (!activeDialog) return;

  const controls = Array.from(
    activeDialog.querySelectorAll("button, a[href], [tabindex]")
  ).filter(el => !el.disabled && el.tabIndex >= 0);

  if (!controls.length) return;

  const first = controls[0];
  const last = controls[controls.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

/* PEQUEÑA SORPRESA EN EL DÍA 16 */
let anniversaryGreetingShown = false;

function checkAnniversaryGreeting() {
  if (
    new Date().getDate() === CONFIG.diaAniversario &&
    !anniversaryGreetingShown &&
    !main.classList.contains("hidden")
  ) {
    anniversaryGreetingShown = true;
    setTimeout(() => {
      showToast("¡Feliz día 16, mi hermosa Heidy! ❤️");
      heartExplosion(35);
    }, 1800);
  }
}

$("#startBtn").addEventListener(
  "click",
  checkAnniversaryGreeting
);

console.log("❤️ Un pequeño universo creado para Heidy.");

/* ==========================================
   INVITACIÓN A CENAR - HEIDY ❤️
   ========================================== */

const dinnerArea = document.getElementById("dinnerButtons");
const yesDinner = document.getElementById("acceptDinner");
const noDinner = document.getElementById("rejectDinner");
const dinnerThanks = document.getElementById("dinnerThanks");
const dinnerHint = document.getElementById("dinnerHint");

let dinnerAccepted = false;
let dinnerMoves = 0;
let dinnerPreviousFocus = null;

const dinnerMessages = [
  "Jajaja, mi amor, ¿segura? 🥹❤️",
  "Ese botoncito es muy tímido 🙈",
  "¡Ay, Heidy! No me rompas el corazoncito 😂💕",
  "Creo que el botón también quiere ir a cenar 🤭",
  "Mi amor, el botón rosadito te espera ❤️",
  "Te prometo una noche muy bonita 🥰",
  "Jajaja, te amo muchísimo, mi princesa 💗"
];

/* MOVER BOTÓN NO */
function moveNoDinner() {
  if (dinnerAccepted) return;

  const areaWidth = dinnerArea.clientWidth;
  const areaHeight = dinnerArea.clientHeight;

  const buttonWidth = noDinner.offsetWidth;
  const buttonHeight = noDinner.offsetHeight;

  const maxX = Math.max(0, areaWidth - buttonWidth);
  const maxY = Math.max(0, areaHeight - buttonHeight);

  const yesRect = yesDinner.getBoundingClientRect();
  const areaRect = dinnerArea.getBoundingClientRect();

  let newX = 0;
  let newY = 0;

  // Buscar una posición que no tape el botón "Sí".
  for (let i = 0; i < 35; i++) {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    const candidate = {
      left: areaRect.left + x,
      right: areaRect.left + x + buttonWidth,
      top: areaRect.top + y,
      bottom: areaRect.top + y + buttonHeight
    };

    const overlap = !(
      candidate.right < yesRect.left - 10 ||
      candidate.left > yesRect.right + 10 ||
      candidate.bottom < yesRect.top - 10 ||
      candidate.top > yesRect.bottom + 10
    );

    if (!overlap) {
      newX = x;
      newY = y;
      break;
    }
  }

  // Posición alternativa segura.
  if (newX === 0 && newY === 0) {
    newX = maxX;
    newY = maxY;
  }

  noDinner.style.left = newX + "px";
  noDinner.style.top = newY + "px";

  dinnerHint.textContent =
    dinnerMessages[dinnerMoves % dinnerMessages.length];

  dinnerMoves++;

  if (dinnerMoves % 3 === 0) {
    heartExplosion(10);
  }
}

/* ESCAPAR DEL CURSOR EN COMPUTADORA */
noDinner.addEventListener("pointerenter", event => {
  if (event.pointerType === "mouse") {
    moveNoDinner();
  }
});

/* ESCAPAR DEL DEDO EN CELULAR */
noDinner.addEventListener("pointerdown", event => {
  if (event.pointerType !== "mouse") {
    event.preventDefault();
    moveNoDinner();
  }
});

/* SI ALCANZA A HACER CLIC, TAMBIÉN ESCAPA */
noDinner.addEventListener("click", event => {
  event.preventDefault();
  moveNoDinner();
});

/* EVITAR ACTIVACIÓN POR TECLADO */
noDinner.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    moveNoDinner();
  }
});

/* ACEPTAR LA INVITACIÓN */
yesDinner.addEventListener("click", () => {
  if (dinnerAccepted) return;

  dinnerAccepted = true;
  dinnerPreviousFocus = document.activeElement;

  dinnerThanks.classList.remove("hidden");
  document.body.classList.add("no-scroll");

  document.getElementById("closeDinnerThanks").focus();

  heartExplosion(100);

  dinnerHint.textContent =
    "¡Sabía que esta noche sería especial! ❤️";

  yesDinner.textContent = "¡Cita aceptada! ❤️";
  yesDinner.disabled = true;
});

/* CERRAR AGRADECIMIENTO */
function closeDinnerThankYou() {
  dinnerThanks.classList.add("hidden");
  document.body.classList.remove("no-scroll");

  if (dinnerPreviousFocus) {
    dinnerPreviousFocus.focus();
  }
}

document.getElementById("closeDinnerThanks")
  .addEventListener("click", closeDinnerThankYou);

document.getElementById("finishDinnerThanks")
  .addEventListener("click", closeDinnerThankYou);

dinnerThanks.addEventListener("click", event => {
  if (event.target === dinnerThanks) {
    closeDinnerThankYou();
  }
});

document.addEventListener("keydown", event => {
  if (
    event.key === "Escape" &&
    !dinnerThanks.classList.contains("hidden")
  ) {
    closeDinnerThankYou();
  }

  if (
    event.key === "Tab" &&
    !dinnerThanks.classList.contains("hidden")
  ) {
    const buttons = [
      document.getElementById("closeDinnerThanks"),
      document.getElementById("finishDinnerThanks")
    ];

    const first = buttons[0];
    const last = buttons[1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }
});
