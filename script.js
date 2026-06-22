// ==========================
// MKAI FINAL SAFE SCRIPT
// (ANTI-BREAK VERSION)
// ==========================

document.addEventListener("DOMContentLoaded", () => {

  // ======================
  // SMOOTH SCROLL SAFE
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });


  // ======================
  // OUTIFT GENERATOR SAFE
  // ======================
  window.generateOutfit = function () {

    const titleEl = document.getElementById("outfit-title");
    const listEl = document.getElementById("outfit-list");

    if (!titleEl || !listEl) return;

    const outfits = [
      {
        title: "Old Money Casual",
        items: ["👕 Chemise beige", "👖 Pantalon blanc", "👟 Sneakers clean", "⌚ Montre"]
      },
      {
        title: "Street Minimal",
        items: ["🧥 Hoodie noir", "👖 Cargo gris", "👟 Air Force 1", "🧢 Casquette"]
      },
      {
        title: "Summer Clean Fit",
        items: ["👕 T-shirt blanc", "🩳 Short beige", "👟 Sneakers blanches", "🕶️ Lunettes"]
      }
    ];

    const random = outfits[Math.floor(Math.random() * outfits.length)];

    titleEl.innerText = random.title;
    listEl.innerHTML = "";

    random.items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      listEl.appendChild(li);
    });
  };


  // ======================
  // ADD CLOTHING SAFE
  // ======================
  window.addClothing = function () {

    const input = document.getElementById("fileInput");
    const list = document.getElementById("clothing-list");

    if (!input || !list) return;

    if (!input.files || input.files.length === 0) {
      alert("Ajoute un vêtement");
      return;
    }

    const name = input.files[0].name;

    const div = document.createElement("div");
    div.textContent = "👕 " + name;

    list.appendChild(div);

    input.value = "";
  };


  // ======================
  // NAVBAR SAFE EFFECT
  // ======================
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }


  // ======================
  // PHONE FLOAT SAFE (NO BREAK)
  // ======================
  const phone = document.querySelector(".phone-image");

  if (phone) {
    phone.style.transition = "transform 0.2s ease";

    document.addEventListener("mousemove", (e) => {

      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;

      phone.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

});
