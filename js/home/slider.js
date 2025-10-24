document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-nav.prev");
  const nextBtn = document.querySelector(".testimonial-nav.next");
  let currentIndex = 0;
  let autoSlideInterval;

  // ✅ Correction : afficher immédiatement le premier témoignage
  testimonials.forEach((c, i) => {
    if (i === 0) {
      c.classList.add("active");
      c.style.opacity = "1"; // assure une visibilité immédiate
      c.style.transition = "none"; // évite une transition lente au chargement
    } else {
      c.classList.remove("active");
      c.style.opacity = "0";
    }
  });

  // ===== Fonction d'affichage =====
  function showTestimonial(index, direction = "next") {
    if (index === currentIndex) return;

    const currentCard = testimonials[currentIndex];
    const nextCard = testimonials[index];

    currentCard.classList.remove("slide-in-right", "slide-in-left");
    nextCard.classList.remove("slide-out-left", "slide-out-right");

    // Animation selon la direction
    if (direction === "next") {
      currentCard.classList.add("slide-out-left");
      nextCard.classList.add("slide-in-right");
    } else {
      currentCard.classList.add("slide-out-right");
      nextCard.classList.add("slide-in-left");
    }

    testimonials.forEach(c => c.classList.remove("active"));
    nextCard.classList.add("active");
    currentIndex = index;
  }

  // ===== Suivant / Précédent =====
  function nextTestimonial() {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex, "next");
  }

  function prevTestimonial() {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex, "prev");
  }

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

  // ✅ Lancement immédiat
  startAutoSlide();
});
