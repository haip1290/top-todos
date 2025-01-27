import { createProject } from "./projectService";
import { displayAllProjects } from "./displayController";
console.log("Start app");

document.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
  displayAllProjects();
  const btnSubmit = document.querySelector(".btn-submit");
  btnSubmit.addEventListener("click", submitHandler);
});

function submitHandler(event) {
  event.preventDefault();
  const titleInput = document.querySelector("#project-title");
  const errorMsg = document.querySelector(".error-title");
  let title = titleInput.value.trim();
  errorMsg.hidden = title;
  if (title) {
    createProject({ title });
    titleInput.textContent = "";
    displayAllProjects();
  }
}
