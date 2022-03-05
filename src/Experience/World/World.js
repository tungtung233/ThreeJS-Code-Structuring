import * as THREE from 'three';
import Experience from '../Experience';
import Environment from './Environment';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // Test mesh - here so we can make sure the Environment stuff is working
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );
    this.scene.add(testMesh);

    // Setup
    this.environment = new Environment();
  }
}