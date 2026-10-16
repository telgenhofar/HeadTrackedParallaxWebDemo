import "./style.css";
import * as THREE from "three/webgpu";
import { renderer } from "./renderer";
import { scene, resizeScene } from "./scene";
import { onCalibrationChange } from "./calibrationInput";
import "./calibrationModal";
import "./toolbar";

const VIEWING_DISTANCE = 0.6;

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 10);

let scale = 0;

function applyWindowSize() {
  const width = window.innerWidth * scale;
  const height = window.innerHeight * scale;
  resizeScene(width, height);
  camera.position.z = VIEWING_DISTANCE;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(height / 2 / VIEWING_DISTANCE));
  camera.updateProjectionMatrix();
}

onCalibrationChange((metersPerPixel) => {
  scale = metersPerPixel;
  applyWindowSize();
});
window.addEventListener("resize", applyWindowSize);

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});