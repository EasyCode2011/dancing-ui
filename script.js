/* ==========================================================
   GLOBAL HELPERS
========================================================== */

// Make random color (uses HSL for nicer distribution)
function randomColor() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h} 90% 60%)`;
}


/* ==========================================================
   MENU CONTROLS
========================================================== */

// Toggle menu with G
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "g") {
    document.getElementById("menu").classList.toggle("open");
  }
});

// Switch to rectangle demo via menu button
document.getElementById("btnRectangles").addEventListener("click", () => {
  const home = document.getElementById("home");
  const rectPage = document.getElementById("rectPage");

  home.classList.remove("fade-in");
  home.classList.add("fade-out");

  setTimeout(() => {
    home.classList.add("hidden");
    rectPage.classList.remove("hidden");
    rectPage.classList.add("fade-in");
  }, 600);
});


/* ==========================================================
   HOME PAGE — CLICK ANYWHERE INTRO FLOW
========================================================== */

const home = document.getElementById("home");
const step1 = document.getElementById("home-step-1");
const step2 = document.getElementById("home-step-2");
const rectPage = document.getElementById("rectPage");

let homeStep = 1;

home.addEventListener("click", () => {
  if (homeStep === 1) {
    // Step 1 → Step 2
    step1.classList.add("fade-out");

    setTimeout(() => {
      step1.classList.add("hidden");
      step2.classList.remove("hidden");
      step2.classList.add("fade-in");
      homeStep = 2;
    }, 500);

  } else if (homeStep === 2) {
    // Step 2 → Buttons page
    home.classList.add("fade-out");

    setTimeout(() => {
      home.classList.add("hidden");
      rectPage.classList.remove("hidden");
      rectPage.classList.add("fade-in");
    }, 600);
  }
});


/* ==========================================================
   GLOW BUTTON
========================================================== */

const glowBtn = document.getElementById("glowBtn");
let nextColor = randomColor();

glowBtn.addEventListener("mouseenter", () => {
  glowBtn.style.backgroundColor = nextColor;
  glowBtn.style.boxShadow = `0 0 25px ${nextColor}`;
  nextColor = randomColor();
});

glowBtn.addEventListener("mouseleave", () => {
  glowBtn.style.backgroundColor = "white";
  glowBtn.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
});

// CLICK — rainbow border flash
glowBtn.addEventListener("click", () => {
  glowBtn.style.animation = "rainbowFlash 0.5s linear";
  setTimeout(() => glowBtn.style.animation = "", 500);
});


/* ==========================================================
   SHAKE BUTTON
========================================================== */

const shakeBtn = document.getElementById("shakeBtn");
let shakeInterval;

shakeBtn.addEventListener("mouseenter", () => {
  shakeBtn.style.animation = "tinyShake 0.15s infinite linear";

  shakeInterval = setInterval(() => {
    shakeBtn.style.animation = "bigShake 0.4s linear";

    setTimeout(() => {
      if (shakeBtn.matches(":hover")) {
        shakeBtn.style.animation = "tinyShake 0.15s infinite linear";
      }
    }, 400);
  }, 3000);
});

shakeBtn.addEventListener("mouseleave", () => {
  clearInterval(shakeInterval);
  shakeBtn.style.animation = "";
});

shakeBtn.addEventListener("click", () => {
  shakeBtn.style.animation = "jumpUp 0.6s ease-out";

  setTimeout(() => {
    if (shakeBtn.matches(":hover")) {
      shakeBtn.style.animation = "tinyShake 0.15s infinite linear";
    } else {
      shakeBtn.style.animation = "";
    }
  }, 600);
});


/* ==========================================================
   COLOR BUTTON — BLOBS + OUTLINE GLOW
========================================================== */

const colorBtn = document.getElementById("colorBtn");
let blobActive = false;

function createBlob() {
  const blob = document.createElement("div");
  blob.classList.add("color-blob");

  blob.style.left = (Math.random() * 70 + 15) + "%";
  blob.style.top = (Math.random() * 70 + 15) + "%";
  blob.style.backgroundColor = randomColor();
  blob.style.animationDuration = (2 + Math.random() * 2) + "s";

  const size = 20 + Math.random() * 20;
  blob.style.width = size + "px";
  blob.style.height = size + "px";

  return blob;
}

colorBtn.addEventListener("mouseenter", () => {
  if (blobActive) return;
  blobActive = true;

  const count = 3 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    colorBtn.appendChild(createBlob());
  }
});

colorBtn.addEventListener("mouseleave", () => {
  blobActive = false;
  colorBtn.querySelectorAll(".color-blob").forEach(blob => {
    blob.style.transition = "opacity 0.7s ease";
    blob.style.opacity = "0";
    setTimeout(() => blob.remove(), 700);
  });
});

// CLICK — outline glow (spam-safe)
colorBtn.addEventListener("click", () => {
  const ring = document.createElement("div");
  ring.classList.add("color-outline-glow");
  ring.style.setProperty("--glow", randomColor());

  const r = colorBtn.getBoundingClientRect();
  ring.style.top = (r.top - 6) + "px";
  ring.style.left = (r.left - 6) + "px";
  ring.style.width = (r.width + 12) + "px";
  ring.style.height = (r.height + 12) + "px";

  document.body.appendChild(ring);
  setTimeout(() => ring.remove(), 850);
});


/* ==========================================================
   SIZE BUTTON — ELASTIC SQUISH
========================================================== */

const sizeBtn = document.getElementById("sizeBtn");

sizeBtn.addEventListener("click", () => {
  sizeBtn.classList.remove("squishing");
  void sizeBtn.offsetWidth; // force restart animation
  sizeBtn.classList.add("squishing");
});


/* ==========================================================
   BOUNCE BUTTON
========================================================== */

const bounceBtn = document.getElementById("bounceBtn");

bounceBtn.addEventListener("click", () => {
  bounceBtn.classList.remove("bouncing");
  void bounceBtn.offsetWidth; // force reflow
  bounceBtn.classList.add("bouncing");
});
