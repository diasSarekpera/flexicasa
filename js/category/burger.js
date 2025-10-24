// ===============================
//  MENU OVERLAY - FLEXICASA
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".menu-burger");
  const overlay = document.querySelector("#menu-overlay");
  const menuLinks = document.querySelectorAll(".menu-links li a");

  // Fonction pour ouvrir/fermer le menu
  function toggleMenu() {
    const isActive = overlay.classList.toggle("active");
    burger.classList.toggle("active");
    burger.setAttribute("aria-expanded", isActive);
    overlay.setAttribute("aria-hidden", !isActive);

    // Si on ouvre → lance l'animation stagger
    if (isActive) {
      menuLinks.forEach((link, i) => {
        link.style.opacity = "0";
        link.style.transform = "translateY(20px)";
        setTimeout(() => {
          link.style.transition = "all 0.4s ease";
          link.style.opacity = "1";
          link.style.transform = "translateY(0)";
        }, i * 120 + 150); // ⏱ délai enchaîné
      });
    } else {
      // Si on ferme → réinitialise les liens
      menuLinks.forEach((link) => {
        link.style.opacity = "0";
        link.style.transform = "translateY(20px)";
      });
    }
  }

  // Clique sur le burger → toggle
  burger.addEventListener("click", toggleMenu);

  // Clique sur un lien → ferme le menu
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      overlay.classList.remove("active");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", false);
      overlay.setAttribute("aria-hidden", true);
    });
  });
});


burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    overlay.classList.toggle("active");
  
    // Change couleur des lignes selon état
    const lines = burger.querySelectorAll(".burger-line");
    lines.forEach(line => {
      line.style.backgroundColor = overlay.classList.contains("active")
        ? "var(--color-secondary)"
        : "var(--color-white)";
    });
  });
  