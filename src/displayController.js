import { getAllProjects, getProjectById } from "./projectService";

function displayAllProjects() {
  const container = document.querySelector(".projects-container");
  container.textContent = "";
  const projectList = getAllProjects();
  projectList.forEach((project) => {
    const projectDisplay = document.createElement("button");
    projectDisplay.classList.add("project");
    projectDisplay.id = project.id;
    projectDisplay.textContent = project.title;
    projectDisplay.addEventListener("click", displayProject(project.id));
    container.appendChild(projectDisplay);
  });
}
function displayProject(id) {
  const container = document.querySelector(".project-container");
  container.textContent = "";
  const project = getProjectById(id);
  if (!project) {
    return;
  }
  // create element
  const projectDiv = document.createElement("div");
  projectDiv.className = "project";
  projectDiv.id = project.id;

  const infoDiv = document.createElement("div");
  infoDiv.className = "info";
  const titleSpan = document.createElement("span");
  titleSpan.className = "title";
  const dueDateSpan = document.createElement("span");
  dueDateSpan.className = "due-date";
  const prioritySpan = document.createElement("span");
  prioritySpan.className = "priority";

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "description";
  // add content
  titleSpan.textContent = project.title;
  dueDateSpan.textContent = project.dueDate;
  prioritySpan.textContent = project.priority;
  descriptionDiv.textContent = project.description;
  // attach to container
  infoDiv.appendChild(titleSpan);
  infoDiv.appendChild(dueDateSpan);
  infoDiv.appendChild(prioritySpan);
  projectDiv.appendChild(infoDiv);
  projectDiv.appendChild(descriptionDiv);
  container.appendChild(projectDiv);
}

function displayTodosByProjectId(id) {}

function displayFirstProject() {
  const container = document.querySelector(".project-container");
  container.textContent = "";
  // get first project
  const project = getAllProjects()[0];
  if (!project) {
    container.textContent = "No project available";
    return;
  }
  // get project div
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project");
  projectDiv.id = project.id;
  // create header for project
  const h1 = document.createElement("h1");
  h1.className = "h-project";
  h1.textContent = project.title;
  projectDiv.appendChild(h1);
  // display todos
  project.todos.forEach((todo) => createTodoDisplay(todo));
  container.appendChild(projectDiv);
}

function createTodoDisplay(todo) {
  // get the container
  const todos = document.querySelector(".todos");
  // create todos div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.id = todo.id;
  todoDiv.textContent = `${todo.title} ${todo.dueDate} ${todo.priority}`;
  todos.appendChild(todoDiv);
}

export {
  displayAllProjects,
  displayFirstProject,
  displayTodosByProjectId,
  displayProject,
};
