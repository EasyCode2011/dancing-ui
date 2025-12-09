// Toggle menu with G
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "g") {
    document.getElementById("menu").classList.toggle("open");
  }
});

// Switch to rectangle demo
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

/* ----------------------------------------------------------
   GLOW BUTTON LOGIC
---------------------------------------------------------- */
const glowBtn = document.getElementById("glowBtn");

// Make random color (uses HSL for nicer distribution)
function randomColor() {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h} 90% 60%)`;
}

let nextColor = randomColor();

glowBtn.addEventListener("mouseenter", () => {
  glowBtn.style.backgroundColor = nextColor;
  glowBtn.style.boxShadow = `0 0 25px ${nextColor}`;
  nextColor = randomColor();
});

glowBtn.addEventListener("mouseleave", () => {
  glowBtn.style.backgroundColor = "white";
  glowBtn.style.boxShadow = "0 0 0px rgba(0,0,0,0)";
});

// CLICK — rainbow border flash
glowBtn.addEventListener("click", () => {
  glowBtn.style.animation = "rainbowFlash 0.5s linear";

  setTimeout(() => {
    glowBtn.style.animation = "";
  }, 500);
});


/* ----------------------------------------------------------
   SHAKE BUTTON LOGIC
---------------------------------------------------------- */
const shakeBtn = document.getElementById("shakeBtn");
let shakeInterval;

// When hovered → start the cycle
shakeBtn.addEventListener("mouseenter", () => {
  // Start big shake every 3s
  shakeInterval = setInterval(() => {
    shakeBtn.style.animation = "bigShake 0.4s linear";

    // Reset back to small shake after big shake ends
    setTimeout(() => {
      if (shakeBtn.matches(":hover")) {
        shakeBtn.style.animation = "tinyShake 0.15s infinite linear";
      }
    }, 400);

  }, 3000);
});

// When leaving → stop everything
shakeBtn.addEventListener("mouseleave", () => {
  clearInterval(shakeInterval);
  shakeBtn.style.animation = "";
});

// CLICK → jump with gravity
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


/* ----------------------------------------------------------
   COLOR BUTTON — RANDOM FLOATING COLOR BLOBS
---------------------------------------------------------- */
const colorBtn = document.getElementById("colorBtn");
let blobActive = false;

// Create a random blob element
function createBlob() {
  const blob = document.createElement("div");
  blob.classList.add("color-blob");

  // Random position inside button area
  const x = Math.random() * 80; // keep inside bounds a bit
  const y = Math.random() * 80;

  blob.style.left = x + "%";
  blob.style.top = y + "%";

  // Random blob color
  blob.style.backgroundColor = randomColor();

  // Random animation speed offset
  blob.style.animationDuration = (6 + Math.random() * 4) + "s";

  // Vary size a bit
  const sz = 40 + Math.floor(Math.random() * 50);
  blob.style.width = sz + "px";
  blob.style.height = sz + "px";

  return blob;
}

// On hover — spawn multiple random blobs
colorBtn.addEventListener("mouseenter", () => {
  if (blobActive) return;
  blobActive = true;

  // 3–6 blobs
  const count = 3 + Math.floor(Math.random() * 4);

  for (let i = 0; i < count; i++) {
    const blob = createBlob();
    colorBtn.appendChild(blob);
  }
});

// On leave — fade out + remove blobs
colorBtn.addEventListener("mouseleave", () => {
  blobActive = false;

  const blobs = colorBtn.querySelectorAll(".color-blob");
  blobs.forEach((b) => {
    b.style.transition = "opacity 0.7s ease";
    b.style.opacity = "0";

    setTimeout(() => {
      b.remove();
    }, 700);
  });
});

// CLICK — burst effect
colorBtn.addEventListener("click", () => {
  colorBtn.classList.add("clicked");

  setTimeout(() => {
    colorBtn.classList.remove("clicked");
  }, 500);
});
