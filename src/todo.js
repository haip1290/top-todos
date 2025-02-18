export default class Todo {
  static id;
  static PRIORITY = {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
  };
  constructor({
    title,
    description,
    dueDate = null,
    priority,
    isCompleted = false,
    projectId,
  }) {
    if (projectId === null) throw Error("Project ID is required");
    this._projectId = projectId;
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._isCompleted = isCompleted;
    this._id = Todo.id++;
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

  get description() {
    return this._description;
  }

  set description(value) {
    if (typeof value === "string" || value.trim().length >= 0) {
      this._title = value;
    } else {
      throw new Error("Invalid description. It must be a non-empty string");
    }
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(value) {
    if (value instanceof Date || !NaN(Date.parse(value)) || value === null) {
      this._dueDate = value;
    } else {
      throw new Error("Invaid date");
    }
  }

  get priority() {
    return this._priority;
  }

  set priority(value) {
    let validPriorities = Object.values(Todo.PRIORITY);
    if (validPriorities.includes(value)) {
      this._priority = value;
    } else {
      throw new Error(
        `Invalid priority. It mus be one of: ${validPriorities.join(", ")}`,
      );
    }
  }

  get isCompleted() {
    return this._isCompleted;
  }

  togggleIsCompleted() {
    this._isCompleted = !this.isCompleted;
  }

  get projectId() {
    return this._projectId;
  }
}
