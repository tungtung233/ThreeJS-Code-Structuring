import * as THREE from 'three';
import Experience from './Experience';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width,
      this.sizes.height,
      0.1,
      100
    );

    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }
}
