const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
reveals.forEach(section => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100; // marge d’activation
    if (isVisible) {
    section.classList.add("active");
    }
});
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // exécution initiale
