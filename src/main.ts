import "./style.css";
import "./settingsStorage";
import * as THREE from "three/webgpu";
import { renderer } from "./renderer";
import { scene, resizeScene } from "./scene";
import { onCalibrationChange, getWebcamFov, getViewingDistance, onHeightCalibrate } from "./calibrationInput";
import { onFirstModalClose, openCalibrationModal } from "./calibrationModal";
import "./toolbar";
import { startWebcam } from "./webcam";
import { createFaceTracker } from "./faceTracker";
import { headPosition } from "./headPosition";
import { tuning } from "./tuning";
import { OneEuroFilter } from "./oneEuroFilter";
import { applyOffAxisProjection } from "./offAxisProjection";

const DEFAULT_EYE = { x: 0, y: 0, z: 0.6 };

const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 10);
const filters = [new OneEuroFilter(), new OneEuroFilter()];

let scale = 0;
let eye = { ...DEFAULT_EYE };
let headY = 0;
let heightOffset = 0;

onHeightCalibrate(() => (heightOffset = headY));
if (import.meta.env.DEV) {
  Object.assign(window, { filters, tuning });
}

onCalibrationChange((metersPerPixel) => {
  scale = metersPerPixel;
  resizeScene(window.innerWidth * scale, window.innerHeight * scale);
});
window.addEventListener("resize", () => resizeScene(window.innerWidth * scale, window.innerHeight * scale));

async function startTracking() {
  const video = await startWebcam();
  const detectIrises = await createFaceTracker(video);
  setInterval(() => {
    const irises = detectIrises();
    if (irises === null) {
      return;
    }
    const head = headPosition(irises.left, irises.right, video.videoWidth, video.videoHeight, getWebcamFov(), getViewingDistance());
    const time = performance.now() / 1000;
    headY = filters[1].filter(head.y, time);
    const { sensitivity } = tuning;
    eye = {
      x: filters[0].filter(head.x, time) * sensitivity,
      y: (headY - heightOffset) * sensitivity,
      z: head.z,
    };
  }, 1000 / 60);
}
const status = document.querySelector<HTMLElement>("#tracking-status")!;
onFirstModalClose(() => {
  status.textContent = "Starting camera...";
  startTracking().then(
    () => (status.textContent = ""),
    (error) => {
      console.error(error);
      openCalibrationModal();
      status.textContent = `Head tracking failed: ${error.message ?? error}`;
    },
  );
});

renderer.setAnimationLoop(() => {
  applyOffAxisProjection(camera, eye, window.innerWidth * scale, window.innerHeight * scale);
  renderer.render(scene, camera);
});
