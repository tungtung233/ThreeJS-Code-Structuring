import * as THREE from 'three';
import Experience from '../Experience';
import Environment from './Environment';
import Floor from './Floor';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Test mesh - here so we can make sure the Environment stuff is working
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(testMesh);

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.floor = new Floor();
      this.environment = new Environment(); // envMap has to be after all the other materials, since it will only update what has already been instantiated
    });
  }
}
