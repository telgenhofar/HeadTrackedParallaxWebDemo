import * as THREE from "three/webgpu";

export const scene = new THREE.Scene();

const room = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(0.34, 0.21, 0.5)),
    new THREE.LineBasicMaterial({ color: 0x333333 })
);
room.position.z = -0.25;
scene.add(room);

const box = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.05, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x4488ff })
);
box.position.set(0.05, 0, -0.15);
scene.add(box);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(1, 1, 1);
scene.add(sun);