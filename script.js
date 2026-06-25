// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// Reveal animation
const els = document.querySelectorAll(".step-card, .ai-feature, .pricing-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.2 });

els.forEach(el => observer.observe(el));

// Mobile menu
const btn = document.querySelector(".nav-mobile-toggle");
const nav = document.querySelector(".nav");

btn?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// GRADIENT ANIMÉ (OG)
import { Renderer, Program, Mesh, Triangle } 
from "https://unpkg.com/ogl@1.0.11/dist/ogl.mjs";

const container = document.getElementById("grainient");

if (container) {

const vertex = `
#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

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
  float t = iTime * 0.2;

  vec3 col1 = vec3(0.95,0.92,0.90);
  vec3 col2 = vec3(0.77,0.54,0.45);
  vec3 col3 = vec3(0.18,0.18,0.18);

  float n = noise(uv*3.0 + t);

  vec3 col = mix(col1, col2, uv.y + sin(t)*0.1);
  col = mix(col, col3, n*0.25);

  fragColor = vec4(col,1.0);
}
`;

const renderer = new Renderer({ alpha:true });
const gl = renderer.gl;

container.appendChild(gl.canvas);

const geometry = new Triangle(gl);

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: [1,1] }
  }
});

const mesh = new Mesh(gl, { geometry, program });

function resize() {
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w,h);
  program.uniforms.iResolution.value = [w,h];
}

window.addEventListener("resize", resize);
resize();

let start = performance.now();

function loop(t){
  program.uniforms.iTime.value = (t-start)*0.001;
  renderer.render({ scene: mesh });
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

}
