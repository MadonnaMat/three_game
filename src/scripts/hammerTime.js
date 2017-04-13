'use strict';
import {MeshLambertMaterial, Mesh, ObjectLoader} from 'three';

class HammerTime {
  constructor(scene) {
    this.mesh = {
      position: {},
      rotation: {}
    };
    this.initialY = 1000;
    this.initialZ = 400;
    this.initialRz = 0.4;
    this.rotating = false;

    let loader = new ObjectLoader();

    loader.texturePath = './assets/war-hammer-threejs/';
    loader.load('https://api.myjson.com/bins/13es6j', (object) => {
      this.mesh = object
      scene.add( this.mesh );
      this.changeColor();
      this.mesh.position.y = this.initialY;
      this.mesh.position.z = this.initialZ;
      this.mesh.scale.x = 100;
      this.mesh.scale.y = 100;
      this.mesh.scale.z = 100;
      this.mesh.rotation.x = 1;
      this.mesh.rotation.y = 1.6;
      this.mesh.rotation.z = this.initialRz;
    });
  }
  changeColor(){
    this.mesh.traverse((child) =>{
      if (child instanceof Mesh){
        child.material = new MeshLambertMaterial( { color:  Math.random() * 0xffffff } );
      }
    });
  }
  move(event, $domElement) {
    if(!this.rotating){
      this.mesh.position.x = (event.clientX - $domElement.width()/2) + 
          (2670 - (2670 * event.clientY)/$domElement.height())/($domElement.width()/2) * 
          (event.clientX - $domElement.width()/2);
      this.mesh.position.y = this.initialY - (event.clientY - $domElement.height()/2);
      this.mesh.position.y = 3500 - (3300 * event.clientY)/$domElement.height();
    }
  }

  checkHit(mole){
    console.log("ME: ", this.mesh.position.x, this.mesh.position.y)
    console.log("Mole: ", mole.mesh.position.x, mole.mesh.position.y);
    return (!mole.hit && mole.mesh.position.x - 350 < this.mesh.position.x &&
            mole.mesh.position.x + 250 > this.mesh.position.x &&
            mole.mesh.position.y - 300 < this.mesh.position.y &&
            mole.mesh.position.y + 300 > this.mesh.position.y)
  }

  rotate() {
    this.now = this.now || Date.now();
    this.rotating = true;
    this.mesh.rotation.z -= (Date.now() - this.now) * .004;
    this.mesh.position.z -= (Date.now() - this.now) * 1.5;
    this.now = Date.now();
    if(this.mesh.rotation.z < -1.2) {
      console.log(this.mesh.rotation.z);
      this.mesh.rotation.z = this.initialRz;
      this.mesh.position.z = this.initialZ;
      this.rotating = false;
      this.now = false;
    } else {
      requestAnimationFrame(this.rotate.bind(this));
    }
  }

}

export default HammerTime;
