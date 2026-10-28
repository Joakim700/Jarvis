import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/*
const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}
*/

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( w, h );
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
camera.position.z = 2;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement); // ORBIT CONTROLS
controls.enableDamping = true;
controls.dampingFactor = 0.03;


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

const group = new THREE.Group();
group.add(mesh);
group.add(wireMesh);
scene.add(group);
scene.add(hemiLight);


function animate(t = 0) {
    console.log(t);
    requestAnimationFrame(animate);
    group.rotation.y = t * 0.0001;
    renderer.render( scene, camera );
    controls.update(); // ORBIT CONTROLS updating
}
animate();
