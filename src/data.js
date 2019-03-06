import Util from './util.js';

const MAX_TAGS_PER_TASK = 3;
const NUMBER_OF_TASKS = 7;
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const MILLISECONDS_IN_WEEK = MILLISECONDS_IN_DAY * 7;
const DATE_GAP_IN_DAYS = 14;

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

export const task = {
  get title() {
    return TITLES[Util.getRandomIndex(TITLES.length)];
  },
  get date() {
    const dueDate = Date.now() - MILLISECONDS_IN_WEEK + Util.getRandomIndex(DATE_GAP_IN_DAYS) * MILLISECONDS_IN_DAY;
    return new Date(dueDate);
  },
  get dateString() {
    return this.date.toLocaleString(`en-US`, {
      month: `long`,
      day: `numeric`,
    });
  },
  get time() {
    return this.date.toLocaleString(`ru`, {
      hour: `numeric`,
      minute: `numeric`
    });
  },
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
    return Util.getRandomBoolean();
  },
  get isDone() {
    return Util.getRandomBoolean();
  }
};

const allTasks = [];

for (let i = 0; i < NUMBER_OF_TASKS; i++) {
  allTasks.push(task);
}

export {allTasks};
