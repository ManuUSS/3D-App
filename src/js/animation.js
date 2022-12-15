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
const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );
const cube = new THREE.Mesh( boxGeometry, boxMaterial );
scene.add( cube );

/* SET UP DEL PLANO*/
const planeGeomtry = new THREE.PlaneGeometry( 20, 20 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeomtry, planeMaterial );
/* SE ROTA PARA QUE QUEDA HORIZONTAL */
plane.rotation.x = Math.PI / 2;
/* SE RECIBE LA SOMBRA AL PLANO */
plane.receiveShadow = true;
/* SE AGREGA EL PLANO A LA ESCENA */
scene.add( plane );

/* SET UP DEL GRID */
const gridHelper = new THREE.GridHelper( 20, 20 );
/* SE AGREGA EL GRID A LA ESCENA */
scene.add( gridHelper );

/* SET UP DE LA ESFERA */
const sphereGeometry = new THREE.SphereGeometry( 2, 15, 15 );
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x0000FF, wireframe: false } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );
sphere.position.set( -5, 5, 0 );
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight( 0x333333 );
scene.add( ambientLight );

const directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
scene.add( directionalLight );
directionalLight.position.set( -20, 10, 0 );
directionalLight.castShadow = true;

const lightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( lightHelper );

/* CONTROLADOR DEL GUI */
const gui = new DAT.GUI();

/* OPCIONES A MOSTRAR */
const options = {
    sphereColor: 0x4ed3560,
    wireframe: false,
    speed: 0.01
}

/* SE AGREGAN AL GUI DE OPCIONES  */
gui.addColor( options, 'sphereColor' ).onChange( () => {
    sphereMaterial.color.set( options.sphereColor );
});

/* SE AGREGAN AL GUI DE OPCIONES  */
gui.add(options, 'wireframe').onChange( () => {
    sphereMaterial.wireframe = options.wireframe;
});

/* SE AGREGAN AL GUI DE OPCIONES  */
gui.add(options, 'speed', 0, 0.2).onChange( () => {
    speed = options.speed;
});

let step = 0;
let speed = 0.01;

const bounce = () => {
    step += options.speed;
    sphere.position.y = 5 + ( Math.abs( Math.sin( step ) ) * 5 );
}

/* ANIMACION DEL CUBO */
const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    bounce();

    /* RENDER DE LA ESCENA Y CAMARA */
    renderer.render( scene, camera );
};

renderer.setAnimationLoop( animate );

