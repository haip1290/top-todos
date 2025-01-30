import { getAllProjects, getProjectById } from "./projectService";
import { DTOtoTodo, deleteTodoById } from "./todoService";

function displayAllProjects() {
  // get container that hold all project button
  const container = document.querySelector(".projects-container");
  container.textContent = ""; // clear before add
  const projectList = getAllProjects(); // get all project from localStorage
  // for each project in the listt, create a button then add to container
  projectList.forEach((project) => {
    const projectDisplay = document.createElement("button");
    projectDisplay.classList.add("project");
    projectDisplay.id = project.id;
    projectDisplay.textContent = project.title;
    // add event handler when click button
    projectDisplay.addEventListener("click", () => {
      displayProject(project.id);
    });
    container.appendChild(projectDisplay);
  });
}

function displayProject(id) {
  // get container of project
  const container = document.querySelector(".project-container");
  container.textContent = "";
  const project = getProjectById(id); // get project from localStorage
  if (!project) {
    throw Error("No project with this id " + id);
  }
  createProjectElement(project, container);
}

function displayFirstProject() {
  // get container element which container all projects
  const container = document.querySelector(".project-container");
  container.textContent = "";
  const project = getAllProjects()[0]; // get first project from localStorage
  if (!project) {
    container.textContent = "No project available";
    return;
  }
  // create project element
  createProjectElement(project, container);
}

function createProjectElement(project, container) {
  // create project element
  const projectDiv = document.createElement("div");
  projectDiv.className = "project";
  projectDiv.id = project.id;
  // create h1 element
  const h1 = document.createElement("h1");
  h1.className = "title";
  h1.textContent = project.title;
  projectDiv.appendChild(h1);
  // create table header
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-container");

  const priority = document.createElement("div");
  priority.classList.add("header-priority");
  priority.textContent = "Priority";

  const title = document.createElement("div");
  title.classList.add("header-title");
  title.textContent = "Title";

  const dueDate = document.createElement("div");
  dueDate.classList.add("header-duedate");
  dueDate.textContent = "Due Date";

  headerContainer.appendChild(priority);
  headerContainer.appendChild(title);
  headerContainer.appendChild(dueDate);
  projectDiv.appendChild(headerContainer);
  // display todos
  const todosContainer = document.createElement("div");
  todosContainer.className = "todos";
  projectDiv.appendChild(todosContainer);
  container.appendChild(projectDiv);

  const todosList = project.todos;
  if (todosList && todosList.length > 0) {
    project.todos.forEach((todo) => displayTodo(todo));
  }
}

function displayTodo(todo) {
  // add todo class method to object
  DTOtoTodo(todo);

  // create todos div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.id = todo.id;

  const infoSection = createInfoSection(todo);
  todoDiv.appendChild(infoSection);
  const descriptionDiv = createDescriptionSection(todo.description);
  todoDiv.appendChild(descriptionDiv);

  const container = document.querySelector(".todos");
  container.appendChild(todoDiv);
}

function createInfoSection(todo) {
  // create title, due date, priority and description element
  const infoSection = document.createElement("div");
  infoSection.className = "info";

  const titleSection = createTitleSection(todo.title);
  const prioritySection = createPrioritySection(todo.priority);
  const dueDate = createDueDateSection(todo.dueDate);
  const btnGroup = createBtnGroup();

  infoSection.appendChild(prioritySection);
  infoSection.appendChild(titleSection);
  infoSection.appendChild(dueDate);
  infoSection.appendChild(btnGroup);
  return infoSection;
}

function createTitleSection(title) {
  const titleSpan = document.createElement("span");
  titleSpan.className = "title";
  titleSpan.textContent = title;
  return titleSpan;
}

function createDueDateSection(dueDate) {
  const dueDateSpan = document.createElement("span");
  dueDateSpan.className = "due-date";
  dueDateSpan.textContent = dueDate ? dueDate : "N/A";
  return dueDateSpan;
}

function createPrioritySection(priority) {
  const prioritySpan = document.createElement("span");
  prioritySpan.className = "priority";

  const priorityLevel = priority;
  prioritySpan.classList.add(`priority-${priorityLevel}`);
  priorityContentByPriorityLevel(priorityLevel, prioritySpan);
  return prioritySpan;
}

function createDescriptionSection(description) {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("description");
  descriptionDiv.hidden = true;
  descriptionDiv.textContent = `Description: ${description}`;
  return descriptionDiv;
}

function createBtnGroup() {
  // create button group
  const btnGroup = document.createElement("div");
  btnGroup.classList.add("btn-group");

  // append to container
  btnGroup.appendChild(createDetailBtn());
  btnGroup.appendChild(createEditBtn());
  btnGroup.appendChild(createDelBtn());
  return btnGroup;
}

function createDetailBtn() {
  const btnDetail = document.createElement("button");
  btnDetail.classList.add("btn-details");
  btnDetail.textContent = "More";
  btnDetail.addEventListener("click", showDetails);
  return btnDetail;
}

function createEditBtn() {
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-edit");
  btnEdit.textContent = "Edit";
  btnEdit.addEventListener("click", editTodo);
  return btnEdit;
}

function createDelBtn() {
  const btnDel = document.createElement("button");
  btnDel.classList.add("btn-del");
  btnDel.textContent = "Delete";
  btnDel.addEventListener("click", delTodo);
  return btnDel;
}

function delTodo(event) {
  const target = event.target;
  const todoId = target.closest(".todo").id;
  deleteTodoById(todoId);
  const projectId = target.closest(".project").id;
  displayProject(projectId);
}

function createEditDialog() {
  const dialog = document.createElement("dialog");
}

function editTodo(event) {
  console.log("here");
}

function showDetails(event) {
  const description = event.target
    .closest(".todo")
    ?.querySelector(".description");
  description.hidden = !description.hidden;
}

function priorityContentByPriorityLevel(priorityLevel, prioritySpan) {
  switch (priorityLevel) {
    case "high":
      prioritySpan.textContent = "🔴";
      break;
    case "medium":
      prioritySpan.textContent = "🟠";
      break;
    case "low":
      prioritySpan.textContent = "🟢";
      break;

    default:
      throw Error("Invalid priority level");
      break;
  }
}

export { displayAllProjects, displayFirstProject, displayProject, displayTodo };
