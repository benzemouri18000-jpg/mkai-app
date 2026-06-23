document.addEventListener("DOMContentLoaded", () => {

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({behavior:"smooth"});
    });
  });

  // scroll reveal
  const sections = document.querySelectorAll(".section");

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
      }
    });
  }, {threshold:0.15});

  sections.forEach(s => obs.observe(s));

});
