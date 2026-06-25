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
    { threshold: 0.2 }
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
    now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
}

updatePhoneTime();
setInterval(updatePhoneTime, 30000);

// ── Grainient WebGL background ─────────────────────────────────
(function () {
  const canvas = document.getElementById("grainient-canvas");
  if (!canvas) return;

  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return;

  const isWebGL2 = !!canvas.getContext("webgl2");

  const vert = isWebGL2
    ? `#version 300 es
       in vec2 position;
       void main() { gl_Position = vec4(position, 0.0, 1.0); }`
    : `attribute vec2 position;
       void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

  const fragHead = isWebGL2
    ? `#version 300 es\nprecision highp float;\nuniform vec2 iResolution;\nuniform float iTime;\nout vec4 fragColor;\n`
    : `precision highp float;\nuniform vec2 iResolution;\nuniform float iTime;\n`;

  const fragBody = `
    #define S(a,b,t) smoothstep(a,b,t)

    mat2 Rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
    }

    vec2 hash(vec2 p) {
      p = vec2(dot(p, vec2(2127.1, 81.17)), dot(p, vec2(1269.5, 283.37)));
      return fract(sin(p) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
      return 0.5 + 0.5 * mix(
        mix(dot(-1.0 + 2.0 * hash(i),              f),
            dot(-1.0 + 2.0 * hash(i + vec2(1,0)),  f - vec2(1,0)), u.x),
        mix(dot(-1.0 + 2.0 * hash(i + vec2(0,1)),  f - vec2(0,1)),
            dot(-1.0 + 2.0 * hash(i + vec2(1,1)),  f - vec2(1,1)), u.x),
        u.y
      );
    }

    void main() {
      float t   = iTime * 0.18;
      vec2  uv  = gl_FragCoord.xy / iResolution.xy;
      float ratio = iResolution.x / iResolution.y;

      vec2 tuv = uv - 0.5;
      tuv /= 0.9;

      float degree = noise(vec2(t * 0.1, tuv.x * tuv.y) * 2.0);
      tuv.y /= ratio;
      tuv *= Rot(radians((degree - 0.5) * 500.0 + 180.0));
      tuv.y *= ratio;

      tuv.x += sin(tuv.y * 5.0  + t * 2.0) / 55.0;
      tuv.y += sin(tuv.x * 7.5  + t * 2.0) / 27.0;

      // Palette MKAI : crème, terracotta, beige chaud
      vec3 c1 = vec3(0.969, 0.914, 0.882); // #F7E9E1 beige rosé
      vec3 c2 = vec3(0.769, 0.541, 0.455); // #C48A74 terracotta
      vec3 c3 = vec3(0.945, 0.937, 0.925); // #F1EFE8 crème

      vec3 layer1 = mix(c3, c2, S(-0.3, 0.2, tuv.x));
      vec3 layer2 = mix(c2, c1, S(-0.3, 0.2, tuv.x));
      vec3 col    = mix(layer1, layer2, S(0.5, -0.3, tuv.y));

      // Grain subtil
      float grain = fract(sin(dot(uv * 2.0, vec2(12.9898, 78.233))) * 43758.5453);
      col += (grain - 0.5) * 0.035;

      // Contraste léger
      col = (col - 0.5) * 1.25 + 0.5;
      col = clamp(col, 0.0, 1.0);
  `;

  const frag = isWebGL2
    ? fragHead + fragBody + `  fragColor = vec4(col, 1.0);\n}`
    : fragHead + fragBody + `  gl_FragColor = vec4(col, 1.0);\n}`;

  function compileShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn("Shader error:", gl.getShaderInfoLog(s));
    }
    return s;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  // Triangle plein écran (méthode OGL)
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );
  const posLoc = gl.getAttribLocation(prog, "position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uRes  = gl.getUniformLocation(prog, "iResolution");
  const uTime = gl.getUniformLocation(prog, "iTime");

  function resize() {
    const w = Math.floor(canvas.offsetWidth);
    const h = Math.floor(canvas.offsetHeight);
    canvas.width  = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const t0 = performance.now();
  let raf = 0;

  function loop(now) {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (now - t0) * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    raf = requestAnimationFrame(loop);
  }

  // Pause quand hors écran
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!raf) raf = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  io.observe(canvas);

  // Pause quand onglet caché
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!raf) {
      raf = requestAnimationFrame(loop);
    }
  });
})();
