document.addEventListener("DOMContentLoaded", () => {

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  /* ================= SCROLL REVEAL SAFE ================= */
  const sections = document.querySelectorAll(".section");

  if (!sections.length) {
    console.warn("Aucune section trouvée");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.12
  });

  sections.forEach(section => {
    observer.observe(section);
  });

});
