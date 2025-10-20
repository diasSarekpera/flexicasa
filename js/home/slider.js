document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-nav.prev");
  const nextBtn = document.querySelector(".testimonial-nav.next");
  let currentIndex = 0;
  let autoSlideInterval;

  function showTestimonial(index, direction = "next") {
    if (index === currentIndex) return; // pas de changement inutile

    const currentCard = testimonials[currentIndex];
    const nextCard = testimonials[index];

    // Déterminer les classes d'animation
    const slideOut = direction === "next" ? "slide-out-left" : "slide-out-right";
    const slideIn = direction === "next" ? "slide-in-right" : "slide-in-left";

    // Retirer toutes les classes
    testimonials.forEach(card => {
      card.classList.remove("active", "slide-in-left", "slide-in-right", "slide-out-left", "slide-out-right");
    });

    // Appliquer animations
    currentCard.classList.add(slideOut);
    nextCard.classList.add("active", slideIn);

    // Mettre à jour l'index courant
    currentIndex = index;
  }

  function nextTestimonial() {
    let nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex, "next");
  }

  function prevTestimonial() {
    let prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex, "prev");
  }

  // Flèches
  if (nextBtn) nextBtn.addEventListener("click", () => { nextTestimonial(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevTestimonial(); resetAutoSlide(); });

  // Slide automatique
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Initialisation
  testimonials.forEach(card => card.classList.remove("active"));
  testimonials[0].classList.add("active");
  startAutoSlide();
});
