import { Renderer, Program, Mesh, Triangle } from "https://unpkg.com/ogl@1.0.11/dist/ogl.mjs";

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

  // --- MKAI palette ---
  vec3 color1 = vec3(0.77, 0.54, 0.45); // accent terracotta
  vec3 color2 = vec3(0.18, 0.18, 0.18); // dark
  vec3 color3 = vec3(0.95, 0.92, 0.90); // beige

  float n = noise(uv * 3.0 + t);

  vec3 col = mix(color3, color1, uv.y + sin(t + uv.x * 3.0) * 0.1);
  col = mix(col, color2, n * 0.25);

  fragColor = vec4(col, 1.0);
}
`;

const container = document.getElementById("grainient");

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
