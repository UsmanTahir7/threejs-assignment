import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// new scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;

// sphere object
const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 5, 10);
scene.add(light);

//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = document.getElementById("hexColor").value;
  sphere.material = new THREE.MeshStandardMaterial({ color: val });
});
