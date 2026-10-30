import '../css/styles.css';

import * as sceneModule from '../orb/scene.js';

const { scene, camera, renderer, controls, group} = sceneModule.sceneModule();

function animate(t = 0) {
    requestAnimationFrame(animate);
    
    console.log(t);
    group.rotation.x = t * 0.0001; 

    controls.update(); // ORBIT CONTROLS updating
    renderer.render( scene, camera );
}
animate();

