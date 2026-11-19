import * as THREE from "three";

import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertex.glsl";

let container;
let camera, scene, renderer, timer;
let uniforms;

init();
animate();

function init() {
  //Scene container
  container = document.getElementById("app");

  // Camera
  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();
  timer = new THREE.Timer();

  // Add objects
  addObjects();

  // Render
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

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
    wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  timer.update();
  uniforms.u_time.value += timer.getElapsed();
  renderer.render(scene, camera);
}
