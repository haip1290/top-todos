import "./styles/style.css";
import { createProject, DTOtoProject } from "./projectService";
import { createTodo, DTOtoTodo } from "./todoService";
import {
  displayAllProjects,
  displayFirstProject,
  displayProject,
  displayTodo,
} from "./displayController";
import Project from "./project";
import Todo from "./todo";

console.log("Start app");

document.addEventListener("DOMContentLoaded", () => {
  // setup diaglog to add project and todo
  setUpDialogProject();
  setUpDialogTodo();
  setupCopyRight(); // set up  copy right
  setupProjectId();
  setupTodo();
  // display projects on nav bar and first project on main section
  displayAllProjects();
  displayFirstProject();
  // add handler to buttons
  const btnAddProject = document.querySelector("nav .btn-submit");
  btnAddProject.addEventListener("click", addProjectHandler);
  const btnAddTodo = document.querySelector(".main .btn-submit");
  btnAddTodo.addEventListener("click", addTodoHandler);
});

function addProjectHandler() {
  const dialog = document.querySelector("nav dialog");

  const titleInput = document.querySelector("#project-title");
  const title = titleInput.value.trim();
  if (!title) {
    return;
  }

  const project = createProject({ title });
  titleInput.value = "";
  displayAllProjects();
  displayProject(project.id);
  dialog.close();
}

function addTodoHandler() {
  const dialog = document.querySelector(".main dialog");
  const titleInput = document.querySelector("#todo-title");
  const descriptionInput = document.querySelector("#todo-des");
  const dueDateInput = document.querySelector("#todo-date");
  const priorityInput = document.querySelector("#priority");
  const projectDiv = document.querySelector(".main .project");
  if (!projectDiv) {
    alert("There is no available project");
    return;
  }
  const projectId = projectDiv.id;
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (!title || !description || !priority) {
    return;
  }

  const todo = createTodo({ projectId, title, description, dueDate, priority });
  displayTodo(todo);
  titleInput.value = "";
  descriptionInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "";

  dialog.close();
}

function setUpDialogProject() {
  const dialog = document.querySelector("nav dialog");
  const btnOpen = document.querySelector("nav .btn-open");
  const btnClose = document.querySelector("nav .btn-close");
  btnOpen.addEventListener("click", () => {
    dialog.showModal();
  });
  btnClose.addEventListener("click", () => {
    dialog.close();
  });
}

function setUpDialogTodo() {
  const dialog = document.querySelector(".main dialog");
  const btnOpen = document.querySelector(".main .btn-open");
  const btnClose = document.querySelector(".main .btn-close");
  btnOpen.addEventListener("click", () => {
    dialog.showModal();
  });
  btnClose.addEventListener("click", () => {
    dialog.close();
  });
}

function setupCopyRight() {
  document.querySelector(".year").textContent = new Date().getFullYear();
}

function setupProjectId() {
  const projectList = JSON.parse(localStorage.getItem("projectList")) || [];
  if (projectList.length === 0) {
    Project.id = 0;
    return;
  }
  const lastProject = projectList.at(-1);
  DTOtoProject(lastProject);
  Project.id = lastProject.id + 1;
}

function setupTodo() {
  const projectList = JSON.parse(localStorage.getItem("projectList")) || [];
  if (projectList.length === 0) {
    Todo.id = 0;
    return;
  }
  let lstTodoId = 0;
  projectList.forEach((dto) => {
    DTOtoProject(dto);
    if (!dto.todos || dto.todos.length === 0) {
      return;
    }
    const lstTodo = dto.todos.at(-1);
    DTOtoTodo(lstTodo);
    let lstId = lstTodo.id;
    lstTodoId = Math.max(lstTodoId, lstId);
  });
  Todo.id = lstTodoId + 1;
}
