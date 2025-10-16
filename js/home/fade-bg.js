document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".bg-slide");
  if (slides.length < 2) return;

  // 🔁 Images (remplace par tes chemins corrects)
  const IMAGES = [
    "./assets/images/01-hero/bg1.jpg",
    "./assets/images/01-hero/bg2.jpg",
    "./assets/images/01-hero/bg3.jpg",
  ];

  const DURATION = 10000; // 10s (mets 30000 pour 30s)
  let index = 0;
  let active = slides[0];
  let next = slides[1];

  // 🧰 helper: précharge une image et résout quand ok
  function preload(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = reject;
      img.src = src;
    });
  }

  // 🔧 initialise : pose les 2 premières images
  function init() {
    active.style.backgroundImage = `url("${IMAGES[0]}")`;
    next.style.backgroundImage = `url("${IMAGES[1]}")`;
    active.classList.add("active");
    index = 1; // la dernière utilisée dans "next"
  }

  async function cycle() {
    // calcule l'index suivant
    const nextIndex = (index + 1) % IMAGES.length;

    try {
      // ✅ Précharge l'image suivante pour éviter tout flash
      await preload(IMAGES[nextIndex]);
      // pose la nouvelle image sur le slide "next"
      next.style.backgroundImage = `url("${IMAGES[nextIndex]}")`;

      // 🎞️ Crossfade
      next.classList.add("active");
      // attendre la fin du fondu (≈ 1.6s dans le CSS)
      setTimeout(() => {
        active.classList.remove("active");
        // swap des références
        const temp = active;
        active = next;
        next = temp;
        // met à jour l'index courant
        index = nextIndex;
      }, 1700);
    } catch (e) {
      // Si une image locale est introuvable, on saute proprement
      console.warn("Image non chargée, on passe à la suivante :", IMAGES[nextIndex]);
      index = nextIndex;
    }
  }

  init();
  setInterval(cycle, DURATION);
});
