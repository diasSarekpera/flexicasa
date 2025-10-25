const sections = document.querySelectorAll(".reveal-stagger");

const revealStagger = () => {
sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight - 100;
    if (isVisible) {
    const cards = section.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
        card.classList.add("visible");
        }, index * 200); // délai entre les cartes (stagger)
    });
    }
});
};

window.addEventListener("scroll", revealStagger);
revealStagger();
