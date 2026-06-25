// MKAI — script.js (version clean + Grainient intégré)

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
    { threshold: 0.2 }
  );

  splitObserver.observe(splitText);
}

// ── Header shadow on scroll ────────────────────────────────────
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

// ── Phone mockup live time ─────────────────────────────────────
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


// ── 🌊 GRADIANT ANIMÉ (Grainient WebGL simplifié MKAI) ─────────
import { Renderer, Program, Mesh, Triangle } from "https://unpkg.com/ogl@1.0.11/dist/ogl.mjs";

const container = document.querySelector(".hero-bg");

if (container) {
  const vertex = `
  #version 300 es
  in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`;

  const fragment = `
  #version 300 es
  precision highp float;

  uniform vec2 iResolution;
  uniform float iTime;

  out vec4 fragColor;

  float noise(vec2 p){
    return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    float t = iTime * 0.25;

    vec3 beige = vec3(0.95, 0.92, 0.90);
    vec3 terracotta = vec3(0.77, 0.54, 0.45);
    vec3 dark = vec3(0.18, 0.18, 0.18);

    float n = noise(uv * 3.0 + t);

    float wave = sin(uv.x * 3.0 + t) * 0.1 + cos(uv.y * 2.0 - t) * 0.1;

    vec3 col = mix(beige, terracotta, uv.y + wave);
    col = mix(col, dark, n * 0.25);

    fragColor = vec4(col, 1.0);
  }`;

  const renderer = new Renderer({ alpha: true, antialias: false });
  const gl = renderer.gl;

  container.appendChild(gl.canvas);

  gl.canvas.style.width = "100%";
  gl.canvas.style.height = "100%";

  const geometry = new Triangle(gl);

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] }
    }
  });

  const mesh = new Mesh(gl, { geometry, program });

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    program.uniforms.iResolution.value = [w, h];
  }

  window.addEventListener("resize", resize);
  resize();

  let start = performance.now();

  function loop(t) {
    program.uniforms.iTime.value = (t - start) * 0.001;
    renderer.render({ scene: mesh });
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
