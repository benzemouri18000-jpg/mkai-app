// ==========================
// MKAI HERO AMBIANCE PREMIUM
// ==========================

const canvas = document.getElementById("liquid-bg");

if (canvas && typeof THREE !== "undefined") {

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({
canvas,
alpha: true,
antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 4;

// Géométrie

const geometry = new THREE.IcosahedronGeometry(2, 20);

// Couleurs MKAI

const material = new THREE.MeshPhysicalMaterial({
color: 0xc48a74,
roughness: 0.35,
metalness: 0.4,
transmission: 0.08,
thickness: 1
});

const blob = new THREE.Mesh(
geometry,
material
);

scene.add(blob);

// Lumières

const light1 = new THREE.PointLight(
0xffffff,
4
);

light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(
0xd8a48f,
2
);

light2.position.set(-5, -5, 5);
scene.add(light2);

const light3 = new THREE.PointLight(
0xc48a74,
2
);

light3.position.set(0, 5, 3);
scene.add(light3);

// Souris

const mouse = {
x: 0,
y: 0
};

window.addEventListener("mousemove", e => {

mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

});

// Animation

function animate() {

requestAnimationFrame(animate);

blob.rotation.x += 0.0015;
blob.rotation.y += 0.003;

blob.position.x += (
mouse.x * 0.4 - blob.position.x
) * 0.02;

blob.position.y += (
mouse.y * 0.25 - blob.position.y
) * 0.02;

blob.scale.x =
1 + Math.sin(Date.now() * 0.001) * 0.03;

blob.scale.y =
1 + Math.sin(Date.now() * 0.001) * 0.03;

blob.scale.z =
1 + Math.sin(Date.now() * 0.001) * 0.03;

renderer.render(scene, camera);

}

animate();

// Resize

window.addEventListener("resize", () => {

camera.aspect =
window.innerWidth / window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});

}
