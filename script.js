document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 1. SMOOTH SCROLL (SAFE)
  // =========================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });


  // =========================
  // 2. OUTIFT GENERATOR
  // =========================
  window.generateOutfit = function () {

    const title = document.getElementById("outfit-title");
    const list = document.getElementById("outfit-list");

    if (!title || !list) return;

    const outfits = [
      {
        name: "Old Money Casual",
        items: ["👕 Chemise beige oversize", "👖 Pantalon blanc cassé", "👟 New Balance 530", "⌚ Montre minimaliste"]
      },
      {
        name: "Street Minimal",
        items: ["🧥 Hoodie noir oversize", "👖 Cargo gris", "👟 Air Force 1", "🧢 Casquette"]
      },
      {
        name: "Summer Clean Fit",
        items: ["👕 T-shirt blanc premium", "🩳 Short beige", "👟 Sneakers blanches", "🕶️ Lunettes"]
      }
    ];

    const random = outfits[Math.floor(Math.random() * outfits.length)];

    title.textContent = random.name;
    list.innerHTML = "";

    random.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  };


  // =========================
  // 3. ADD CLOTHING (UPLOAD SIMULATION)
  // =========================
  window.addClothing = function () {

    const input = document.getElementById("fileInput");
    const list = document.getElementById("clothing-list");

    if (!input || !list) return;

    if (!input.files.length) {
      alert("Ajoute un vêtement");
      return;
    }

    const file = input.files[0].name;

    const item = document.createElement("div");
    item.textContent = "👕 " + file;

    list.appendChild(item);

    input.value = "";
  };


  // =========================
  // 4. HEADER SCROLL EFFECT (SAFE)
  // =========================
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
        header.style.background = "rgba(255,255,255,0.9)";
        header.style.backdropFilter = "blur(10px)";
      } else {
        header.style.boxShadow = "none";
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
      }
    });
  }


  // =========================
  // 5. PHONE FLOAT (SAFE VERSION)
  // =========================
  const phone = document.querySelector(".phone-image");

  if (phone) {
    document.addEventListener("mousemove", (e) => {

      const x = (window.innerWidth / 2 - e.clientX) / 80;
      const y = (window.innerHeight / 2 - e.clientY) / 80;

      phone.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

});
