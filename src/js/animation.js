import * as THREE from 'three';
import * as DAT from 'dat.gui';
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

/* SET UP DEL PLANO*/
const planeGeomtry = new THREE.PlaneGeometry( 20, 20 );
const planeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeomtry, planeMaterial );
/* SE ROTA PARA QUE QUEDA HORIZONTAL */
plane.rotation.x = Math.PI / 2;
/* SE AGREGA EL PLANO A LA ESCENA */
scene.add( plane );

/* SET UP DEL GRID */
const gridHelper = new THREE.GridHelper( 25, 25 );
/* SE AGREGA EL GRID A LA ESCENA */
scene.add( gridHelper );

/* SET UP DE LA ESFERA */
const sphereGeometry = new THREE.SphereGeometry( 4, 30, 30 );
const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x4ed3560, wireframe: true } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set( 0, 5, 0 );

const gui = new DAT.GUI();
const options = {
    sphereColor: 0x4ed3560,
    wireframe: true
}

gui.addColor( options, 'sphereColor' ).onChange( () => {
    sphereMaterial.color.set( options.sphereColor );
});

gui.add(options, 'wireframe').onChange( () => {
    sphereMaterial.wireframe = options.wireframe;
});

scene.add( sphere );

/* ANIMACION DEL CUBO */
const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    /* RENDER DE LA ESCENA Y CAMARA */
    renderer.render( scene, camera );
};

renderer.setAnimationLoop( animate );

