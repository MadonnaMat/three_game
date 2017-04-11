'use strict';

const INTERVAL = 1000;

class Timer {
  constructor(element) {
    this.element = element;
  }

  getTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return hours + ':' + minutes;
  }

  update() {
    this.element.textContent = this.getTime();

    setInterval(() => {
      this.element.textContent = this.getTime();
    }, INTERVAL);
  }
}

export default Timer;
