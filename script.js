document.addEventListener("DOMContentLoaded", () => {

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  const outfits = [

    {
      weather: "☀️ 26°C • Paris",
      style: "Old Money Casual",
      clothes: [
        "👕 Chemise beige oversize",
        "👖 Pantalon crème",
        "👟 New Balance 530",
        "⌚ Montre minimaliste"
      ]
    },

    {
      weather: "🌤️ 20°C • Paris",
      style: "Quiet Luxury",
      clothes: [
        "👕 Polo beige",
        "👖 Pantalon blanc cassé",
        "👟 Sneakers cuir blanches",
        "🕶️ Lunettes minimalistes"
      ]
    },

    {
      weather: "🌧️ 14°C • Paris",
      style: "Smart Casual",
      clothes: [
        "🧥 Veste légère",
        "👕 T-shirt premium",
        "👖 Chino beige",
        "👟 Sneakers noires"
      ]
    },

    {
      weather: "☀️ 29°C • Sète",
      style: "Summer Clean",
      clothes: [
        "👕 Chemise lin",
        "🩳 Short beige",
        "👟 Veja blanche",
        "🕶️ Lunettes soleil"
      ]
    }

  ];

  const button =
    document.querySelector(".btn-primary");

  if (!button) return;

  button.addEventListener("click", () => {

    const random =
      outfits[Math.floor(
        Math.random() * outfits.length
      )];

    const weather =
      document.querySelector(".weather");

    const title =
      document.querySelector(".outfit-card h3");

    const list =
      document.querySelector(".outfit-card ul");

    if (!weather || !title || !list) return;

    weather.textContent =
      random.weather;

    title.textContent =
      random.style;

    list.innerHTML = "";

    random.clothes.forEach(item => {

      const li =
        document.createElement("li");

      li.textContent = item;

      list.appendChild(li);

    });

  });

});
