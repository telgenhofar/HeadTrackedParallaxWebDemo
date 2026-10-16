import * as THREE from "three/webgpu";

export const scene = new THREE.Scene();

const DESIGN_WIDTH = 0.34;
const DESIGN_HEIGHT = 0.21;
const ROOM_DEPTH = 0.5;

const room = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
  new THREE.LineBasicMaterial({ color: 0x333333 })
);
scene.add(room);

const world = new THREE.Group();
scene.add(world);

const box = new THREE.Mesh(
  new THREE.BoxGeometry(0.05, 0.05, 0.05),
  new THREE.MeshStandardMaterial({ color: 0x4488ff })
);
box.position.set(0.05, 0, -0.15);
world.add(box);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(1, 1, 1);
scene.add(sun);

export function resizeScene(width: number, height: number) {
  const factor = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
  const depth = ROOM_DEPTH * factor;
  room.scale.set(width, height, depth);
  room.position.z = -depth / 2;
  world.scale.setScalar(factor);
}