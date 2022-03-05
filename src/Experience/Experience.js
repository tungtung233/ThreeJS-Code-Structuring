import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Time';
import Camera from './Camera';
import Renderer from './Renderer';

// this is the instance of the Experience
let instance = null;

export default class Experience {
  constructor(canvas) {
    // this ensures that each time we try to create a new Experience, we are just returning the old Experience instead - we have turned the Experience class into a singleton
    // The reason why we do this is so that the Camera class can have access to the same Experience each time
    if (instance) {
      return instance;
    }

    instance = this;

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
    this.renderer = new Renderer();

    // Sizes resize event
    this.sizes.on('resize', () => {
      this.resize();
    });

    // Time tick event
    this.time.on('tick', () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
  }

  update() {
    this.camera.update();
  }
}
