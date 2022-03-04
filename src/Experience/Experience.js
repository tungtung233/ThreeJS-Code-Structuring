import Sizes from './Utils/Sizes';
import Time from './Time';

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

    this.sizes.on('resize', () => {
      this.resize();
    });
  }

  resize() {
    console.log('resize occured');
  }
}
