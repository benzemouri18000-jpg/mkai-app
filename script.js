
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SMOOTH SCROLL MENU
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {

      const target = document.querySelector(a.getAttribute("href"));

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });
  });

  /* =========================
     REVEAL ANIMATION (SCROLL)
  ========================= */

  const elements = document.querySelectorAll(".reveal");

  const reveal = () => {

    const trigger = window.innerHeight * 0.85;

    elements.forEach(el => {

      const top = el.getBoundingClientRect().top;

      if (top < trigger) {
        el.classList.add("active");
      }

    });

  };

  window.addEventListener("scroll", reveal);
  reveal(); // run once at start

});
