import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function sceneModule() { 
// Scene
const scene = new THREE.Scene() ;

// Renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( w, h );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.set(0, 0, 3);
// 75, window.innerWidth / window.innerHeight, 0.1, 1000

// Controls
const controls = new OrbitControls(camera, renderer.domElement); // ORBIT CONTROLS
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.rotateSpeed = 0.5;


    // CENTER ORB - Particles
// Geometry & Material
const particlesGeometry = new THREE.SphereGeometry(1.1, 80, 50); // Radius, width, height
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005, // Size of particles
    sizeAttenuation: true, // Camera distance: camera = small particles and Close = big
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

    // Orb Ring: circle around {Center orb}
// Geometry & Material
const orbRingGeometry = new THREE.SphereGeometry(1);
const orbCircleMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF
})

const orbRing = new THREE.Mesh(orbRingGeometry, orbCircleMaterial);
scene.add(orbRing);


    // Outer orb frame
const orbFrame = new THREE.IcosahedronGeometry();
const shaderMaterial = new THREE.ShaderMaterial();

    // Inner orb frame



// Group
const group = new THREE.Group();
group.add(particles);
group.add(orbRing);

scene.add(group);

return { scene, camera, renderer, controls, group}
}

/*
// GEOMETRY & MESH
const geo = new THREE.IcosahedronGeometry( 1.0, 20 );
const mat = new THREE.MeshStandardMaterial(
    { 
    color: 0x0000FF,
    flatShading: true,
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

// LIGHTS
const hemiLight = new THREE.SpotLight(0x0099ff, 0x000001);
const intensity = 150;
hemiLight.add(intensity);

// GROUP
const group = new THREE.Group();
group.add(mesh);
group.add(wireMesh);
scene.add(group);
scene.add(hemiLight);

return { scene, camera, renderer, controls, group}
*/
