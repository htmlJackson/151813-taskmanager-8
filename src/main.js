import makeFilter from './make-filter.js';
import {dataTasks} from './data.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

const mainFilter = document.querySelector(`.main__filter`);

mainFilter.insertAdjacentHTML(`beforeend`, `
  ${makeFilter(`all`, `15`, false, true)}
  ${makeFilter(`overdue`, `0`, true)}
  ${makeFilter(`today`, `0`, true)}
  ${makeFilter(`favorites`, `7`)}
  ${makeFilter(`repeating`, `2`)}
  ${makeFilter(`tags`, `6`)}
  ${makeFilter(`archive`, `115`)}
`);

const boardTasks = document.querySelector(`.board__tasks`);

const clearBoard = () => {
  while (boardTasks.firstChild) {
    boardTasks.removeChild(boardTasks.firstChild);
  }
};

const generateRandomTasks = () => {
  for (const dataTask of dataTasks) {
    const taskComponent = new Task(dataTask);
    const taskEditComponent = new TaskEdit(dataTask);
    taskComponent.render(boardTasks);

    taskComponent.onEdit = () => {
      taskEditComponent.render(boardTasks);
      boardTasks.replaceChild(taskEditComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    taskEditComponent.onSubmit = () => {
      taskComponent.render(boardTasks);
      boardTasks.replaceChild(taskComponent.element, taskEditComponent.element);
      taskEditComponent.unrender();
    };
  }
};

generateRandomTasks();

const filtersList = document.querySelectorAll(`.filter__input`);

Array.from(filtersList).forEach((elem) => {
  elem.addEventListener(`click`, () => {
    clearBoard();
    generateRandomTasks();
  });
});
