import Project from "./project";

function createProject(projectDTO) {
  try {
    // create project then add to localStorage
    const project = new Project(projectDTO);
    const projectList = JSON.parse(localStorage.getItem("projectList")) || [];
    projectList.push(project);
    localStorage.setItem("projectList", JSON.stringify(projectList));
    return project;
  } catch (error) {
    console.log(error.message);
  }
}

function getAllProjects() {
  const projectList = JSON.parse(localStorage.getItem("projectList")) || [];
  projectList.map((dto) => {
    DTOtoProject(dto);
  });
  return projectList;
}

function getProjectById(id) {
  const projectList = JSON.parse(localStorage.getItem("projectList"));
  projectList.forEach((dto) => DTOtoProject(dto));
  const project = projectList.find((project) => project.id == id);
  return project;
}

function getProjectsByTitle(title) {
  const projectList = JSON.parse(localStorage.getItem("projectList"));
  projectList.forEach((project) => DTOtoProject(project));
  return projectList.filter((project) => project.title === title);
}

function addTodoToProject(todo) {
  const projectList = JSON.parse(localStorage.getItem("projectList"));
  projectList.forEach((dto) => DTOtoProject(dto));
  const index = projectList.findIndex(
    (project) => project.id == todo.projectId,
  );
  projectList[index].todos.push(todo);
  localStorage.setItem("projectList", JSON.stringify(projectList));
  const project = getProjectById(todo.projectId);
  return project;
}

function deleteProject() {}

function DTOtoProject(dto) {
  Object.setPrototypeOf(dto, Project.prototype);
}

export {
  createProject,
  DTOtoProject,
  getAllProjects,
  getProjectById,
  getProjectsByTitle,
  deleteProject,
  addTodoToProject,
};
