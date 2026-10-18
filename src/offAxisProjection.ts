import * as THREE from "three/webgpu";

export function applyOffAxisProjection(
  camera: THREE.PerspectiveCamera,
  eye: { x: number; y: number; z: number },
  screenWidth: number,
  screenHeight: number,
) {
  const scale = camera.near / eye.z;
  camera.position.set(eye.x, eye.y, eye.z);
  camera.projectionMatrix.makePerspective(
    (-screenWidth / 2 - eye.x) * scale,
    (screenWidth / 2 - eye.x) * scale,
    (screenHeight / 2 - eye.y) * scale,
    (-screenHeight / 2 - eye.y) * scale,
    camera.near,
    camera.far,
  );
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
}
