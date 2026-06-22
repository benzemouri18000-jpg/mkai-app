// =========================
// MKAI SAFE SCRIPT (NO DESIGN CHANGE)
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // scroll smooth safe
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });


  // outfit generator (safe)
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

    const r = outfits[Math.floor(Math.random() * outfits.length)];

    title.textContent = r.name;
    list.innerHTML = "";

    r.items.forEach(i => {
      const li = document.createElement("li");
      li.textContent = i;
      list.appendChild(li);
    });
  };


  // add clothing safe
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

});
