document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // SMOOTH SCROLL
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // =========================
  // OUTFITS MKAI
  // =========================
  const outfits = [
    {
      weather: "☀️ 26°C • Paris",
      style: "Old Money Casual",
      items: [
        "👕 Chemise beige oversize",
        "👖 Pantalon crème",
        "👟 Sneakers blanches",
        "⌚ Montre minimaliste"
      ]
    },
    {
      weather: "🌤️ 18°C • Paris",
      style: "Clean Streetwear",
      items: [
        "🧥 Veste beige",
        "👕 T-shirt blanc",
        "👖 Jean droit",
        "👟 Sneakers New Balance"
      ]
    },
    {
      weather: "🌧️ 12°C • Paris",
      style: "Winter Minimal",
      items: [
        "🧥 Manteau laine",
        "🧶 Pull beige",
        "👖 Pantalon sombre",
        "🥾 Boots"
      ]
    }
  ];

  // =========================
  // BUTTON ACTION
  // =========================
  const btn = document.querySelector(".btn-primary");
  const screen = document.querySelector(".phone-screen");

  if (!btn || !screen) return;

  btn.addEventListener("click", () => {

    const outfit = outfits[Math.floor(Math.random() * outfits.length)];

    screen.innerHTML = `
      <div class="screen-title">MKAI</div>
      <div class="screen-sub">Tenue du jour</div>

      <div class="outfit-card">${outfit.weather}</div>
      <div class="outfit-card highlight">${outfit.style}</div>

      ${outfit.items.map(item => `
        <div class="outfit-card">${item}</div>
      `).join("")}
    `;

  });

});
