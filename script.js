// ----------------------------------------------------------
// TOGGLE MENU WITH G
// ----------------------------------------------------------
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "g") {
    document.getElementById("menu").classList.toggle("open");
  }
});

// ----------------------------------------------------------
// RECTANGLE PAGE SWITCH
// ----------------------------------------------------------
document.getElementById("btnRectangles").addEventListener("click", () => {
  const home = document.getElementById("home");
  const rec = document.getElementById("rectPage");

  home.classList.remove("fade-in");
  home.classList.add("fade-out");

  setTimeout(() => {
    home.classList.add("hidden");
    rec.classList.remove("hidden");
    rec.classList.add("fade-in");
  }, 600);
});

// ----------------------------------------------------------
// GLOW BUTTON (Hover steady glow + spam-safe click rings)
// ----------------------------------------------------------
const glowBtn = document.getElementById("glowBtn");

// random color
function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

let nextColor = randomColor();

// Hover = smooth glow that prepares next color
glowBtn.addEventListener("mouseenter", () => {
  glowBtn.style.backgroundColor = nextColor;
  glowBtn.style.boxShadow = `0 0 25px ${nextColor}`;
  nextColor = randomColor();
});

glowBtn.addEventListener("mouseleave", () => {
  glowBtn.style.backgroundColor = "white";
  glowBtn.style.boxShadow = "0 0 0px rgba(0,0,0,0)";
});

// CLICK = infinite glow rings (spam-safe)
glowBtn.addEventListener("click", () => {
  const ring = document.createElement("div");
  ring.classList.add("color-outline-glow");
  ring.style.setProperty("--glow", nextColor);

  glowBtn.appendChild(ring);

  // remove after fade finishes
  setTimeout(() => ring.remove(), 900);
});

// ----------------------------------------------------------
// SHAKE BUTTON
// ----------------------------------------------------------
const shakeBtn = document.getElementById("shakeBtn");
let shakeInterval;

shakeBtn.addEventListener("mouseenter", () => {
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
