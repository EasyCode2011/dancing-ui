// Toggle menu with G
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "g") {
    document.getElementById("menu").classList.toggle("open");
  }
});

// Click: switch to rectangle demo
document.getElementById("btnRectangles").addEventListener("click", () => {
  const home = document.getElementById("home");
  const rec = document.getElementById("rectPage");

  // fade out home
  home.classList.remove("fade-in");
  home.classList.add("fade-out");

  setTimeout(() => {
    home.classList.add("hidden");
    rec.classList.remove("hidden");
    rec.classList.add("fade-in");
  }, 600);
});

const glowBtn = document.getElementById("glowBtn");

// Make random color
function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

let nextColor = randomColor();

glowBtn.addEventListener("mouseenter", () => {
  glowBtn.style.backgroundColor = nextColor;

  // Soft glow (same color)
  glowBtn.style.boxShadow = `0 0 25px ${nextColor}`;

  // Prepare next color
  nextColor = randomColor();
});

glowBtn.addEventListener("mouseleave", () => {
  glowBtn.style.backgroundColor = "white";

  // Remove glow smoothly
  glowBtn.style.boxShadow = "0 0 0px rgba(0,0,0,0)";
});


// ----------------------------------------------------------
// ⬇️ ⬇️ ADD THIS PART AT THE END ⬇️ ⬇️
// CLICK — rainbow border flash
glowBtn.addEventListener("click", () => {
  glowBtn.style.animation = "rainbowFlash 0.5s linear";

  // Remove animation so it can replay every click
  setTimeout(() => {
    glowBtn.style.animation = "";
  }, 500);
});
// ----------------------------------------------------------
