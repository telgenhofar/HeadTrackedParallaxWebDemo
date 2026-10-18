import * as THREE from "three/webgpu";
import { tuning } from "./tuning";

export const scene = new THREE.Scene();

const DESIGN_WIDTH = 0.34;
const DESIGN_HEIGHT = 0.21;
const GRID_X = 8;
const GRID_Y = 5;
const RINGS = 10;

function roomGrid() {
  const points: THREE.Vector3[] = [];
  const segment = (ax: number, ay: number, az: number, bx: number, by: number, bz: number) =>
    points.push(new THREE.Vector3(ax, ay, az), new THREE.Vector3(bx, by, bz));
  const fraction = (i: number, count: number) => -0.5 + i / count;

  for (let i = 0; i <= RINGS; i++) {
    const z = 0.5 - i / RINGS;
    segment(-0.5, -0.5, z, 0.5, -0.5, z);
    segment(0.5, -0.5, z, 0.5, 0.5, z);
    segment(0.5, 0.5, z, -0.5, 0.5, z);
    segment(-0.5, 0.5, z, -0.5, -0.5, z);
  }
  for (let i = 0; i <= GRID_X; i++) {
    const x = fraction(i, GRID_X);
    segment(x, -0.5, 0.5, x, -0.5, -0.5);
    segment(x, 0.5, 0.5, x, 0.5, -0.5);
    segment(x, -0.5, -0.5, x, 0.5, -0.5);
  }
  for (let i = 0; i <= GRID_Y; i++) {
    const y = fraction(i, GRID_Y);
    segment(-0.5, y, 0.5, -0.5, y, -0.5);
    segment(0.5, y, 0.5, 0.5, y, -0.5);
    segment(-0.5, y, -0.5, 0.5, y, -0.5);
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}

const room = new THREE.LineSegments(roomGrid(), new THREE.LineBasicMaterial({ color: 0x777777 }));
scene.add(room);

const world = new THREE.Group();
scene.add(world);

const stalkMaterial = new THREE.LineBasicMaterial({ color: 0x555555 });
const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18 });

const props = [
  { geometry: new THREE.BoxGeometry(0.05, 0.05, 0.05), color: 0x4488ff, position: [0.05, 0, -0.08] },
  { geometry: new THREE.SphereGeometry(0.025, 32, 16), color: 0xff5544, position: [-0.07, 0.02, 0.05] },
  { geometry: new THREE.BoxGeometry(0.04, 0.08, 0.04), color: 0x44bb66, position: [0.09, -0.02, -0.2] },
  { geometry: new THREE.ConeGeometry(0.025, 0.06, 24), color: 0xffaa33, position: [-0.06, 0.03, -0.14] },
  { geometry: new THREE.BoxGeometry(0.03, 0.03, 0.03), color: 0xaa66ff, position: [0.03, 0.04, 0.03] },
].map(({ geometry, color, position }) => {
  const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color }));
  mesh.position.set(position[0], position[1], position[2]);
  const stalk = new THREE.Line(new THREE.BufferGeometry(), stalkMaterial);
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.03, 32), shadowMaterial);
  shadow.rotation.x = -Math.PI / 2;
  world.add(mesh, stalk, shadow);
  return { mesh, stalk, shadow };
});

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(1, 1, 1);
scene.add(sun);

export function resizeScene(width: number, height: number) {
  const factor = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
  const depth = tuning.roomDepth * factor;
  room.scale.set(width, height, depth);
  room.position.z = -depth / 2;
  world.scale.setScalar(factor);

  const floorY = -height / 2 / factor;
  for (const { mesh, stalk, shadow } of props) {
    const { x, y, z } = mesh.position;
    stalk.geometry.setFromPoints([new THREE.Vector3(x, y, z), new THREE.Vector3(x, floorY, z)]);
    shadow.position.set(x, floorY + 0.0005, z);
  }
}
