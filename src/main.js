import makeFilter from './make-filter.js';
import makeTask from './make-task.js';
import {allTasks} from './data.js';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

mainFilter.insertAdjacentHTML(`beforeend`, `
  ${makeFilter(`all`, `15`, false, true)}
  ${makeFilter(`overdue`, `0`, true)}
  ${makeFilter(`today`, `0`, true)}
  ${makeFilter(`favorites`, `7`)}
  ${makeFilter(`repeating`, `2`)}
  ${makeFilter(`tags`, `6`)}
  ${makeFilter(`archive`, `115`)}
`);


const generateRandomTasks = () => {
  let result = ``;
  for (const task of allTasks) {
    result += makeTask(task);
  }
  return result;
};

const clearBoard = () => {
  while (boardTasks.firstChild) {
    boardTasks.removeChild(boardTasks.firstChild);
  }
};

boardTasks.insertAdjacentHTML(`beforeend`, generateRandomTasks());

const filtersList = document.querySelectorAll(`.filter__input`);

Array.from(filtersList).forEach((elem) => {
  elem.addEventListener(`click`, () => {
    clearBoard();
    boardTasks.insertAdjacentHTML(`beforeend`, generateRandomTasks());
  });
});
