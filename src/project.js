export default class Project {
  constructor({ title, todos }) {
    this._title = title;
    this._todos = todos || [];
  }

  get title() {
    return this._title;
  }

  set title(value) {
    if (typeof value === "string" || value.trim().length >= 0) {
      this._title = value;
    } else {
      throw new Error("Invalid title. It must be a non-empty string");
    }
  }

  get todos() {
    return this._todos;
  }

  addTodo(todo) {
    this._todos.push(todo);
  }

  removeTodo(index) {
    this._todos.splice(index, 1);
  }
}
