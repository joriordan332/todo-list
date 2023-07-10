const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
function displayTasks() {
  let items = ""
  const task = JSON.parse(localStorage.getItem('items'));
  const displayMessage = document.getElementById('displayMessage').textContent;
   for(let i = 0; i < itemsArray.length; i++){
    items += `<div class="taskContainer" id="priority-${task[i].prioritySelect}">
                  <div class="card-show">
                    <input type="checkbox" id="checkbox" class="checkbox "name="checkbox" value="checkbox">
                    <div class="task" id="task">${task[i].task}</div>
                    <div class="description" id="description">${task[i].description}</div>
                    <div class="date" id="date" name="date">${task[i].date}</div>
                  <div class="card-btns">
                    <button class="delete" id="delete">Delete</button>
                  </div>
                  <div class="card-hidden">
                    <h3 class="projectSelect" name="projectSelect">Project: <b>${displayMessage}</b></h3>
                    <div class="prioritySelect" id="prioritySelect">${task[i].prioritySelect}</div>
                  </div>
                  </div>
              </div>
              
            `;
  }
  document.querySelector('.tasks').innerHTML = items
}


function createItem(createTask){
  itemsArray.push(createTask)
  localStorage.setItem('items', JSON.stringify(itemsArray)) 
}




const projectsArray = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];

function projectStorage(createProject){
  projectsArray.push(createProject)
  localStorage.setItem('projects', JSON.stringify(projectsArray)) 
}

function displayProjects() {
  let project = ""
  const projects = JSON.parse(localStorage.getItem('projects'));
   for(let i = 0; i < projectsArray.length; i++){
    project += `
                <div class="project" id="project">${projects[i].title}</div>
            `;
  }
  document.querySelector('.userProject').innerHTML = project
}

window.onload = function() {
  displayTasks()
  displayProjects()
};


export { displayTasks, createItem, projectStorage, displayProjects  }