import jQuery from 'jquery';
import Timer from './module.js';
import {Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, WebGLRenderer} from 'three';

window.$ = window.jQuery = jQuery;

let scene = new Scene();

let camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.z = 1000;
camera.rotation.x = .8;

window.camera = camera;

let geometry = new BoxGeometry( 200, 200, 200 );
let material = new MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

let mesh = new Mesh( geometry, material );
scene.add( mesh );
const initialY = 1000;
mesh.position.y = initialY;

geometry = new BoxGeometry(10000, 10000, 200);
material = new MeshBasicMaterial( { color: 'blue' } );

let platform = new Mesh( geometry, material );
scene.add( platform );

window.mesh = mesh;

platform.position.z = -500;

window.platform = platform;

window.BoxGeometry = BoxGeometry;

let renderer = new  WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

let $domElement = $(renderer.domElement)

$domElement.on('mousemove', (event) => {
  mesh.position.x = (event.clientX - $domElement.width()/2) + 
      (2670 - (2670 * event.clientY)/$domElement.height())/($domElement.width()/2) * 
      (event.clientX - $domElement.width()/2);
  mesh.position.y = initialY - (event.clientY - $domElement.height()/2);
  mesh.position.y = 3500 - (3300 * event.clientY)/$domElement.height();
  console.log(event.clientY);
  console.log(mesh.position)
});

function animate() {
 
    requestAnimationFrame( animate );
 
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
 
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.render( scene, camera );
}

animate();
