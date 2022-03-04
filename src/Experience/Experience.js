export default class Experience {
  constructor() {
    // Global access
    // now can access the experience class from the console in the browser (by typing 'experience' or 'window.experience')
    window.experience = this;

  }
}