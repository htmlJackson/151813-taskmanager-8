export const task = {
  get title() {
    return [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ][Math.floor(Math.random() * 3)];
  },
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tagsList: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `html`,
    `css`,
    `javascript`,
  ]),
  get tags() {
    const generatedTags = new Set();
    for (let i = 0; i < (Math.floor(Math.random() * 4)); i++) {
      generatedTags.add([...this.tagsList][Math.floor(Math.random() * this.tagsList.size)]);
    }
    return generatedTags;
  },
  get picture() {
    return `http://picsum.photos/100/100?r=${Math.random()}`;
  },
  get color() {
    return [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`
    ][Math.floor(Math.random() * 5)];
  },
  repeatingDays: {
    'Mo': true,
    'Tu': false,
    'We': false,
    'Th': false,
    'Fr': true,
    'Sa': false,
    'Su': true
  },
  isFavorite: [
    true,
    false
  ][Math.floor(Math.random() * 2)],
  isDone: [
    true,
    false
  ][Math.floor(Math.random() * 2)]
};

const allTasks = [];

for (let i = 0; i < 7; i++) {
  allTasks.push(task);
}

export {allTasks};
