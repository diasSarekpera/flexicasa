document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-nav.prev");
  const nextBtn = document.querySelector(".testimonial-nav.next");
  let currentIndex = 0;
  let autoSlideInterval;

  // ✅ Initialisation : première carte visible
  testimonials.forEach((card, i) => {
    card.style.opacity = i === 0 ? "1" : "0";
    card.style.pointerEvents = i === 0 ? "auto" : "none";
  });

  // ===== Fonction principale =====
  function showTestimonial(index, direction = "next") {
    if (index === currentIndex) return;

    const currentCard = testimonials[currentIndex];
    const nextCard = testimonials[index];

    // 🔹 Réinitialiser les classes
    testimonials.forEach(c => {
      c.classList.remove("slide-in-right", "slide-in-left", "slide-out-left", "slide-out-right", "active");
    });

    // 🔹 Appliquer les animations selon la direction
    if (direction === "next") {
      currentCard.classList.add("slide-out-left");
      nextCard.classList.add("slide-in-right");
    } else {
      currentCard.classList.add("slide-out-right");
      nextCard.classList.add("slide-in-left");
    }

    // 🔹 Activer la prochaine carte
    nextCard.classList.add("active");
    nextCard.style.pointerEvents = "auto";
    nextCard.style.opacity = "1";

    // 🔹 Événement de fin d’animation pour nettoyer
    currentCard.addEventListener(
      "animationend",
      () => {
        currentCard.style.opacity = "0";
        currentCard.style.pointerEvents = "none";
        currentCard.classList.remove("slide-out-left", "slide-out-right");
      },
      { once: true }
    );

    currentIndex = index;
  }

  // ===== Navigation =====
  const nextTestimonial = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex, "next");
  };

  const prevTestimonial = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex, "prev");
  };

  nextBtn?.addEventListener("click", () => {
    nextTestimonial();
    resetAutoSlide();
  });

  prevBtn?.addEventListener("click", () => {
    prevTestimonial();
    resetAutoSlide();
  });

  // ===== Auto-slide =====
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 6000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // ===== Swipe Mobile =====
  let startX = 0;
  const slider = document.querySelector(".testimonials-slider");

  slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) {
      prevTestimonial();
      resetAutoSlide();
    } else if (diff < -50) {
      nextTestimonial();
      resetAutoSlide();
    }
  });

  // ✅ Lancement automatique
  startAutoSlide();
});
