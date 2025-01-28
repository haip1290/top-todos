import Project from "./project";

function createProject(projectDTO) {
  try {
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

function updateProject(dto) {
  let project = DTOtoProject(dto);
  let existingProject = getProjectById(project.id);
  if (!existingProject) {
    throw new Error(`Project with id ${project.id} not found`);
  }
  if (dto.title) {
    existingProject.title = dto.title;
  }
  if (Array.isArray(dto.todos)) {
    existingProject.todos = [...dto.todos];
  }
}

function getProjectById(id) {
  const projectList = JSON.parse(localStorage.getItem("projectList"));
  projectList.forEach((dto) => DTOtoProject(dto));
  const project = projectList.filter((project) => project.id === id)[0];
  return project;
}

function getProjectByTitle(title) {
  const projectList = JSON.parse(localStorage.getItem("projectList"));
  return projectList
    .map((dto) => {
      DTOtoProject(dto);
    })
    .filter((project) => project.title === title);
}

function deleteProject() {}

function DTOtoProject(dto) {
  Object.setPrototypeOf(dto, Project.prototype);
}

export {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectByTitle,
  updateProject,
  deleteProject,
};
