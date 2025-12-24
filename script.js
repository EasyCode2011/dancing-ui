/* MENU TOGGLE */
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "g") {
    document.getElementById("menu").classList.toggle("open");
  }
});

/* PAGE SWITCHER */
const pages = {
  home: document.getElementById("home"),
  rect: document.getElementById("rectPage"),
  sliders: document.getElementById("sliderPage")
};

function show(page) {
  Object.values(pages).forEach(p => p.classList.remove("active"));
  page.classList.add("active");
  document.getElementById("menu").classList.remove("open");
}

document.getElementById("btnHome").onclick = () => show(pages.home);
document.getElementById("btnRectangles").onclick = () => show(pages.rect);
document.getElementById("btnSliders").onclick = () => show(pages.sliders);

/* SLIDER LOGIC */
function verticalSlider(slider) {
  const thumb = slider.querySelector(".v-thumb");
  let drag = false;

  thumb.onmousedown = () => drag = true;
  document.onmouseup = () => drag = false;

  document.onmousemove = (e) => {
    if (!drag) return;
    const r = slider.getBoundingClientRect();
    let y = e.clientY - r.top;
    y = Math.max(0, Math.min(r.height, y));
    thumb.style.top = (y - thumb.offsetHeight / 2) + "px";
  };
}

function horizontalSlider(slider) {
  const thumb = slider.querySelector(".h-thumb");
  let drag = false;

  thumb.onmousedown = () => drag = true;
  document.onmouseup = () => drag = false;

  document.onmousemove = (e) => {
    if (!drag) return;
    const r = slider.getBoundingClientRect();
    let x = e.clientX - r.left;
    x = Math.max(0, Math.min(r.width, x));
    thumb.style.left = (x - thumb.offsetWidth / 2) + "px";
  };
}

document.querySelectorAll(".v-slider").forEach(verticalSlider);
document.querySelectorAll(".h-slider").forEach(horizontalSlider);
