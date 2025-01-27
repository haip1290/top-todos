import { getAllProjects } from "./projectService";

function displayAllProjects() {
  const container = document.querySelector(".projects-container");
  container.textContent = "";
  const projectList = getAllProjects();
  projectList.forEach((project) => {
    const projectDisplay = document.createElement("button");
    projectDisplay.classList.add("project");
    projectDisplay.id = project.id;
    projectDisplay.textContent = project.title;
    container.appendChild(projectDisplay);
  });
}

export { displayAllProjects };
