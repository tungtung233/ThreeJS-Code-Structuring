import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';
import Debug from './Utils/Debug';
import sources from './sources';

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
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

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
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  // completely remove the entire experience
  // e.g. you're switching to a different page and no longer need that particular experience, you should destroy it since leaving it is bad for performance
  // you should also remove event listeners
  destroy() {
    // 'off' comes from EventEmitter - it will remove every listener on this event name
    this.sizes.off('resize');
    this.time.off('tick');

    // traverse the whole scene and find everything we want to dispose of - we should dispose of geometries, materials, textures and specific things like controls (like orbitControls), passes etc.
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // test if there is a dispose function
          if (value && typeof value.dispose === 'function') {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
