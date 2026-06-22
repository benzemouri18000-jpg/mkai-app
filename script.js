// =========================
// MKAI CLEAN SCRIPT SAFE
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // SMOOTH SCROLL
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
  // OUTFIT GENERATOR
  // =========================
  window.generateOutfit = function () {

    const title = document.getElementById("outfit-title");
    const list = document.getElementById("outfit-list");

    if (!title || !list) return;

    const outfits = [
      {
        name: "Old Money Casual",
        items: ["👕 Chemise beige", "👖 Pantalon blanc", "👟 Sneakers", "⌚ Montre"]
      },
      {
        name: "Street Minimal",
        items: ["🧥 Hoodie noir", "👖 Cargo gris", "👟 Air Force 1", "🧢 Casquette"]
      },
      {
        name: "Summer Clean Fit",
        items: ["👕 T-shirt blanc", "🩳 Short beige", "👟 Sneakers blanches", "🕶️ Lunettes"]
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
  // ADD CLOTHING
  // =========================
  window.addClothing = function () {

    const input = document.getElementById("fileInput");
    const list = document.getElementById("clothing-list");

    if (!input || !list) return;

    if (!input.files.length) {
      alert("Ajoute un vêtement");
      return;
    }

    const name = input.files[0].name;

    const div = document.createElement("div");
    div.textContent = "👕 " + name;

    list.appendChild(div);

    input.value = "";
  };


  // =========================
  // PHONE FLOAT (SAFE)
  // =========================
  const phone = document.querySelector(".phone-image");

  if (phone) {
    document.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 60;
      const y = (window.innerHeight / 2 - e.clientY) / 60;

      phone.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

});
