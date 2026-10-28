import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function sceneModule() { 
// SCENE
const scene = new THREE.Scene() ;

const w = window.innerWidth;
const h = window.innerHeight;
// RENDERER
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( w, h );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// CAMERA
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.z = 2;
// 75, window.innerWidth / window.innerHeight, 0.1, 1000

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement); // ORBIT CONTROLS
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// GEOMETRY & MESH
const geo = new THREE.IcosahedronGeometry( 1.0, 2 );
const mat = new THREE.MeshStandardMaterial(
    { 
    color: 0xccff00,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);

const wireMat = new THREE.MeshBasicMaterial(
    {
        color: 0x0000ff,
        wireframe: true
    }
);

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0x000001);

// GROUP
const group = new THREE.Group();
group.add(mesh);
group.add(wireMesh);
scene.add(group);
scene.add(hemiLight);

return { scene, camera, renderer, controls, group}
}
