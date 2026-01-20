const plant = document.getElementById("plant");
const message = document.getElementById("message");
const sky = document.getElementById("sky");
const blooms = document.getElementById("blooms");
const fireflies = document.getElementById("fireflies");

let focusScore = 0;
let calmSeconds = 0;
let distracted = false;
let bloomed = false;

/* 🌱 Main loop — runs every 3 seconds */
setInterval(() => {
  if (!distracted) {
    focusScore++;
    calmSeconds += 3;

    spawnParticle();

    // Subtle visible progress
    if (focusScore === 6) {
      plant.textContent = "🌿";
      sky.style.background =
        "linear-gradient(180deg, #d4fbe3, #b7f7d8, #ffffff)";
    }

    if (focusScore === 12) {
      plant.textContent = "🌳";
      sky.style.background =
        "linear-gradient(180deg, #b6f3d1, #9ae6c3, #ffffff)";
    }

    // 🪄 HIDDEN BLOOM — ~30 seconds of calm
    if (calmSeconds >= 30 && !bloomed) {
      triggerHiddenBloom();
      bloomed = true;
    }
  }
}, 3000);

/* ✨ Calm particles (always subtle) */
function spawnParticle() {
  const p = document.createElement("div");
  p.className = "particle";
  p.textContent = "✨";
  p.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 6000);
}

/* 🌸 Hidden bloom moment */
function triggerHiddenBloom() {
  message.textContent = "Something beautiful happens when you stay calm.";

  for (let i = 0; i < 7; i++) {
    const flower = document.createElement("div");
    flower.className = "bloom";
    flower.textContent = "🌸";
    flower.style.left = Math.random() * window.innerWidth + "px";
    blooms.appendChild(flower);
  }

  // Fireflies start AFTER discovery
  setInterval(spawnFirefly, 1200);
}

/* ✨ Fireflies */
function spawnFirefly() {
  const f = document.createElement("div");
  f.className = "firefly";
  f.style.left = Math.random() * window.innerWidth + "px";
  f.style.bottom = "90px";
  fireflies.appendChild(f);
  setTimeout(() => f.remove(), 8000);
}

/* ❌ Distraction resets calm */
document.addEventListener("click", () => {
  distracted = true;
  calmSeconds = 0;
  plant.classList.add("distracted");
  message.textContent = "Rushing interrupts growth.";

  setTimeout(() => {
    distracted = false;
    plant.classList.remove("distracted");
    message.textContent = "Stay still.";
  }, 4000);
});
