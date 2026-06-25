// MKAI — script.js

// ── Smooth scroll ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
a.addEventListener("click", e => {
e.preventDefault();
const target = document.querySelector(a.getAttribute("href"));
if (target) target.scrollIntoView({ behavior: "smooth" });
});
});

// ── Scroll reveal cards ────────────────────────────────────────
const revealEls = document.querySelectorAll(
".step-card, .ai-feature, .screen-card, .testi-card, .pricing-card"
);

const observer = new IntersectionObserver(
entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
observer.unobserve(entry.target);
}
});
},
{ threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

// ── Split Text Hero Animation ──────────────────────────────────
const splitText = document.querySelector(".split-text");

if (splitText) {
const splitObserver = new IntersectionObserver(
entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
splitText.classList.add("animate");
splitObserver.unobserve(splitText);
}
});
},
{
threshold: 0.2
}
);

splitObserver.observe(splitText);
}

// ── Header scroll shadow ───────────────────────────────────────
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
if (window.scrollY > 20) {
header.style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)";
} else {
header.style.boxShadow = "none";
}
});

// ── Mobile nav toggle ──────────────────────────────────────────
const mobileToggle = document.querySelector(".nav-mobile-toggle");
const nav = document.querySelector(".nav");

if (mobileToggle && nav) {
mobileToggle.addEventListener("click", () => {
const isOpen = nav.classList.toggle("nav-open");
mobileToggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach(link => {
link.addEventListener("click", () => {
nav.classList.remove("nav-open");
});
});
}

// ── Phone mockup: live time ────────────────────────────────────
function updatePhoneTime() {
const el = document.querySelector(".phone-status span:first-child");

if (!el) return;

const now = new Date();

el.textContent =
now.getHours() +
":" +
String(now.getMinutes()).padStart(2, "0");
}

updatePhoneTime();
setInterval(updatePhoneTime, 30000);
