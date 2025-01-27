import Todo from "./todo";
import { getProjectById, updateProject } from "./projectService";

function createTodo(todoDTO) {
  try {
    const todo = new Todo(todoDTO);
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    let project = getProjectById(todo.getProjectById);
    project.todos.push(todo.id);
    updateProject(project);
  } catch (error) {
    console.log(error.message);
  }
}

export { createTodo };
