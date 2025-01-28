export default class Project {
  static id = 0;

  constructor({ title, todos = [], isCompleted = false }) {
    this._id = Project.id++;
    this._title = title;
    this._todos = todos;
    this._isCompleted = isCompleted;
  }

  get id() {
    return this._id;
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

  get isCompleted() {
    return this._isCompleted;
  }

  toggleIsCompleted() {
    this._isCompleted = !this._isCompleted;
  }
}
