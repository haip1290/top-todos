import Todo from "./todo.js";

function createTodo(todoDTO) {
  try {
    const todo = new Todo(todoDTO);
    return todo;
  } catch (error) {
    console.log(error.message);
  }
}

// {
//   title: "webpack",
//   description:
//     "set up all webpack related task including install packages, config, create template, etc...",
//   priority: Todo.PRIORITY.HIGH,
// }
