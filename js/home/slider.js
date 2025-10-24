document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".testimonial-nav.prev");
  const nextBtn = document.querySelector(".testimonial-nav.next");
  let currentIndex = 0;
  let autoSlideInterval;

  function showTestimonial(index, direction = "next") {
    if (index === currentIndex) return;

    const currentCard = testimonials[currentIndex];
    const nextCard = testimonials[index];

    testimonials.forEach(c =>
      c.classList.remove("active", "slide-in-right", "slide-out-left")
    );

    currentCard.classList.add("slide-out-left");
    nextCard.classList.add("active", "slide-in-right");

    currentIndex = index;
  }

  function nextTestimonial() {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex, "next");
  }

  function prevTestimonial() {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prevIndex, "prev");
  }

  // Navigation flèches
  nextBtn?.addEventListener("click", () => { nextTestimonial(); resetAutoSlide(); });
  prevBtn?.addEventListener("click", () => { prevTestimonial(); resetAutoSlide(); });

  // Auto-slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 6000);
  }
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Swipe mobile
  let startX = 0;
  const slider = document.querySelector(".testimonials-slider");

  slider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) { // swipe droite
      prevTestimonial();
      resetAutoSlide();
    } else if (diff < -50) { // swipe gauche
      nextTestimonial();
      resetAutoSlide();
    }
  });

  // Init
  testimonials.forEach(c => c.classList.remove("active"));
  testimonials[0].classList.add("active");
  startAutoSlide();
});
