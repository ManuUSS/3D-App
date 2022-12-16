import * as THREE from 'three';
import * as DAT from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* SE CREA EL RENDER  */
const renderer = new THREE.WebGLRenderer();
/* SE SETEA EL VALOR DEL RENDER  */
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.setClearColor( 0x54d5f4, 1 );

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
const planeGeomtry = new THREE.PlaneGeometry( 30, 30 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( planeGeomtry, planeMaterial );
/* SE ROTA PARA QUE QUEDA HORIZONTAL */
plane.rotation.x = Math.PI / 2;
/* SE RECIBE LA SOMBRA AL PLANO */
plane.receiveShadow = true;
/* SE AGREGA EL PLANO A LA ESCENA */
scene.add( plane );

/* SET UP DEL GRID */
const gridHelper = new THREE.GridHelper( 30, 30 );
/* SE AGREGA EL GRID A LA ESCENA */
scene.add( gridHelper );

/* SET UP DE LA ESFERA */
const sphereGeometry = new THREE.SphereGeometry( 4, 15, 15 );
const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0x0000FF, wireframe: false } );
const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set( -10, 10, 0 );
sphere.castShadow = true;
scene.add( sphere );

/* LUZ DE AMBIENTE */
const ambientLight = new THREE.AmbientLight( 0x333333 );
scene.add( ambientLight );

/* LUZ DIRECCIONAL */
const directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
directionalLight.position.set( 10, 1, 0 );
directionalLight.castShadow = true;
scene.add( directionalLight );
/* PROPIEDADES DE LUZ DIRECCIONAL */
directionalLight.shadow.camera.bottom = -12; 

/* GUIA DE LUZ */
const lightHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( lightHelper );

/* GUIA DE SOMBRA */
const lightShadowHelper = new THREE.CameraHelper( directionalLight.shadow.camera );
scene.add( lightShadowHelper );

/* LUZ PUNTUAL*/
const spotLight = new THREE.SpotLight( 0xFFFFFF );
spotLight.position.set( -100, 100, 0 );
spotLight.castShadow = true;
spotLight.angle = 0.2;
scene.add( spotLight );
/* GUIA DE LUZ PUNTAL*/
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

scene.fog = new THREE.Fog( 0xFFFFFF, 1, 100 );


/* CONTROLADOR DEL GUI */
const gui = new DAT.GUI();

/* OPCIONES A MOSTRAR */
const options = {
    sphereColor: 0x4ed3560,
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1
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

/* SE AGREGAN AL GUI DE OPCIONES  */
gui.add(options, 'angle', 0, 1).onChange( () => {
    spotLight.angle = options.angle;
});

/* SE AGREGAN AL GUI DE OPCIONES  */
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);

let step = 0;

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

    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    spotLightHelper.update();

    /* RENDER DE LA ESCENA Y CAMARA */
    renderer.render( scene, camera );
};

renderer.setAnimationLoop( animate );

