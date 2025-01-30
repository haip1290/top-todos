import { getAllProjects, getProjectById } from "./projectService";
import { DTOtoTodo } from "./todoService";
function displayAllProjects() {
  const container = document.querySelector(".projects-container");
  container.textContent = "";
  const projectList = getAllProjects();
  projectList.forEach((project) => {
    const projectDisplay = document.createElement("button");
    projectDisplay.classList.add("project");
    projectDisplay.id = project.id;
    projectDisplay.textContent = project.title;
    projectDisplay.addEventListener("click", () => {
      displayProject(project.id);
    });
    container.appendChild(projectDisplay);
  });
}
function displayProject(id) {
  const container = document.querySelector(".project-container");
  container.textContent = "";
  const project = getProjectById(id);
  if (!project) {
    throw Error("No project with this id " + id);
  }
  // create element
  const projectDiv = document.createElement("div");
  projectDiv.className = "project";
  projectDiv.id = project.id;

  const h1 = document.createElement("h1");
  h1.className = "title";
  h1.textContent = project.title;
  projectDiv.appendChild(h1);

  const todosContainer = document.createElement("div");
  todosContainer.className = "todos";
  projectDiv.appendChild(todosContainer);
  container.appendChild(projectDiv);

  const todos = project.todos;
  if (todos.length > 0) {
    todos.forEach((todo) => displayTodo(todo));
  }
}

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
  const todosContainer = document.createElement("div");
  todosContainer.className = "todos";
  project.todos.forEach((todo) => createTodoDisplay(todo));
  container.appendChild(projectDiv);
}

function displayTodo(todo) {
  // convert todo
  DTOtoTodo(todo);
  // get the container
  const container = document.querySelector(".todos");
  // create todos div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.id = todo.id;
  // todoDiv.textContent = `${todo.title} ${todo.dueDate} ${todo.priority}`;

  // const infoDiv = document.createElement("div");
  // infoDiv.className = "info";
  const titleSpan = document.createElement("span");
  titleSpan.className = "title";
  const dueDateSpan = document.createElement("span");
  dueDateSpan.className = "due-date";
  const prioritySpan = document.createElement("span");
  prioritySpan.className = "priority";
  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "description";
  // add content
  titleSpan.textContent = todo.title;
  dueDateSpan.textContent = todo.dueDate;
  prioritySpan.textContent = todo.priority;
  descriptionDiv.textContent = todo.description;
  // attach to container
  todoDiv.appendChild(titleSpan);
  todoDiv.appendChild(dueDateSpan);
  todoDiv.appendChild(prioritySpan);

  container.appendChild(todoDiv);
  container.appendChild(descriptionDiv);
}

export { displayAllProjects, displayFirstProject, displayProject, displayTodo };
