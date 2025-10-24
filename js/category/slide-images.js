document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const thumbnailsWrapper = document.querySelector(".thumbnails-wrapper");
  const thumbnails = document.querySelector(".thumbnails");
  const thumbButtons = document.querySelectorAll(".thumb-btn");
  const btnLeft = document.querySelector(".thumb-nav-left");
  const btnRight = document.querySelector(".thumb-nav-right");

  // === FONCTION : précharger les images pour éviter le délai ===
  function preloadImages() {
    thumbButtons.forEach(btn => {
      const imgSrc = btn.getAttribute("data-full");
      const img = new Image();
      img.src = imgSrc;
    });
  }

  // === FONCTION : mise à jour de l’image principale avec effet premium ===
  function updateMainImage(src, clickedBtn) {
    // Désactive temporairement les clics pendant la transition
    mainImage.style.pointerEvents = "none";

    // Animation de sortie
    mainImage.classList.add("fade-out");

    // Quand l’image est prête, on fait la transition
    const newImg = new Image();
    newImg.src = src;
    newImg.onload = () => {
      // Une fois chargée, on remplace l’image
      mainImage.src = src;
      mainImage.classList.remove("fade-out");
      mainImage.classList.add("fade-in");

      // Supprimer la classe fade-in après animation
      setTimeout(() => {
        mainImage.classList.remove("fade-in");
        mainImage.style.pointerEvents = "auto";
      }, 400);
    };

    // Met à jour la miniature active
    thumbButtons.forEach(btn => btn.classList.remove("active"));
    clickedBtn.classList.add("active");
  }

  // === FONCTION : Vérifier visibilité flèches ===
  function updateArrowsVisibility() {
    const scrollLeft = thumbnails.scrollLeft;
    const maxScrollLeft = thumbnails.scrollWidth - thumbnails.clientWidth;

    btnLeft.hidden = scrollLeft <= 5;
    btnRight.hidden = scrollLeft >= maxScrollLeft - 5;
  }

  // === FONCTION : Défilement fluide des miniatures ===
  function scrollThumbnails(direction) {
    const scrollAmount = thumbnailsWrapper.clientWidth * 0.8;
    thumbnails.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  }

  // === Écouteurs : clic sur miniature ===
  thumbButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const fullImg = btn.getAttribute("data-full");
      updateMainImage(fullImg, btn);
    });
  });

  // === Écouteurs : clic sur flèches ===
  btnLeft.addEventListener("click", () => scrollThumbnails("left"));
  btnRight.addEventListener("click", () => scrollThumbnails("right"));

  // === Met à jour la visibilité des flèches ===
  thumbnails.addEventListener("scroll", updateArrowsVisibility);
  window.addEventListener("resize", updateArrowsVisibility);

  // === Initialisation ===
  preloadImages();
  updateArrowsVisibility();
  if (thumbButtons.length > 0) {
    thumbButtons[0].classList.add("active");
  }


  // === GESTE GLISSER (DRAG / SWIPE) SUR MINIATURES AVEC INERTIE ===
  let isDown = false;
  let startX;
  let scrollLeftStart;
  let velocity = 0;
  let momentumID;

  function startDrag(e) {
    cancelMomentum(); // stop tout mouvement précédent
    isDown = true;
    thumbnails.classList.add('dragging');
    startX = e.pageX || e.touches[0].pageX;
    scrollLeftStart = thumbnails.scrollLeft;
  }

  function moveDrag(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX);
    const prevScroll = thumbnails.scrollLeft;
    thumbnails.scrollLeft = scrollLeftStart - walk;
    velocity = thumbnails.scrollLeft - prevScroll; // calcule la vitesse
  }

  function stopDrag() {
    isDown = false;
    thumbnails.classList.remove('dragging');
    beginMomentumScroll();
  }

  /* === EFFET D’INERTIE FLUIDE === */
  function beginMomentumScroll() {
    cancelMomentum();
    momentumID = requestAnimationFrame(momentumLoop);
  }

  function cancelMomentum() {
    cancelAnimationFrame(momentumID);
  }

  function momentumLoop() {
    thumbnails.scrollLeft += velocity;
    velocity *= 0.95; // amortissement progressif (0.9 → plus long, 0.98 → ultra fluide)
    if (Math.abs(velocity) > 0.5) {
      momentumID = requestAnimationFrame(momentumLoop);
    }
  }

  /* === ÉVÉNEMENTS SOURIS & TOUCH === */
  thumbnails.addEventListener('mousedown', startDrag);
  thumbnails.addEventListener('mousemove', moveDrag);
  thumbnails.addEventListener('mouseup', stopDrag);
  thumbnails.addEventListener('mouseleave', stopDrag);

  thumbnails.addEventListener('touchstart', startDrag);
  thumbnails.addEventListener('touchmove', moveDrag);
  thumbnails.addEventListener('touchend', stopDrag);



});
