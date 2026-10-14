import * as THREE from "three/webgpu";

export const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xdddddd, 1);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
})