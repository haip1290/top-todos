import Todo from "./todo";
import { getProjectById, updateProject } from "./projectService";

function createTodo(todoDTO) {
  try {
    const todo = new Todo(todoDTO);
    let project = getProjectById(todo.getProjectById);
    project.todos.push(todo);
    updateProject(project);
  } catch (error) {
    console.log(error.message);
  }
}

export { createTodo };
