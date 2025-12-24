slider.style.filter = `drop-shadow(0 0 ${slider.value / 5}px cyan)`;
});
});

/* -------------------------
   GENERIC SLIDER LOGIC
------------------------- */

function makeVerticalSlider(slider) {
  const thumb = slider.querySelector(".v-thumb");
  let dragging = false;

  thumb.addEventListener("mousedown", () => dragging = true);
  document.addEventListener("mouseup", () => dragging = false);

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    const rect = slider.getBoundingClientRect();
    let y = e.clientY - rect.top;

    y = Math.max(0, Math.min(rect.height, y));
    thumb.style.top = `${y - thumb.offsetHeight / 2}px`;
  });
}

function makeHorizontalSlider(slider) {
  const thumb = slider.querySelector(".h-thumb");
  let dragging = false;

  thumb.addEventListener("mousedown", () => dragging = true);
  document.addEventListener("mouseup", () => dragging = false);

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    const rect = slider.getBoundingClientRect();
    let x = e.clientX - rect.left;

    x = Math.max(0, Math.min(rect.width, x));
    thumb.style.left = `${x - thumb.offsetWidth / 2}px`;
  });
}

/* INIT ALL SLIDERS */
document.querySelectorAll(".v-slider").forEach(makeVerticalSlider);
document.querySelectorAll(".h-slider").forEach(makeHorizontalSlider);
