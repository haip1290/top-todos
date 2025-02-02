import Todo from "./todo";
import { addTodoToProject, DTOtoProject } from "./projectService";

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

function updateTodoById(dto) {
  const projectList = JSON.parse(localStorage.getItem("projectList"));
  let updatedTodo;
  const id = dto.id.split("-").at(-1);
  projectList?.some((project) => {
    DTOtoProject(project);
    if (project.id != dto.projectId) return false;
    project.todos?.forEach((todo) => DTOtoTodo(todo));
    const index = project.todos?.findIndex((todo) => todo.id == id);
    if (index !== -1) {
      project.todos[index] = dto;
      updatedTodo = project.todos[index];
      return true;
    }
    return false;
  });
  localStorage.setItem("projectList", JSON.stringify(projectList));
  return updatedTodo;
}

function deleteTodoById(id) {
  const projectList = JSON.parse(localStorage.getItem("projectList"));
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

export { createTodo, DTOtoTodo, deleteTodoById, updateTodoById };
