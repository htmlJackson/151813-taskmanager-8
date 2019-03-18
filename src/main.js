import makeFilter from './make-filter.js';
import {allTasks} from './data.js';
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
  for (let task of allTasks) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);
    taskComponent.render(boardTasks);

    taskComponent.onEdit = () => {
      editTaskComponent.render(boardTasks);
      boardTasks.replaceChild(editTaskComponent._element, taskComponent._element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = () => {
      taskComponent.render(boardTasks);
      boardTasks.replaceChild(taskComponent._element, editTaskComponent._element);
      editTaskComponent.unrender();
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
