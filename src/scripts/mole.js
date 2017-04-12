'use strict';
import {Mesh, MeshLambertMaterial, CylinderBufferGeometry} from 'three';

class Mole {
  constructor(scene) {
    this.moved = false;
    let  material = new MeshLambertMaterial( { color : 'brown' } );
    let  geometry = new CylinderBufferGeometry( 50, 50, 100, 30, 1 );
    this.mesh = new Mesh( geometry, material );
    this.originalR = this.mesh.material.color.r;
    this.mesh.rotation.x = 1.4;
    this.mesh.position.y = 1000;
    this.mesh.position.z = -250;
    this.mesh.scale.x = 5;
    this.mesh.scale.y = 5;
    this.mesh.scale.z = 5;
    scene.add( this.mesh );
    window.mole = this.mesh;
  }

  move() {
    if(!this.moved) {
      this.moved = true;
      this.mesh.position.x = this.rand(-1000, 1000)
      this.mesh.position.y = this.rand(1000, 2000)
      this.up = true;
      this.now = Date.now();
      this.upAndDown();
      setTimeout(()=>{
        this.moved = false;
        this.hit = false;
        this.mesh.material.color.r = this.originalR;
      }, 1000)
    }
  }
  upAndDown() {
    if(this.up){
      this.mesh.position.z += (Date.now() - this.now) * 1.2;
      if(this.mesh.position.z >= -250){
        this.mesh.position.z = -250;
        this.up = false;
        this.down = true;
      }
    } else if (this.down){
      this.mesh.position.z -= (Date.now() - this.now) * 1.2;
      if(this.mesh.position.z <= -750){
        this.mesh.position.z = -750;
        this.down = false;
      }
    }
    this.now = Date.now();
    if(this.up || this.down){
      requestAnimationFrame(this.upAndDown.bind(this));
    }
  }

  setHit(){
    if(!this.hit) {
      this.hit = true;
      this.mesh.material.color.r = 1;
    }
  }
  
  rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default Mole;
