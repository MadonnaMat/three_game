import jQuery from 'jquery';
import Timer from './module.js';
import HammerTime from './hammerTime.js';
import Platform from './platform.js';
import Mole from './mole.js';
import {Scene, DirectionalLight, PerspectiveCamera, BoxGeometry, WebGLRenderer} from 'three';

window.$ = window.jQuery = jQuery;

let scene = new Scene();
let hammerTime = new HammerTime(scene);
let mole = new Mole(scene);
let platform = new Platform( scene )

let camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 1000;
camera.rotation.x = .8;
let light = new DirectionalLight( 0xffffff );
light.position.set( camera.position.x, camera.position.y, camera.position.z ).normalize();
scene.add( light );


window.camera = camera;

let renderer = new  WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

let $domElement = $(renderer.domElement)

$domElement.on('mousemove', (event) => {
  hammerTime.move(event, $domElement);
});

$domElement.on('click', (event) =>{
  if(!hammerTime.rotating){
    if(hammerTime.checkHit(mole)) {
      mole.setHit();
    }
    hammerTime.rotate();
  };
});


function animate() {
  requestAnimationFrame( animate );
  mole.move();
  renderer.setSize( window.innerWidth, window.innerHeight);
  renderer.render( scene, camera );
}

animate();
