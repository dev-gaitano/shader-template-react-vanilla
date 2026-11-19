import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertex.glsl";

let container;
let camera, controls, scene, renderer, timer;
let uniforms;

init();
animate();

function init() {
  container = document.getElementById("app");

  // Render
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Scene
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 12);

  controls = new OrbitControls(camera, renderer.domElement);

  scene = new THREE.Scene();
  timer = new THREE.Timer();

  // Add objects
  addObjects();

  // Handle window resize
  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  document.onmousemove = function(e) {
    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
  };
}

function addObjects() {
  const geometry = new THREE.PlaneGeometry(10, 10, 60, 60);

  uniforms = {
    u_time: { type: "f", value: 0.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertex,
    fragmentShader: fragment,
    //wireframe: true,
    //transparent: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function onWindowResize(event) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  timer.update();
  uniforms.u_time.value += timer.getElapsed();
  renderer.render(scene, camera);
}
