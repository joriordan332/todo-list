import { Task } from './task';
import { allTasks, todayTask, weekTask, showProject } from './filter-todo';
import { Projects } from './project';
import { createItem, projectStorage  } from './storage'



const message = document.getElementById('message');

export function addTask() {
  const addTaskBtn = document.createElement('button');
  addTaskBtn.setAttribute('id', 'addTaskBtn');
  const addTaskBtnText = document.createTextNode('+ Add Task');
  message.appendChild(addTaskBtn);
  addTaskBtn.appendChild(addTaskBtnText);
}

export function showMessage(msg) {
  const messageDiv = document.createElement('div');
  messageDiv.setAttribute('id', 'messageDiv');
  messageDiv.classList.add('messageDiv');
  messageDiv.textContent = msg;
  message.appendChild(messageDiv);
  setTimeout(() => message.removeChild(messageDiv), 3000);
}

export const formEventListener = () => {
  document.addEventListener('click', (e) => {
    if (e.target.matches('#all')) {
      allTasks();
      changeSectionTitle('All tasks');
    }

    document.addEventListener('click', (e) => {
      if (e.target.matches('#today')) {
        todayTask();
        changeSectionTitle('Todays Tasks');
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.matches('#week')) {
        weekTask();
        changeSectionTitle('Week Tasks');
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.matches('.project')) {
        showProject(e.target);
        changeSectionTitle(e.target.textContent);
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.matches('.delete')) {
        deleteTask(e.target);
      }
    });
  });

  const addTaskBtn = document.getElementById('addTaskBtn');
  addTaskBtn.addEventListener('click', taskPopUpBox);

  const taskCancel = document.getElementById('taskCancel');
  taskCancel.addEventListener('click', cancelTask);

  const addTask = document.getElementById('taskAdd');
  addTask.addEventListener('click', newTask);
};

const taskPopUpBox = () => {
  const taskDiv = document.querySelector('.taskDiv');
  const addTaskBtn = document.getElementById('addTaskBtn');
  addTaskBtn.style.display = 'none';
  taskDiv.style.display = 'block';
};

const cancelTask = () => {
  const taskDiv = document.querySelector('.taskDiv');
  const addTaskBtn = document.getElementById('addTaskBtn');
  addTaskBtn.style.display = 'block';
  taskDiv.style.display = 'none';
};

export function newTaskDiv(createTask) {
  const displayMessage = document.getElementById('displayMessage').textContent;
  const tasks = document.getElementById('tasks');
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('taskContainer');
  taskContainer.innerHTML = `
        <div class="card-show">
            <input type="checkbox" id="checkbox" class="checkbox "name="checkbox" value="checkbox">
            <div class="task" id="task">${createTask.task}</div>
            <div class="description" id="description">${createTask.description}</div>
            <div class="date" id="date" name="date">${createTask.date}</div>
            
        <div class="card-btns">
            <button class="delete" id="delete">Delete</button>
        </div>
        <div class="card-hidden">
            <h3 class="projectSelect" name="projectSelect">Project: <b>${displayMessage}</b></h3>
            <div class="prioritySelect" id="prioritySelect">${createTask.prioritySelect}</div>
        </div>
        </div>
`;
  taskContainer.setAttribute('id', `priority-${createTask.prioritySelect}`);
  tasks.appendChild(taskContainer);
 
}

export function taskForm() {
  const taskDiv = document.createElement('div');
  taskDiv.setAttribute('id', 'taskDiv');
  taskDiv.classList.add('taskDiv');
  taskDiv.innerHTML = `  
        <input id="task" placeholder="Task"></input>
        <input id="description" placeholder="Description"></input>
        <input id="date" type="date" placeholder="Due Date"></input>
        <select id="prioritySelect">
            <option value="none">Select your priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>
        <button id="taskAdd">Add</button>
        <button id="taskCancel">Cancel</button>
`;
  message.appendChild(taskDiv);
}

export const newTask = () => {
  const task = document.getElementById('task').value;
  const description = document.getElementById('description').value;
  let date = document.getElementById('date').value;
  const prioritySelect = document.getElementById('prioritySelect').value;
  if (task === '') return showMessage('Task box must not be empty', 'alert');
  if (date === '') date = 'No due date';
  const createTask = new Task(task, description, date, prioritySelect);
  newTaskDiv(createTask);
  createItem(createTask)
  taskFormClear();
  taskClear();
};

const taskFormClear = () => {
  const taskDiv = document.querySelector('.taskDiv');
  const addTaskBtn = document.getElementById('addTaskBtn');
  addTaskBtn.style.display = 'block';
  taskDiv.style.display = 'none';
};

const taskClear = () => {
  const task = document.getElementById('task');
  const description = document.getElementById('description');
  const date = document.getElementById('date');
  const prioritySelect = document.getElementById('prioritySelect');
  task.value = '';
  description.value = '';
  date.value = '';
  prioritySelect.value = '';
};

const changeSectionTitle = (newTitle) => {
  const displayMessage = document.getElementById('displayMessage');
  displayMessage.textContent = newTitle;
};

export const eventListener = () => {
  // event listener for creating a form for adding projects
  const newProject = document.getElementById('newProject');
  newProject.addEventListener('click', projectPopUpBox);

  const projectCancel = document.getElementById('projectCancel');
  projectCancel.addEventListener('click', cancelProject);

  const projectAdd = document.getElementById('projectAdd');
  projectAdd.addEventListener('click', projectCreate);
};

const projectPopUpBox = () => {
  const projectPopUp = document.getElementById('projectPopUp');
  projectPopUp.style.display = 'block';
  newProject.style.display = 'none';
};

const cancelProject = () => {
  projectPopUp.style.display = 'none';
  newProject.style.display = 'block';
};

const deleteTask = (e) => {
  const todo = e.parentElement.parentElement;
  todo.remove();
};

export function showProjectMessage(msg) {
  const projectMessage = document.getElementById('projectMessage');
  const messageDiv = document.createElement('div');
  messageDiv.setAttribute('id', 'messageDiv');
  messageDiv.classList.add('messageDiv');
  messageDiv.textContent = msg;
  projectMessage.appendChild(messageDiv);
  setTimeout(() => projectMessage.removeChild(messageDiv), 3000);
}

const projectCreate = () => {
  const title = document.getElementById('projectInput').value;
  if (title === '') return showProjectMessage('Project box must not be empty', 'alert');
  const createProject = new Projects(title);
  addNewProject(createProject);
  projectFormClear();
  taskForm();
  projectStorage(createProject)
};

const projectFormClear = () => {
  newProject.style.display = 'block';
  projectPopUp.style.display = 'none';
};

export const addNewProject = (createProject) => {
  const projects = document.getElementById('projects');
  const project = document.createElement('div');
  project.classList.add('project');
  project.innerHTML = `${createProject.title}`;
  projects.appendChild(project);
  const projectInput = document.getElementById('projectInput');
  document.getElementById('projectInput').value;
  projectInput.value = '';
};


