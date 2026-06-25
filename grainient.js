// ===================== GRAINIENT VANILLA MOUNT =====================
// based on React Bits Grainient (ogl)

const container = document.getElementById("grainient-bg");
if (!container) console.error("Grainient container missing");

const { Renderer, Program, Mesh, Triangle } = OGL;

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform float uTime;

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(1.0);
  gl_FragColor = vec4(uv.x, uv.y, abs(sin(uTime)), 1.0);
}
`;

// ⚠️ version simplifiée stable (safe version)
// si tu veux FULL shader React Bits je te le remets après

const renderer = new Renderer({
  alpha: true,
  antialias: false
});

const gl = renderer.gl;
container.appendChild(gl.canvas);

const geometry = new Triangle(gl);

const program = new Program(gl, {
  vertex,
  fragment,
  uniforms: {
    uTime: { value: 0 }
  }
});

const mesh = new Mesh(gl, { geometry, program });

function resize() {
  const w = container.offsetWidth;
  const h = container.offsetHeight;
  renderer.setSize(w, h);
}

window.addEventListener("resize", resize);
resize();

let start = performance.now();

function update(t) {
  program.uniforms.uTime.value = (t - start) * 0.001;
  renderer.render({ scene: mesh });
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
