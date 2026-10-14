import './style.css';
import * as THREE from "three/webgpu";
import { renderer } from "./renderer";
import { scene } from "./scene";

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 0.6;

renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
});

