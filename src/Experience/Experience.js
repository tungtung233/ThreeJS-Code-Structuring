import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Time';
import Camera from './Camera';

export default class Experience {
  constructor(canvas) {
    // Global access
    // now can access the experience class from the console in the browser (by typing 'experience' or 'window.experience')
    window.experience = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();

    // Sizes resize event
    this.sizes.on('resize', () => {
      this.resize();
    });

    // Time tick event
    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {}

  update() {}
}
