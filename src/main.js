import makeFilter from './make-filter.js';
import makeTask from './make-task.js';
import {dataTask} from './data.js';
import {allTasks} from './data.js';

import Util from './util.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

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


const clearBoard = () => {
  while (boardTasks.firstChild) {
    boardTasks.removeChild(boardTasks.firstChild);
  }
};

// boardTasks.insertAdjacentHTML(`beforeend`, generateRandomTasks());
for (let task of allTasks) {
  const taskComponent = new Task(task);
  const editTaskComponent = new TaskEdit(task);
  taskComponent.render(boardTasks);

  taskComponent.onEdit = () => {
    editTaskComponent.render();
    boardTasks.replaceChild(editTaskComponent.element, taskComponent.element);
    taskComponent.unrender();
  };

  editTaskComponent.onSubmit = () => {
    taskComponent.render();
    boardTasks.replaceChild(taskComponent.element, editTaskComponent.element);
    editTaskComponent.unrender();
  };

}

const filtersList = document.querySelectorAll(`.filter__input`);

Array.from(filtersList).forEach((elem) => {
  elem.addEventListener(`click`, () => {
    clearBoard();
//    boardTasks.insertAdjacentHTML(`beforeend`, generateRandomTasks());
  });
});
