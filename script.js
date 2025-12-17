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

  // immediate tiny shake when first hovered
  shakeBtn.style.animation = "tinyShake 0.15s infinite linear";
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
  const x = Math.random() * 70 + 15;
  const y = Math.random() * 70 + 15;

  blob.style.left = x + "%";
  blob.style.top = y + "%";

  // Random blob color
  blob.style.backgroundColor = randomColor();

  // Vary animation duration for more natural movement
  blob.style.animationDuration = (2 + Math.random() * 2) + "s";

  // Vary size
  const sz = 20 + Math.floor(Math.random() * 20);
  blob.style.width = sz + "px";
  blob.style.height = sz + "px";

  return blob;
}

// On hover — spawn multiple random blobs
colorBtn.addEventListener("mouseenter", () => {
  if (blobActive) return;
  blobActive = true;

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

    setTimeout(() => b.remove(), 700);
  });
});

/* ----------------------------------------------------------
   COLOR BUTTON CLICK — OUTLINE GLOW RINGS
---------------------------------------------------------- */
colorBtn.addEventListener("click", () => {
  // Create glow ring
  const ring = document.createElement("div");
  ring.classList.add("color-outline-glow");

  // Random outline color
  const c = randomColor();
  ring.style.setProperty("--glow", c);

  // Get button position relative to viewport
  const btnRect = colorBtn.getBoundingClientRect();

  // Position ring absolutely relative to viewport
  ring.style.position = "fixed";
  ring.style.top = (btnRect.top - 6) + "px";
  ring.style.left = (btnRect.left - 6) + "px";
  ring.style.width = (btnRect.width + 12) + "px";
  ring.style.height = (btnRect.height + 12) + "px";

  // Append to body to avoid any container positioning issues
  document.body.appendChild(ring);

  // Remove after animation
  setTimeout(() => ring.remove(), 850);
});

/* ----------------------------------------------------------
   SIZE BUTTON — BREATHING + SQUISH
---------------------------------------------------------- */
const sizeBtn = document.getElementById("sizeBtn");

sizeBtn.addEventListener("click", () => {
  // Create a visible squish layer
  const layer = document.createElement("div");
  layer.classList.add("squish-layer");
  sizeBtn.appendChild(layer);

  // Add the 'squishing' class to trigger the click animation
  sizeBtn.classList.add('squishing');

  // After animation completes, remove the layer and the class
  setTimeout(() => {
    layer.remove();
    sizeBtn.classList.remove('squishing');
    // That's it! The browser will now correctly check
    // if the mouse is hovering and apply/remove the
    // 'breathing' animation on its own.
  }, 350); // Match the duration of the squish animation
});

/* ----------------------------------------------------------
   BOUNCE BUTTON LOGIC
---------------------------------------------------------- */
const bounceBtn = document.getElementById("bounceBtn");

bounceBtn.addEventListener("click", () => {
  bounceBtn.classList.remove("bouncing");
  void bounceBtn.offsetWidth; // force reflow
  bounceBtn.classList.add("bouncing");
});

const home = document.getElementById("home");
const introScene = document.getElementById("introScene");
const rectPage = document.getElementById("rectPage");

const btnHome = document.getElementById("btnHome");
const btnRectangles = document.getElementById("btnRectangles");

let scene = 1;
let transitioning = false;

/* ---------------------------
   PAGE SWITCHER (THE BOSS)
--------------------------- */
function showPage(page) {
  if (transitioning) return;
  transitioning = true;

  // Fade out all
  [home, introScene, rectPage].forEach(el => {
    el.classList.remove("fade-in");
    el.classList.add("fade-out");
  });

  setTimeout(() => {
    // Hide all
    [home, introScene, rectPage].forEach(el => {
      el.classList.add("hidden");
      el.classList.remove("fade-out");
    });

    // Show target
    page.classList.remove("hidden");
    page.classList.add("fade-in");

    transitioning = false;
  }, 600);
}

/* ---------------------------
   MENU BUTTONS
--------------------------- */
btnHome.addEventListener("click", () => {
  scene = 1;
  showPage(home);
  document.getElementById("menu").classList.remove("open");
});

btnRectangles.addEventListener("click", () => {
  scene = 3;
  showPage(rectPage);
  document.getElementById("menu").classList.remove("open");
});

/* ---------------------------
   CLICK ANYWHERE FLOW
--------------------------- */
document.addEventListener("click", (e) => {
  // Ignore menu clicks
  if (e.target.closest("#menu")) return;

  if (scene === 1) {
    showPage(introScene);
    scene = 2;
  }
  else if (scene === 2) {
    showPage(rectPage);
    scene = 3;
  }
});

/* ------------------------------------------
   HOME TITLE — CURSOR VELOCITY SHAKE (FIXED)
------------------------------------------ */

const homeCard = document.getElementById("home");

let lastX = null;
let lastY = null;
let velocity = 0;
let shake = 0;

homeCard.addEventListener("mousemove", (e) => {
  if (lastX === null) {
    lastX = e.clientX;
    lastY = e.clientY;
    return;
  }

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  // Distance moved this frame
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Velocity accumulation
  velocity = distance * 0.6;

  // Add energy instead of replacing it
  shake += velocity;

  // Clamp max insanity
  shake = Math.min(shake, 30);

  lastX = e.clientX;
  lastY = e.clientY;
});

// Reset when leaving the area
homeCard.addEventListener("mouseleave", () => {
  lastX = null;
  lastY = null;
});

// Animation loop
function animateHomeShake() {
  if (shake > 0.5) {
    const x = (Math.random() - 0.5) * shake;
    const y = (Math.random() - 0.5) * shake;

    homeCard.style.transform =
      `translate(-50%, -50%) translate(${x}px, ${y}px)`;

    // Natural damping
    shake *= 0.82;
  } else {
    homeCard.style.transform =
      `translate(-50%, -50%)`;
    shake = 0;
  }

  requestAnimationFrame(animateHomeShake);
}

animateHomeShake();

shake = Math.min(shake, 80);
