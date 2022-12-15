import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* SE CREA EL RENDER  */
const renderer = new THREE.WebGLRenderer();
/* SE SETEA EL VALOR DEL RENDER  */
renderer.setSize( window.innerWidth, window.innerHeight );

/* SE AGREGA EL RENDER AL DOCUMENTO  */
document.body.appendChild( renderer.domElement );

/* SE CREA LA ESCENA*/
const scene = new THREE.Scene();

/* PERSPECTIVA DE LA CAMARA*/
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

/* SE CREA EL ORBIT PARA MOVER LA VISTA DE LA CAMARA*/
const orbit = new OrbitControls( camera, renderer.domElement);

/* GUIAS DE LOS EJES*/
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

camera.position.set( 0, 2, 10 );
/* SE ACTUALIZA LA POSICION DE LA CAMARA*/
orbit.update();

/* SETUP DEL CUBO */
const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( boxGeometry, boxMaterial );
scene.add( cube );

/* ANIMACION DEL CUBO */
const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    /* RENDER DE LA ESCENA Y CAMARA */
    renderer.render( scene, camera );
};

renderer.setAnimationLoop( animate );

