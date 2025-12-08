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

// Generate random color
function randomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

let nextColor = randomColor();

glowBtn.addEventListener("mouseenter", () => {
  glowBtn.style.backgroundColor = nextColor;

  // prepare next random color for next hover
  nextColor = randomColor();
});

glowBtn.addEventListener("mouseleave", () => {
  glowBtn.style.backgroundColor = "white";
});
