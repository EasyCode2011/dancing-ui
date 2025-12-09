// =========================================================
// TOGGLE MENU WITH G
// =========================================================
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "g") {
    document.getElementById("menu").classList.toggle("open");
  }
});

// =========================================================
// SWITCH TO RECTANGLE PAGE
// =========================================================
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

// =========================================================
// UTILITY — restart animations smoothly (spam-proof)
// =========================================================
function restartAnim(el, className) {
  el.classList.remove(className);
  void el.offsetWidth; // force reflow to restart animation
  el.classList.add(className);
}

function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 90%, 60%)`;
}



// =========================================================
// GLOW BUTTON — smooth outer glow + smooth click pulse
// =========================================================
const glowBtn = document.getElementById("glowBtn");

glowBtn.addEventListener("mouseenter", () => {
  const c = randomColor();
  glowBtn.style.transition = "all 0.4s ease";
  glowBtn.style.boxShadow = `0 0 30px 10px ${c}`;
  glowBtn.style.background = c;
});

glowBtn.addEventListener("mouseleave", () => {
  glowBtn.style.transition = "all 0.4s ease";
  glowBtn.style.boxShadow = "0 0 0px rgba(0,0,0,0)";
  glowBtn.style.background = "white";
});

// smooth click pulse
glowBtn.addEventListener("click", () => {
  restartAnim(glowBtn, "glow-click");
});



// =========================================================
// SHAKE BUTTON — hover shake + gravity jump on click
// =========================================================
const shakeBtn = document.getElementById("shakeBtn");

shakeBtn.addEventListener("mouseenter", () => {
  restartAnim(shakeBtn, "shake-hover");
});

shakeBtn.addEventListener("mouseleave", () => {
  shakeBtn.classList.remove("shake-hover");
});

shakeBtn.addEventListener("click", () => {
  restartAnim(shakeBtn, "gravity-jump");
});



// =========================================================
// COLOR BUTTON — smooth rainbow glow + no lag on spam
// =========================================================
const colorBtn = document.getElementById("colorBtn");

// Hover → smooth rainbow pulse
colorBtn.addEventListener("mouseenter", () => {
  restartAnim(colorBtn, "color-hover");
});

colorBtn.addEventListener("mouseleave", () => {
  colorBtn.classList.remove("color-hover");
});

// Click → bright smooth burst
colorBtn.addEventListener("click", () => {
  restartAnim(colorBtn, "color-click");
});



// =========================================================
// SIZE BUTTON — smooth squish/stretch
// =========================================================
const sizeBtn = document.getElementById("sizeBtn");

sizeBtn.addEventListener("mouseenter", () => {
  restartAnim(sizeBtn, "size-hover");
});

sizeBtn.addEventListener("mouseleave", () => {
  sizeBtn.classList.remove("size-hover");
});

sizeBtn.addEventListener("click", () => {
  restartAnim(sizeBtn, "size-click");
});



// =========================================================
// BOUNCE BUTTON — physics-style bounce with gravity
// =========================================================
const bounceBtn = document.getElementById("bounceBtn");

bounceBtn.addEventListener("click", () => {
  restartAnim(bounceBtn, "bounce-click");
});
