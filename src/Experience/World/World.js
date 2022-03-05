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
      this.environment = new Environment();
      this.floor = new Floor();
    });
  }
}
