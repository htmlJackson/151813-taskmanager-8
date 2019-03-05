import Util from './util.js';

const MAX_TAGS_PER_TASK = 3;

const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const TAGS = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `html`,
  `css`,
  `javascript`,
];

const TITLES = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const NUMBER_OF_TASKS = 7;

export const task = {
  get title() {
    return TITLES[Util.getRandomIndex(TITLES.length)];
  },
  dueDate: Date.now() + 1 + Util.getRandomIndex(7) * 24 * 60 * 60 * 1000,
  get tags() {
    const generatedTags = new Set();
    for (let i = 0; i <= Util.getRandomIndex(MAX_TAGS_PER_TASK); i++) {
      generatedTags.add(TAGS[Util.getRandomIndex(TAGS.length)]);
    }
    return generatedTags;
  },
  get picture() {
    return `http://picsum.photos/100/100?r=${Math.random()}`;
  },
  get color() {
    return COLORS[Util.getRandomIndex(COLORS.length)];
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
  get isFavorite() {
    return !!Util.getRandomIndex(2);
  },
  get isDone() {
    return !!Util.getRandomIndex(2);
  }
};

const allTasks = [];

for (let i = 0; i < NUMBER_OF_TASKS; i++) {
  allTasks.push(task);
}

export {allTasks};
