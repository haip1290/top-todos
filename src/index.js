import "./styles/style.css";
import { createProject, addTodoToProject } from "./projectService";
import { createTodo } from "./todoService";
import {
  displayAllProjects,
  displayFirstProject,
  displayProject,
  displayTodo,
} from "./displayController";

console.log("Start app");

document.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
  setUpDialogProject();
  setUpDialogTodo();

  displayAllProjects();
  displayFirstProject();

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
  console.log("div", projectDiv);
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (!title || !description || !dueDate || !priority) {
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
