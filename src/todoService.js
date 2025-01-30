import Todo from "./todo";
import {
  getProjectById,
  updateProject,
  addTodoToProject,
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

function DTOtoTodo(dto) {
  Object.setPrototypeOf(dto, Todo.prototype);
}

export { createTodo, DTOtoTodo };
