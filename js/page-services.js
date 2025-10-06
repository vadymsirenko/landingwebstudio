// Показ елементів при загрузці та скролі з різними напрямками
const animatedElements = document.querySelectorAll(
  ".fade-in-up, .fade-in-left, .fade-in-right"
);

const showOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;
  animatedElements.forEach((el) => {
    const rect = el.getBoundingClientRect().top;
    if (rect < triggerBottom) {
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);
