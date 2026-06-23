document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll (garde ton UX propre)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ================================
  // MKAI OUTFIT GENERATOR
  // ================================

  const outfits = [
    {
      weather: "☀️ 26°C • Sète",
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
      style: "Street chic",
      items: [
        "🧥 Veste beige",
        "👕 T-shirt blanc",
        "👖 Jean droit",
        "👟 New Balance"
      ]
    },
    {
      weather: "🌧️ 12°C • Lyon",
      style: "Winter clean",
      items: [
        "🧥 Manteau laine",
        "🧶 Pull beige",
        "👖 Pantalon sombre",
        "🥾 Boots"
      ]
    }
  ];

  const btn = document.querySelector(".btn-primary");
  const screen = document.querySelector(".phone-screen");

  if (btn && screen) {
    btn.addEventListener("click", () => {

      const random = outfits[Math.floor(Math.random() * outfits.length)];

      screen.innerHTML = `
        <div class="screen-title">MKAI</div>
        <div class="screen-sub">Tenue générée</div>

        <div class="outfit-card">${random.weather}</div>
        <div class="outfit-card highlight">${random.style}</div>

        ${random.items.map(i => `
          <div class="outfit-card">${i}</div>
        `).join("")}
      `;

    });
  }

});
