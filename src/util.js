export default {
  getRandomIndex(n) {
    return Math.floor(Math.random() * n);
  },
  getRandomBoolean() {
    return !!this.getRandomIndex(2);
  },
  createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }
};
