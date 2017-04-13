import jQuery from 'jquery';
import HammerTime from './hammerTime.js';
import Platform from './platform.js';
import Mole from './mole.js';
import Score from './score.js';
import Timer from './timer.js';
import {Scene, DirectionalLight, PerspectiveCamera, BoxGeometry, WebGLRenderer} from 'three';

window.$ = window.jQuery = jQuery;

let scene = new Scene();
let hammerTime = new HammerTime(scene);
let mole = new Mole(scene);
let platform = new Platform( scene );
let score = new Score( scene );

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
let $startGame = $('#startGame');
let timer = new Timer( scene, $domElement, $startGame );

$startGame.on('click', () => {
  $startGame.hide();
  $domElement.css({cursor: 'none'});
  if(score.score != 0) {
    score.score = 0;
    score.reloadScoreboard();
  }
  timer.timeLeft = 60;
  timer.tickDown();
});

$domElement.on('mousemove', (event) => {
  if(timer.timeLeft > 0) { 
    hammerTime.move(event, $domElement);
  }
});

$domElement.on('click', (event) =>{
  if(!hammerTime.rotating && timer.timeLeft > 0){
    if(hammerTime.checkHit(mole)) {
      mole.setHit();
      score.incrementScore();
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
