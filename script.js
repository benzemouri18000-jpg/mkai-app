document.addEventListener("DOMContentLoaded", () => {

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
      weather:"☀️ 26°C • Paris",
      score:"94",
      style:"Old Money Casual",
      clothes:[
        "👕 Chemise beige oversize",
        "👖 Pantalon crème",
        "👟 New Balance 530",
        "⌚ Montre minimaliste"
      ]
    },

    {
      weather:"🌤️ 20°C • Paris",
      score:"91",
      style:"Quiet Luxury",
      clothes:[
        "👕 Polo beige",
        "👖 Chino sable",
        "👟 Sneakers cuir",
        "🕶️ Lunettes premium"
      ]
    },

    {
      weather:"🌧️ 14°C • Paris",
      score:"88",
      style:"Smart Casual",
      clothes:[
        "🧥 Veste légère",
        "👕 T-shirt premium",
        "👖 Jean droit",
        "👟 Sneakers noires"
      ]
    }

  ];

  const discoverBtn =
    document.querySelector(".hero .btn-primary");

  if (!discoverBtn) return;

  discoverBtn.addEventListener("click", () => {

    const outfit =
      outfits[Math.floor(Math.random() * outfits.length)];

    const weather =
      document.querySelector(".phone-content .weather");

    const title =
      document.querySelector(".phone-content h3");

    const list =
      document.querySelector(".phone-content ul");

    if (!weather || !title || !list) return;

    weather.textContent = "🤖 Analyse du dressing...";

    setTimeout(() => {

      weather.textContent =
        outfit.weather;

      title.textContent =
        outfit.style;

      list.innerHTML = "";

      outfit.clothes.forEach(item => {

        const li =
          document.createElement("li");

        li.textContent = item;

        list.appendChild(li);

      });

    }, 1200);

  });

});
