import EventEmitter from './Utils/EventEmitter';

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    // Delta time - the time between the current frame and the previous frame
    // We set it as 16 by default because that is close to how many milliseconds there is between two frames at 60fps
    this.delta = 16;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger('tick')

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
