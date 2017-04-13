'use strict';
import {Mesh, MeshLambertMaterial, FontLoader, TextGeometry, Box3} from 'three';

class Timer {
  constructor(scene, $domElement, $startGame){
    let loader = new FontLoader();
    this.mesh = {
      position: {},
      rotation: {}
    };
    this.$domElement = $domElement;
    this.$startGame = $startGame;
    this.timeLeft = 0;
    loader.load('https://api.myjson.com/bins/10cfyj', (font) => {
        this.font = font;
        let geometry = new TextGeometry(this.timeLeft, {font: this.font});
        this.material = new MeshLambertMaterial( { color : 'blue' } );
        this.mesh = new Mesh( geometry, this.material );
        this.mesh.scale.x = 5;
        this.mesh.scale.y = 5;
        this.mesh.rotation.x = 1;
        this.mesh.position.y = 3500;
        this.mesh.position.x = -3500;
        scene.add( this.mesh );
        this.tickDown();
    });
  }
  redrawTime(){
    this.mesh.geometry = new TextGeometry(this.timeLeft, {font: this.font});
  }
  tickDown(){
    this.now = this.now || Date.now();
    if(Date.now() - this.now >= 1000){
      this.timeLeft--;
      this.now = Date.now();
      this.redrawTime();
    }
    if(this.timeLeft > 0){
      requestAnimationFrame(this.tickDown.bind(this));
    } else {
      this.$domElement.css({cursor: 'default'});
      this.$startGame.parent().show();
      this.now = null;
    }
  }
}

export default Timer;
