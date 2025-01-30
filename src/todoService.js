import Todo from "./todo";
import {
  getProjectById,
  updateProject,
  addTodoToProject,
  DTOtoProject,
} from "./projectService";

function createTodo(todoDTO) {
  try {
    const todo = new Todo(todoDTO);
    const project = addTodoToProject(todo);
    if (project.id != todo.projectId) {
      throw Error("Failed to add todo to project");
    }
    return todo;
  } catch (error) {
    console.log(error.message);
  }
}

function deleteTodoById(id) {
  const projectList = JSON.parse(localStorage.getItem("projectList"));
  console.log(projectList);
  projectList?.forEach((project) => {
    DTOtoProject(project);
    project.todos?.forEach((todo) => DTOtoTodo(todo));
    const index = project.todos?.findIndex((todo) => todo.id == id);
    if (index !== -1) project.todos.splice(index, 1);
  });
  localStorage.setItem("projectList", JSON.stringify(projectList));
}

function DTOtoTodo(dto) {
  Object.setPrototypeOf(dto, Todo.prototype);
}

export { createTodo, DTOtoTodo, deleteTodoById };
