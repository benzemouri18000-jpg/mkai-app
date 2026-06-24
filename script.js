// ==========================
// LIQUID / 3D HERO MKAI
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

const geometry = new THREE.IcosahedronGeometry(2, 20);

const material = new THREE.MeshPhysicalMaterial({
color: 0xa855f7,
roughness: 0.15,
metalness: 0.8,
transmission: 0.15,
thickness: 1
});

const blob = new THREE.Mesh(
geometry,
material
);

scene.add(blob);

const light1 = new THREE.PointLight(
0xffffff,
4
);

light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(
0xff9ffc,
3
);

light2.position.set(-5, -5, 5);
scene.add(light2);

const mouse = {
x: 0,
y: 0
};

window.addEventListener("mousemove", e => {

mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

});

function animate() {

requestAnimationFrame(animate);

blob.rotation.x += 0.002;
blob.rotation.y += 0.004;

blob.position.x += (mouse.x * 0.5 - blob.position.x) * 0.02;
blob.position.y += (mouse.y * 0.3 - blob.position.y) * 0.02;

renderer.render(scene, camera);

}

animate();

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
